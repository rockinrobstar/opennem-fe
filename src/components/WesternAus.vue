<template>
<div>
  <div style="text-align: center; height: 50px;">
    <date-header />
  </div>
  <transition name="fade">
    <ui-zoom-out-button v-if="isChartZoomed && !isFetching && !isExportPng" />
  </transition>

  <transition name="slide-fade">
    <div v-if="isFetching" class="loading">
      <ui-loader />
    </div>
  </transition>
  
  <div class="columns is-desktop is-variable is-1" v-show="!isFetching && !error">
    <div class="column" :class="{ export: isExportPng }">
      <div id="export-container">
        <export-png-header v-if="isExportPng" />

        <div style="position:relative">
          <panel-button />
          <wa-chart :chartData="nemData" />
          <div v-if="isExportPng">
            <wa-summary v-if="showSummaryPanel" />
            <export-legend v-else />
          </div>
        </div>
        
        <export-png-footer v-if="isExportPng" :hideTopBorder="showSummaryPanel" />
      </div>
    </div>
  </div>
  <div class="columns is-centered" v-show="!isFetching && !error">
    <div class="column is-narrow" v-show="!isExportPng">
      <wa-summary />
    </div>
  </div> 
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import domtoimage from '@/lib/dom-to-image';
import FileSaver from 'file-saver';
import EventBus from '@/lib/event-bus';
import updateRouterStartEnd from '@/lib/app-router';
import { GraphDomains } from '@/domains/graphs';
import * as VisTypes from '@/constants/vis-types';

import WaChart from './WA/Chart';
import WaSummary from './WA/Summary';
import ExportPngHeader from './Export/PngHeader';
import ExportPngFooter from './Export/PngFooter';
import PanelButton from './WA/ShowHideButton';
import ExportLegend from './Export/Legend';
import UiZoomOutButton from './ui/ZoomOutButton';
import UiLoader from './ui/Loader';
import DateHeader from './ui/DateHeader';

export default {
  components: {
    WaChart,
    WaSummary,
    ExportPngHeader,
    ExportPngFooter,
    ExportLegend,
    UiZoomOutButton,
    PanelButton,
    UiLoader,
    DateHeader,
  },
  created() {
    const colours = this.colourPalette.colours;
    const updatedDomains = this.updateDomains(colours);

    this.$store.dispatch('setExportRegion', 'Western Australia');
    this.$store.dispatch('setDomains', updatedDomains);
    this.$store.dispatch('localData', true);
    this.$store.dispatch('setVisType', VisTypes.VIS_TYPE_ENERGY);

    this.fetch();
  },
  mounted() {
    EventBus.$on('download.png', this.downloadPng);
  },
  beforeDestroy() {
    EventBus.$off('download.png');
  },
  data() {
    return {
      selectedRange: null,
    };
  },
  computed: {
    ...mapGetters({
      nemData: 'nemData',
      isFetching: 'isFetching',
      isChartZoomed: 'isChartZoomed',
      chartTypeTransition: 'chartTypeTransition',
      startDate: 'getSelectedStartDate',
      endDate: 'getSelectedEndDate',
      isExportPng: 'isExportPng',
      exportName: 'getExportName',
      showSummaryPanel: 'showSummaryPanel',
      visType: 'visType',
      currentRange: 'currentRange',
      error: 'error',
      recordsTable: 'recordsTable',
      hasInterval: 'hasInterval',
      currentInterval: 'currentInterval',
      yearsWeeks: 'yearsWeeks',
      colourPalette: 'colourPalette',
    }),
    records() {
      return this.$route.query.records;
    },
  },
  watch: {
    nemData(data) {
      const start = this.startDate;
      const end = this.endDate;

      if (!this.isChartZoomed) {
        updateRouterStartEnd(this.$router, start, end);
      }

      // Generate table data
      this.$store.dispatch('generateRangeSummary', {
        data,
        start,
        end,
      });
    },
    colourPalette(newPalette) {
      const colours = newPalette.colours;
      const updatedDomains = this.updateDomains(colours);

      this.$store.dispatch('setDomains', updatedDomains);
      this.fetch();
    },
  },
  methods: {
    downloadPng() {
      // a slight delay to allow some conditional statements to flow through by other listeners
      setTimeout(() => {
        domtoimage.toBlob(document.getElementById('export-container'))
          .then((blob) => {
            FileSaver.saveAs(blob, `${this.exportName}.png`);
          });
      }, 5);
    },
    updateDomains(colours) {
      const updated = {};

      Object.keys(GraphDomains).forEach((key) => {
        const d = GraphDomains[key];
        updated[key] = {
          colour: colours[key] || d.colour,
          type: d.type,
          label: d.label,
          powerUnit: d.powerUnit || '',
          energyUnit: d.energyUnit || '',
          unit: d.unit || '',
        };
      });

      return updated;
    },
    fetch() {
      const urls = ['wa/close_collie_and_muja.json'];
      this.$store.dispatch('fetchWA', urls);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.loading {
  background-color: $background;
  margin-top: 1rem;
  padding-top: 2rem;
  position: absolute;
  left: 3rem;
  right: 3rem;
}

.export {
  max-width: 650px;
  margin: 1rem auto;

  .vis {
    margin: 0.5rem;
    height: 300px;
  }

  table {
    width: 100%;
  }

  #export-container {
    padding: 1rem;
    background-color: $background;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-shadow: 0 0 50px #ddd;
    padding: 1rem 0.5rem;
  }
}

</style>