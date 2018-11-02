<template>
  <div class="date-range">
    <div class="buttons has-addons is-right">
      <span 
        class="button is-rounded is-small is-primary"
        :class="{ 'is-inverted': currentRange !== dateRange.id }"
        v-for="dateRange in dateSelectors"
        :key="dateRange.id"
        @click="handleSelection(dateRange)"
      >
        {{dateRange.label}}
      </span>
    </div>
    <div class="buttons has-addons">
      <span 
        class="button is-rounded is-small is-primary"
        v-for="p in groupToPeriods"
        :class="{ 'is-inverted': period !== p }"
        :key="p"
      >
        {{ getPeriodLabel(p) }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { DateRanges } from '@/domains/date-ranges-2';
import * as Periods from '@/constants/periods';

export default {
  name: 'date-selector-2',

  data() {
    return {
      dateSelectors: DateRanges,
    }
  },
  
  computed: {
    ...mapGetters({
      currentRange: 'currentRange',
      period: 'period',
      groupToPeriods: 'groupToPeriods',
    }),
  },

  mounted() {
    console.log(this.currentRange)
  },

  methods: {
    getPeriodLabel(period) {
      console.log(Periods.PERIOD_LABELS[period])
      return Periods.PERIOD_LABELS[period];
    },
    handleSelection(range) {
      if (range.id !== this.currentRange) {
        this.$store.dispatch('fetchingData', true);
        this.$store.dispatch('setChartZoomed', false);
        this.$store.dispatch('setVisType', range.visType);
        this.$store.dispatch('currentRange', range.id);
        this.$store.dispatch('groupToPeriods', range.groupToPeriods);
        this.$store.dispatch('chartTypeTransition', false);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/bulma/sass/utilities/mixins.sass";
@import "../../styles/variables.scss";

.date-range {
  display: flex;
}
.buttons {
  margin-bottom: 0;
  margin-right: 1rem;

  .button {
    margin-bottom: 0;
  }
}
</style>