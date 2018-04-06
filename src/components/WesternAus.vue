<template>
  <div class="wrapper">
    <div class="columns is-desktop is-variable is-1">
      <div class="zoom-out-btn">
        <transition name="fade">
          <button class="button is-small is-rounded is-danger is-inverted" 
            @click="handleZoomOutClicked" 
            v-if="isChartZoomed && !isFetching">Reset Zoom</button>
        </transition>
      </div>

      <div class="column" v-show="!isFetching">
        <western-aus-chart :chartData="chartData" />
      </div>
      <div class="column is-narrow" v-if="!isFetching">
        <western-aus-summary />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as moment from 'moment';
import { mapGetters } from 'vuex';
import EventBus from '@/lib/event-bus';
import { getStartEndDates } from '@/lib/data-helpers';

/**
 * WA only config here
 */
import WesternAusChart from './WesternAus/Chart';
import WesternAusSummary from './WesternAus/Summary';
import Domains from './WesternAus/domains';

const http = axios.create({
  baseURL: '/',
});

export default {
  components: {
    WesternAusChart,
    WesternAusSummary,
  },
  created() {
    this.$store.dispatch('setDomains', Domains);
    this.fetch();
  },
  mounted() {
    EventBus.$on('data.fetch.latest', this.fetch);
  },
  beforeDestroy() {
    EventBus.$off('data.fetch.latest');
  },
  data() {
    return {
      chartData: [],
    };
  },
  computed: {
    ...mapGetters({
      isFetching: 'isFetching',
      isChartZoomed: 'isChartZoomed',
      startDate: 'getSelectedStartDate',
      endDate: 'getSelectedEndDate',
    }),
  },
  watch: {
    chartData(data) {
      const startEndDates = getStartEndDates(data);
      const start = startEndDates.start;
      const end = startEndDates.end;

      // store the selected dates
      this.$store.dispatch('saveSelectedDates', startEndDates);

      // Generate table data
      this.$store.dispatch('generateRangeSummary', {
        data,
        start,
        end,
      });
    },
  },
  methods: {
    handleZoomOutClicked() {
      EventBus.$emit('chart.zoomedOut.clicked');
    },
    fetch() {
      this.$store.dispatch('fetchingData', true);

      // URL to JSON file
      const url = 'data-wa/close_collie_and_muja.json';
      // const url = 'data-wa/2021_coal_phased_out.json';
      http.get(url).then((response) => {
        this.chartData = response.data.map((d) => {
          /**
           * Reformat the data
           * - date to JS date object
           * - convert the rest from strings to numbers
           */
          const date = moment(d.date);
          return {
            date: date.toDate(),
            coal_gas_baseload: +d.coal_gas_baseload,
            fast_response_gas_turbine: +d.fast_response_gas_turbine,
            wind: +d.wind,
            rooftop_pv: +d.rooftop_pv,
            fixed_pv: +d.fixed_pv,
            demand: +d.demand,
          };
        });

        this.$store.dispatch('setDataEndDate', this.chartData[this.chartData.length - 1].date);
        this.$store.dispatch('fetchingData', false);
        this.$store.dispatch('setExportData', {
          name: 'Export',
          data: this.chartData,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.zoom-out-btn {
  position: absolute;
  z-index: 9;
  right: 0;
  left: 0;
  width: 94px;
  margin: -20px auto 0;
}
</style>