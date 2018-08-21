import * as _ from 'lodash';
import * as moment from 'moment';
import * as Periods from '@/constants/periods';
import {
  isValidFuelTech,
  isImports,
  isLoads } from '@/domains/graphs';
import { formatNumberForDisplay } from './formatter';
import { getStartEndDates } from './data-helpers';
import { isTouchDevice } from './device';

function getMinPeriod(isPower) {
  return isPower ? Periods.PERIOD_5_MINS : Periods.PERIOD_1_DAY;
}

function getGroupToPeriods(isPower) {
  return isPower ? [Periods.PERIOD_5_MINS, Periods.PERIOD_30_MINS] : [Periods.PERIOD_1_DAY];
}

/**
 * Default amCharts config
 */
function getChartConfig(config, isPower, periods) {
  let pan = false;
  let zoomable = true;
  const minPeriod = getMinPeriod(isPower);
  const groupToPeriods = periods || getGroupToPeriods(isPower);
  const startOnAxis = isPower;

  if (isTouchDevice()) {
    pan = true;
    zoomable = false;
  }

  const defaultConfig = {
    type: 'stock',
    addClassNames: true,
    mouseWheelZoomEnabled: true,
    // mouseWheelScrollEnabled: true,
    export: {
      enabled: false,
    },
    balloon: {
      adjustBorderColor: true,
      borderAlpha: 0,
      borderThickness: 1,
      animationDuration: 0,
      pointerWidth: 6,
      fillAlpha: 1,
      fillColor: '#ece9e6',
      shadowAlpha: 0.4,
    },
    categoryAxesSettings: {
      autoGridCount: true,
      minPeriod,
      groupToPeriods,
      labelOffset: -35,
      axisAlpha: 1,
      tickLength: 30,
      axisHeight: 28,
      axisThickness: 1,
      axisColor: '#ccc',
      color: '#666',
      dashLength: 7,
      equalSpacing: true,
      centerLabelOnFullPeriod: false,
      boldPeriodBeginning: true,
      parseDates: true,
      startOnAxis,
      dateFormats: [
        { period: 'fff', format: ' JJ:NN' },
        { period: 'ss', format: ' JJ:NN\n D MMM' },
        { period: 'mm', format: ' JJ:NN' },
        { period: 'hh', format: ' JJ:NN' },
        { period: 'DD', format: ' EEE\n D MMM' },
        { period: 'WW', format: ' EEE\n D MMM' },
        { period: 'MM', format: ' EEE\n D MMM' },
        { period: 'YYYY', format: ' YYYY' },
      ],
    },
    chartCursorSettings: {
      pan, // If pan is set to true, zoomable is switched to false automatically.
      zoomable,
      categoryBalloonColor: '#C74523',
      cursorColor: '#C74523',
      showNextAvailable: true,
      valueBalloonsEnabled: true,
      animationDuration: 0,
      leaveAfterTouch: false,
    },
    panelsSettings: {
      fontFamily: 'IBM Plex Serif',
    },
    chartScrollbarSettings: {
      enabled: false,
    },
  };

  return _.assign(defaultConfig, config);
}

/**
 * amCharts Field Mappings
 */
function getFieldMappings(keys) {
  const mappings = [];

  keys.forEach((key) => {
    mappings.push({
      fromField: key,
      toField: key,
    });
  });

  return mappings;
}

/**
 * amCharts Emissions Volume graphs
 */
function getEVStockGraphs(domains, keys, unit) {
  const graphs = [];
  keys.forEach((ftKey) => {
    const colour = domains[ftKey].colour;
    const negativeFillAlphas = 0.8;
    const fillAlphas = 0.7;
    const fillColors = colour;
    const lineAlpha = 1;
    const lineThickness = 1;
    const lineColor = colour;
    const type = 'step';

    const graph = {
      id: ftKey,
      valueField: ftKey,
      type,
      fillAlphas,
      fillColors,
      negativeFillAlphas,
      negativeFillColors: colour,
      lineAlpha,
      lineThickness,
      lineColor,
      useDataSetColors: false,
      showBalloon: true,
      periodValue: 'Average',
      balloonFunction: (item) => {
        let balloonTxt = '';

        if (!isLoads(graph.id) && item.values.value > 0) {
          const precision = '0,0';
          const value = formatNumberForDisplay(item.dataContext[`${graph.id}Average`], precision);
          const ftLabel = domains[graph.id].label;
          const displayValue = `${value} ${unit}`;

          balloonTxt = `
            <div style="font-size: 1.1em;">
              <span 
                style="display: inline-block; width: 13px; 
                  height: 13px; position: relative; top: 2px; 
                  margin-right: 5px; background: ${colour};"></span>
              ${ftLabel}: <strong> ${displayValue}</strong>
            </div>
          `;
        }
        return balloonTxt;
      },
    };
    graphs.push(graph);
  });
  return graphs;
}

/**
 * amCharts Emissions Intensity graph
 */
function getEIStockGraphs(domains, keys, unit) {
  const graphs = [];
  keys.forEach((ftKey) => {
    const colour = '#C74523';
    const negativeFillAlphas = 0.8;
    const fillAlphas = 0;
    const fillColors = colour;
    const lineAlpha = 1;
    const lineThickness = 1;
    const lineColor = colour;
    const type = 'smoothedLine';

    const graph = {
      id: ftKey,
      valueField: ftKey,
      type,
      fillAlphas,
      fillColors,
      negativeFillAlphas,
      negativeFillColors: colour,
      lineAlpha,
      lineThickness,
      lineColor,
      useDataSetColors: false,
      showBalloon: true,
      periodValue: 'Average',
      balloonFunction: (item) => {
        let balloonTxt = '';

        if (!isLoads(graph.id) && item.values.value > 0) {
          const precision = '0,0';
          const value = formatNumberForDisplay(item.dataContext[`${graph.id}Average`], precision);
          const ftLabel = domains[graph.id].label;
          const displayValue = `${value} ${unit}`;

          balloonTxt = `
            <div style="font-size: 1.1em;">
              <span 
                style="display: inline-block; width: 13px; 
                  height: 13px; position: relative; top: 2px; 
                  margin-right: 5px; background: ${colour};"></span>
              ${ftLabel}: <strong> ${displayValue}</strong>
            </div>
          `;
        }
        return balloonTxt;
      },
    };
    graphs.push(graph);
  });
  return graphs;
}

/**
 * amCharts Stock graphs
 */
function getStockGraphs(domains, keys, graphType, unit) {
  const graphs = [];

  function hideNegativeAlphas(key) {
    return isLoads(key) || isImports(key);
  }

  keys.forEach((ftKey) => {
    if (isValidFuelTech(ftKey)) {
      const colour = domains[ftKey].colour;
      let negativeFillAlphas = 0.8;
      const fillAlphas = 0.8;
      const fillColors = colour;
      const lineAlpha = 0;
      const lineThickness = 1;
      const lineColor = colour;
      const type = graphType || 'line';

      if (graphType !== 'step' && hideNegativeAlphas(ftKey)) {
        negativeFillAlphas = 0;
      }

      const graph = {
        id: ftKey,
        valueField: ftKey,
        type,
        fillAlphas,
        fillColors,
        negativeFillAlphas,
        negativeFillColors: colour,
        lineAlpha,
        lineThickness,
        lineColor,
        useDataSetColors: false,
        columnWidth: 0.8,
        showBalloon: false,
        periodValue: 'Average',
        balloonFunction: (item) => {
          let balloonTxt = '';

          if (!isLoads(graph.id) && item.values.value > 0) {
            const precision = graphType === 'step' ? '0,0.0' : '0,0';
            const value = formatNumberForDisplay(item.dataContext[`${graph.id}Average`], precision);
            const ftLabel = domains[graph.id].label;
            const displayValue = `${value} ${unit}`;

            balloonTxt = `
              <div style="font-size: 1.1em;">
                <span 
                  style="display: inline-block; width: 13px; 
                    height: 13px; position: relative; top: 2px; 
                    margin-right: 5px; background: ${colour};"></span>
                ${ftLabel}: <strong> ${displayValue}</strong>
              </div>
            `;
          }
          return balloonTxt;
        },
      };
      graphs.push(graph);
    }
  });
  return graphs;
}

/**
 * amCharts NEM Guides
    - shade between 10pm to 7am
 */
function getNemGuides(data, showWeekends) {
  const startEndDates = getStartEndDates(data);
  const startDate = moment(startEndDates.start);
  const endDate = moment(startEndDates.end);
  endDate.add(1, 'days');
  const guides = [];

  while (moment(startDate).isBefore(endDate)) {
    const dayBefore = startDate.clone();
    const daysAfter = startDate.clone();
    dayBefore.subtract(1, 'days');
    daysAfter.add(2, 'days');

    guides.push({
      fillColor: '#999',
      fillAlpha: 0.1,
      lineAlpha: 0,
      tickLength: 0,
      date: dayBefore.set({ hour: 22, minute: 0, second: 0 }).toDate(),
      toDate: startDate.set({ hour: 7, minute: 0, second: 0 }).toDate(),
    });

    if (showWeekends) {
      if (startDate.day() === 0) {
        guides.push({
          fillColor: '#bbb',
          fillAlpha: 0.1,
          lineAlpha: 0.5,
          tickLength: 0,
          lineColor: '#ccc',
          dashLength: 0,
          toDate: daysAfter.set({ hour: 0, minute: 0, second: 0 }).toDate(),
          date: startDate.set({ hour: 0, minute: 0, second: 0 }).toDate(),
        });
      }
    }

    startDate.add(1, 'days');
  }

  return guides;
}

export {
  getChartConfig,
  getFieldMappings,
  getStockGraphs,
  getEVStockGraphs,
  getEIStockGraphs,
  getNemGuides,
  getMinPeriod,
  getGroupToPeriods,
};
