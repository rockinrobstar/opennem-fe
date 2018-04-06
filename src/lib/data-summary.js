import _ from 'lodash';
import { getKeys } from './data-helpers';

// Check if it is a valid fuel tech name
function isValidFT(name) {
  return name !== 'date' &&
    name !== 'price' &&
    name !== 'pricePos' &&
    name !== 'priceNeg' &&
    name !== 'temperature';
}

// Check if FT is a load
// TODO: use FUEL_TECH_CONFIG to check whether it is a load or type
function isLoad(name) {
  return name === 'pumps' ||
    name === 'exports' ||
    name === 'battery_charging';
}

// Check if FT is a renewable
// function isRenewableFT(name) {
//   return name === 'wind' ||
//     name === 'biomass' ||
//     name === 'hydro' ||
//     name === 'rooftop_solar' ||
//     name === 'solar';
// }

function getLabel(domains, id) {
  const label = domains[id] ? domains[id].label : id;
  return label;
}
function getColour(domains, id) {
  const colour = domains[id] ? domains[id].colour : id;
  return colour;
}

function getSummary(domains, data) {
  // create a new array with the ft totals
  const dataSum = data.map((d) => {
    let p = 0;
    Object.keys(d).forEach((ft) => {
      if (isValidFT(ft)) {
        p += d[ft] || 0;
      }
    });
    return p;
  });

  // create a new array with the ft (renewables only) totals
  // const renewablesDataSum = data.map((d) => {
  //   let p = 0;
  //   Object.keys(d).forEach((ft) => {
  //     if (isValidFT(ft) && isRenewableFT(ft)) {
  //       p += d[ft] || 0;
  //     }
  //   });
  //   return p;
  // });

  // create a new array with the ft (renewables only) percentages
  // const renewablesPercentages = renewablesDataSum.map((d, i) => (d / dataSum[i]) * 100);

  // sum up all the ft totals
  const dataSumTotal = dataSum.reduce((a, b) => a + b, 0);

  // calculate the price * total
  const dataSumTotalPrice = dataSum.map((d, i) => {
    const rrp = data[i].price ? data[i].price : 0;
    return d * rrp;
  });

  // calculate the total average price
  const totalAveragePrice = dataSumTotalPrice.reduce((a, b) => a + b, 0) / dataSumTotal;

  const allData = [];
  const sourcesData = [];
  const loadsData = [];
  const demandData = [];
  let totalNetPower = 0;
  let totalNetEnergy = 0;
  let totalGrossPower = 0;
  let totalGrossEnergy = 0;

  const dataKeys = getKeys(data);

  Object.keys(domains).forEach((domain) => {
    if (_.includes(dataKeys, domain) && isValidFT(domain)) {
      // sum ft power
      const totalFTPower = data.reduce((a, b) => a + b[domain], 0);

      // calculate energy (GWh) += power * interval/60/100
      const dataEnergy = data.map(d => (d[domain] * 5) / 60 / 1000);

      // sum the energy
      const energySum = dataEnergy.reduce((a, b) => a + b, 0);

      // calculate the price * ft total
      const dataFTPrice = data.map((d, i) => {
        const rrp = data[i].price ? data[i].price : 0;
        return d[domain] * rrp;
      });

      // calculate the ft average price
      const averageFTPrice = dataFTPrice.reduce((a, b) => a + b, 0) / totalFTPower;
      const row = {
        id: domain,
        label: getLabel(domains, domain),
        colour: getColour(domains, domain),
        range: {
          power: totalFTPower,
          energy: energySum, // same as totalFTPower / 12000
          averagePrice: averageFTPrice,
        },
      };

      if (isLoad(domain)) {
        loadsData.push(row);
      } else if (domain === 'demand') {
        demandData.push(row);
      } else {
        sourcesData.push(row);
        // sum up sources power (gross)
        totalGrossPower += totalFTPower;
        // sum up sources energy (gross)
        totalGrossEnergy += energySum;
      }
      // sum up all power (net)
      totalNetPower += totalFTPower;
      // sum up all energy (net)
      totalNetEnergy += energySum;

      allData.push(row);
    }
  });

  return {
    allData,
    sourcesData: sourcesData.reverse(), // to display from top to bottom in the table.
    loadsData,
    demandData,
    totalNetPower,
    totalNetEnergy,
    totalGrossPower,
    totalGrossEnergy,
    totalAveragePrice,
  };
}

function getPointSummary(domains, date, data) {
  const allData = {};
  let totalNetPower = 0;
  let totalGrossPower = 0;

  Object.keys(domains).forEach((domain) => {
    const average = data[`${domain}Average`];
    allData[domain] = average;

    if (average !== undefined) {
      totalNetPower += average;

      if (!isLoad(domain) && domain !== 'demand') {
        totalGrossPower += average;
      }
    }
  });

  return {
    date,
    allData,
    totalNetPower,
    totalGrossPower,
  };
}

export {
  getSummary,
  getPointSummary,
};
