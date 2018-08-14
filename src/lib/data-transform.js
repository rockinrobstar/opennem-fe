/* eslint-disable */
import * as moment from 'moment';
import History from '@/models/History';
import { isPrice, isTemperature, isImports, isLoads, isEmissions, isValidFuelTech } from '@/domains/graphs'; 
import { parseInterval, compareAndGetShortestInterval } from './duration-parser';

function shouldInvertValue(id) {
  return isImports(id) || isLoads(id);
}

/**
 * Find out what datatypes is available in this dataset,
 *  and the start/end time of the generation data
 * @param {*} domains
 * @param {*} data
 */
function getKeysAndStartEndGenerationTime(domains, data) {
  const keys = [];
  let startGenTime = null;
  let endGenTime = null;

  Object.keys(domains).forEach((domain) => {
    const fuelTech = data.find(d => d.fuel_tech === domain);
    const fuelTechEV = data.find(d => `${d.fuel_tech}_emissions_volume` === domain);
    const otherTypes = data.find(d => d.type === domain);

    if (fuelTech || fuelTechEV || otherTypes) {
      keys.push(domain);

      if (!endGenTime && fuelTech) {
        endGenTime = fuelTech.history.last;
      }
      if (!startGenTime && fuelTech) {
        startGenTime = fuelTech.history.start;
      }

      // if there is a price key,
      //   create two more keys to split the positive and negative values of price
      if (isPrice(domain)) {
        keys.push('pricePos');
        keys.push('priceNeg');
      }
    }
  });

  return {
    keys,
    startGenTime,
    endGenTime,
  };
}

export default function(domains, data) {
  const keysAndGenTimes = getKeysAndStartEndGenerationTime(domains, data);
  const keys = keysAndGenTimes.keys;
  const genTimes = {
    start: keysAndGenTimes.startGenTime,
    end: keysAndGenTimes.endGenTime,
  };

  const container = [];
  const allIntervals = {};
  let shortestInterval = null;

  function createContainerObj(availableKeys, domain, duration, history) {
    const historyData = history.data;
    const start = moment(history.start, moment.ISO_8601);

    for (let i = 0; i < historyData.length; i += 1) {
      const now = moment(start).add(duration.value * i, duration.key);
      const d = shouldInvertValue(domain) ? -historyData[i] : historyData[i];
      const nowISO = moment(now).toISOString();

      if (!container[nowISO]) {
        container[nowISO] = {};

        availableKeys.forEach((key) => {
          container[nowISO][key] = null;
        });
      }
      container[nowISO][domain] = d;

      if (isPrice(domain)) {
        container[nowISO]['pricePos'] = d > 300 ? d : 0.001;
        container[nowISO]['priceNeg'] = d < 0 ? -d : 0.001;
      }
    }
  }

  Object.keys(domains).forEach((domain) => {
    const fuelTechData = data.find(d => d.fuel_tech === domain);
    const fuelTechEVData = data.find(d => 
      d.type === 'emissions' &&
      `${d.fuel_tech}_emissions_volume` === domain
    );

    const priceOrTemperatureData = data.find(d => d.type === domain);
    let history = null;

    if (fuelTechData) {
      if (fuelTechData.history) {
        history = new History(fuelTechData.history);
      } else if (fuelTechData.forecast) {
        history = new History(fuelTechData.forecast);
      }
    } else if (fuelTechEVData) {
      history = new History(fuelTechEVData.history);
    } else if (priceOrTemperatureData) {
      history = new History(priceOrTemperatureData.history);
    }

    if (fuelTechData || fuelTechEVData || priceOrTemperatureData) {
      const duration = parseInterval(history.interval);
      allIntervals[domain] = duration;

      // store the shortest interval
      if (shortestInterval) {
        shortestInterval = compareAndGetShortestInterval(shortestInterval, duration, true);
      } else {
        shortestInterval = duration;
      }

      createContainerObj(keys, domain, duration, history);

      // if fuelTechData contains both history and forecast data, add forecast data to the same key
      if (fuelTechData && fuelTechData.history && fuelTechData.forecast) {
        createContainerObj(keys, domain, duration, fuelTechData.forecast);
      }
    }
  });

  const newChartData = [];
  const longerIntervalSeries = [];

  // Find out the series that has an interval longer than the shortest interval
  Object.keys(allIntervals).forEach((domain) => {
    if (!compareAndGetShortestInterval(allIntervals[domain], shortestInterval, false)) {
      longerIntervalSeries.push({
        key: domain,
        currentValue: null,
      });
    }
  });

  // Create array based on date maps
  Object.keys(container).forEach((dateKey) => {
    const obj = Object.assign({}, container[dateKey]);
    obj.date = moment(dateKey).toDate();

    newChartData.push(obj);
  });

  // sort the array based on the date
  newChartData.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf());

  // fill in gaps for series that has longer intervals
  // also populate pricePos and priceNeg for log charts
  newChartData.forEach((d) => {
    longerIntervalSeries.forEach((series) => {

      if (d[series.key] !== null) {
        series.currentValue = d[series.key];
      } else if (d[series.key] === null) {
        if (!isTemperature(series.key)) {
          d[series.key] = series.currentValue;
        }
      }
    });
  });

  // only show data within the start and end range of the 5 min FT
  const updatedChartData = newChartData.filter(d =>
    moment(d.date).isSameOrAfter(moment(genTimes.start)) &&
    moment(d.date).isSameOrBefore(moment(genTimes.end)));

  updatedChartData.forEach((d) => {
    let sumEmissions = 0;
    let sumEnergy = 0;
    Object.keys(d).forEach((key) => {
      if (key !== 'date') {
        if (isEmissions(key)) {
          sumEmissions += d[key];
        }
        if (isValidFuelTech(key)) {
          sumEnergy += d[key];
        }
      }
    })
    d.emissionsIntensity = sumEmissions / sumEnergy;
  });

  return updatedChartData.slice(0);
}
