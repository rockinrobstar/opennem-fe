<template>
  <section>
    <div 
      class="legend-item"
      v-for="row in rangeSummary.sourcesData"
      :key="row.id"
      v-show="!isDisabled(row.id)"
    >
      <span class="source-colour" :style="{ backgroundColor: row.colour }"></span>
      <div class="source-label">
        {{row.label}}
        <em>
          {{ getContribution(row.range.power, rangeSummaryTotal) | formatNumber('0,0.0') }}<span v-if="hasValue(getContribution(row.range.power, rangeSummaryTotal))">%</span>
        </em>
      </div>
    </div>
    <div class="legend-item"
      v-for="row in rangeSummary.loadsData" 
      :key="row.id"
      v-show="!isDisabled(row.id)"
    >
      <span class="source-colour" :style="{ backgroundColor: row.colour }"></span>
      <div class="source-label">
        {{row.label}}
        <em>
          {{ getContribution(row.range.power, rangeSummaryTotal) | formatNumber('0,0.0') }}<span v-if="hasValue(getContribution(row.range.power, rangeSummaryTotal))">%</span>
        </em>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatNumberForDisplay } from '@/lib/formatter';

export default {
  computed: {
    ...mapGetters({
      rangeSummary: 'getRangeSummary',
      contributionType: 'contributionType',
      disabledSeries: 'disabledSeries',
    }),
    isTypeGeneration() {
      return this.contributionType === 'generation';
    },
    rangeSummaryTotal() {
      return this.isTypeGeneration ?
        this.rangeSummary.totalGrossPower :
        this.rangeSummary.totalNetPower;
    },
  },
  methods: {
    hasValue(value) {
      return value || false;
    },
    getContribution(pointValue, total) {
      return (pointValue / total) * 100;
    },
    isDisabled(rowId) {
      return this.disabledSeries.find(r => r === rowId);
    },
  },
  filters: {
    formatNumber(value, format) {
      return formatNumberForDisplay(value, format);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/bulma/sass/utilities/mixins.sass";

section {
  margin-top: 0;
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap;
}
.legend-item {
  font-size: 0.75rem;
  margin-right: 0.5rem;
  width: 47%;
  white-space: nowrap;

  @include desktop {
    width: 31%;
  }
}
.source-label {
  display: inline-block;
  font-weight: 600;

  em {
    font-weight: normal;
    font-style: normal;
  }
}
.source-colour {
  width: 14px;
  height: 14px;
  background-color: rgba(255,255,255,.8);
  display: inline-block;
  vertical-align: text-bottom;
  margin-right: 0.1rem;
}
</style>

