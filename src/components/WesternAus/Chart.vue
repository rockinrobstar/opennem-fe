<template>
  <div class="vis"></div>
</template>

<script>
import * as moment from 'moment';
import { mapGetters } from 'vuex';
import EventBus from '@/lib/event-bus';
import {
  getFieldMappings,
  getStockGraphs,
  getChartConfig,
} from '@/lib/chart-helpers';
import {
  dataFilter,
  checkDateZoomLessThan1Day,
  getZoomDatesOnDateLabel,
  getKeys,
} from '@/lib/data-helpers';
import { formatNumberForDisplay } from '@/lib/formatter';
import getPanels from './config';

export default {
  props: {
    chartData: Array,
  },
  data() {
    return {
      chart: null,
      keys: [],
      initialZoom: false,
      hasDemand: true,
    };
  },
  computed: {
    ...mapGetters({
      domains: 'getDomains',
      isChartZoomed: 'isChartZoomed',
      startDate: 'getSelectedStartDate',
      endDate: 'getSelectedEndDate',
      dataEndDate: 'getDataEndDate',
    }),
  },
  watch: {
    chartData() {
      this.initialZoom = this.isChartZoomed;
      this.clearChart();
      this.setupChart();
      this.setupKeys();
      this.updateChart();
    },
  },
  created() {
    // throttle the resize event
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.setupEventSubscribers();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    EventBus.$off('chart.zoomedOut.clicked');
    this.clearChart();
  },
  methods: {
    handleResize() {
      this.chart.invalidateSize();
    },

    setupEventSubscribers() {
      EventBus.$on('chart.zoomedOut.clicked', this.resetChartZoom);
    },

    setupChart() {
      const config = getChartConfig({
        dataSets: [],
        panels: getPanels(this.getPanelListeners()),
      });

      config.panels[0].categoryAxis.listeners = this.getCategoryAxisListeners();

      if (this.hasDemand) {
        config.chartScrollbarSettings = {
          graph: 'demand',
          backgroundAlpha: 0,
          selectedGraphFillColor: '#C74523',
          selectedGraphFillAlpha: 0.8,
          selectedBackgroundColor: '#fff',
          selectedBackgroundAlpha: 0,
          graphFillColor: '#aaa',
          graphFillAlpha: 0.9,
          graphType: 'line',
          position: top,
          usePeriod: '6hh',
          resizeEnabled: false,
          fontSize: 0, // hide
        };
      }

      config.categoryAxesSettings.minPeriod = 'hh';
      config.categoryAxesSettings.groupToPeriods = ['hh', '3hh', '6hh', 'WW'];

      this.chart = window.AmCharts.makeChart(this.$el, config);

      this.chart.addListener('init', this.onChartInit);
      /**
       * workaround for chart.invalidateSize bug
       * - re-add panel zoomed listener every time chart is redrawn
       */
      this.chart.addListener('drawn', this.onChartDrawn);
    },

    setupKeys() {
      this.keys = getKeys(this.chartData);
    },

    clearChart() {
      if (this.chart) {
        this.chart.clear();
        this.chart = null;
      }
    },

    updateChart() {
      this.chart.dataSets = [{
        dataProvider: this.chartData,
        categoryField: 'date',
        fieldMappings: getFieldMappings(this.keys),
      }];

      const stockGraphs = getStockGraphs(this.domains, this.keys, true);

      /**
       * Creates Demand as a non-stack line graph
       */
      // pop demand
      stockGraphs.pop();
      // add new demand
      if (this.hasDemand) {
        stockGraphs.push(this.getDemandGraph());
      }

      this.chart.panels[0].stockGraphs = stockGraphs;
      this.chart.validateData();
    },

    // custom Demand Graph
    getDemandGraph() {
      return {
        stackable: false,
        id: 'demand',
        valueField: 'demand',
        type: 'line',
        fillAlphas: 0,
        lineAlpha: 1,
        lineColor: '#000',
        useDataSetColors: false,
        showBalloon: true,
        periodValue: 'Average',
        balloonFunction: (item) => {
          let balloonTxt = '';

          if (item.values.value > 0) {
            const value = formatNumberForDisplay(item.dataContext.demandAverage);
            const displayValue = `${value} MW`;

            balloonTxt = `
              <div style="font-size: 1.1em;">
                <span 
                  style="display: inline-block; width: 13px; 
                    height: 13px; position: relative; top: 2px; 
                    margin-right: 5px; background: #000;"></span>
                Demand: <strong> ${displayValue}</strong>
              </div>
            `;
          }
          return balloonTxt;
        },
      };
    },

    getPanelListeners() {
      return [
        { event: 'rendered', method: this.onPanelRendered },
        { event: 'zoomed', method: this.onPanelZoomed },
        { event: 'changed', method: this.onPanelChanged },
        { event: 'rollOverGraph', method: this.onPanelHover },
      ];
    },

    getCategoryAxisListeners() {
      return [
        // { event: 'clickItem', method: this.onCategoryAxisItemClicked },
      ];
    },

    getPanelChartCursorListeners() {
      return [{ event: 'zoomed', method: this.onChartCursorZoomed }];
    },

    onPanelRendered() {
      // this.zoomTo14Days();
    },

    onPanelZoomed(e) {
      const start = e.startDate;
      const end = e.endDate;
      if (!this.initialZoom) {
        this.$store.dispatch('saveSelectedDates', {
          start,
          end,
        });

        this.$store.dispatch('generateRangeSummary', {
          data: this.chartData,
          start,
          end,
        });
        this.$store.dispatch('setExportData', {
          name: 'Export',
          data: dataFilter(this.chartData, start, end),
        });

        if (checkDateZoomLessThan1Day(start, end)) {
          this.zoomChart(start, end, true);
        }
      }
    },

    onPanelChanged(e) {
      if (e.index !== undefined) {
        const data = e.target.categoryLineAxis.data[e.index];
        this.$store.dispatch('generatePointSummary', {
          date: data.category,
          dataContext: data.dataContext,
        });
        this.$store.dispatch('showInstantaneousData', true);
      } else {
        this.$store.dispatch('showInstantaneousData', false);
      }
    },

    onPanelHover() {},

    onCategoryAxisItemClicked(e) {
      const zoomDates = getZoomDatesOnDateLabel(e.value, this.dataEndDate);
      if (zoomDates) {
        this.zoomChart(zoomDates.start, zoomDates.end, true);
      }
    },

    onChartInit() {
      if (this.initialZoom) {
        this.zoomChart(this.startDate, this.endDate);
        this.initialZoom = false;
      }
    },

    onChartDrawn(e) {
      // prevent infinite loop
      if ('drawnManually' in e.chart) {
        delete e.chart.drawnManually;
        return;
      }

      // add zoomed listener to chartCursor
      e.chart.panels[0].chartCursor.addListener('zoomed', this.onChartCursorZoomed);

      // refresh chart to include "new" listener
      e.chart.drawnManually = true;
      // e.chart.validateNow();
    },

    onChartCursorZoomed() {
      this.$store.dispatch('setChartZoomed', true);
    },

    zoomChart(start, end, chartZoom) {
      this.chart.zoom(start, end);
      this.$store.dispatch('setChartZoomed', chartZoom);
    },

    resetChartZoom() {
      // this.zoomTo14Days();
      this.chart.zoomOut();
      this.$store.dispatch('setChartZoomed', false);
    },

    zoomTo14Days() {
      // zoom to a week
      const end = this.dataEndDate;
      const start = moment(end).subtract(14, 'days');

      setTimeout(() => {
        this.zoomChart(start.toDate(), end, false);
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/bulma/sass/utilities/mixins.sass";

.vis {
  height: 350px;

  @include desktop {
    height: 450px;
  }
}

</style>

