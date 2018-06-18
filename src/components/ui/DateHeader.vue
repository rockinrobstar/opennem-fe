<template>
  <div class="date-range">
    <transition name="slide-fade" mode="out-in">
      <div v-if="!isFetching" class="dropdown" :class="{'is-active': dropdownActive}">
        <div class="point-date" v-if="isPointHovered">
          {{pointFromFormattedDate}}
          <span v-if="showToDate"> – {{pointToFormattedDate}}</span>
        </div>
        <div v-else>
          <button class="export-btn button is-small is-rounded is-primary is-inverted"
            v-show="isChartZoomed"
            @click="handlePreviousWeekClick">
            <font-awesome-icon class="fal fa-fw" :icon="iconPreviousWeek" />
          </button>
          <a class="dropdown-trigger" v-on-clickaway="onClickAway" @click="handleClick">
            {{formattedStartDate}}
            <span v-if="showEndDate"> – {{formattedEndDate}}</span>
          </a>
          <button class="export-btn button is-small is-rounded is-primary is-inverted"
            v-show="isChartZoomed"
            @click="handleNextWeekClick">
            <font-awesome-icon class="fal fa-fw" :icon="iconNextWeek" />
          </button>
        </div> 
      </div>
    </transition>
  </div>
</template>

<script>
import * as moment from 'moment';
import { mapGetters } from 'vuex';
import { mixin as clickaway } from 'vue-clickaway';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/fontawesome-pro-light';
import EventBus from '@/lib/event-bus';
import { formatDateForDisplay } from '@/lib/formatter';
import { isMidnight } from '@/lib/data-helpers';
import { getRegionOffset } from '@/domains/regions';
import { DateRanges } from '@/domains/date-ranges';

export default {
  name: 'date-header',
  mixins: [clickaway],
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      dropdownActive: false,
      dateSelectors: DateRanges,
    };
  },
  computed: {
    ...mapGetters({
      isChartZoomed: 'isChartZoomed',
      isFetching: 'isFetching',
      isPointHovered: 'isPointHovered',
      dataStartDate: 'getDataStartDate',
      dataEndDate: 'getDataEndDate',
      startDate: 'getSelectedStartDate',
      endDate: 'getSelectedEndDate',
      currentRange: 'currentRange',
      moreDateRanges: 'moreDateRanges',
    }),
    regionOffset() {
      return getRegionOffset(this.$route.params.region);
    },
    pointDate() {
      return formatDateForDisplay(this.$store.getters.getPointSummary.date, this.regionOffset);
    },
    pointFromDate() {
      return this.$store.getters.getPointSummary.dateFromTo.from;
    },
    pointToDate() {
      return this.$store.getters.getPointSummary.dateFromTo.to;
    },
    pointFromFormattedDate() {
      return formatDateForDisplay(this.pointFromDate);
    },
    pointToFormattedDate() {
      return formatDateForDisplay(this.pointToDate);
    },
    showToDate() {
      const isSame = moment(this.pointFromDate).isSame(this.pointToDate);
      return !isSame;
    },
    formattedStartDate() {
      return formatDateForDisplay(this.$store.getters.getSelectedStartDate, this.regionOffset);
    },
    formattedEndDate() {
      return formatDateForDisplay(this.$store.getters.getSelectedEndDate, this.regionOffset);
    },
    showEndDate() {
      const midnight = isMidnight(this.startDate);
      const aDayApart = moment(this.startDate).isSame(moment(this.endDate).subtract(1, 'day'));
      return !(midnight && aDayApart);
    },
    iconNextWeek() {
      return faArrowRight;
    },
    iconPreviousWeek() {
      return faArrowLeft;
    },
  },
  watch: {
    isPointHovered(hovered) {
      if (hovered) {
        this.onClickAway();
      }
    },
  },
  methods: {
    handleClick() {
      const isActive = !this.dropdownActive;
      this.dropdownActive = isActive;
    },
    onClickAway() {
      this.dropdownActive = false;
    },
    handleNextWeekClick() {
      // console.log(this.endDate)
      // console.log(this.dataEndDate);
      const start = this.endDate;
      const end = moment(this.endDate).add(7, 'days').toDate();

      this.dispatchEvents(start, end);
    },
    handlePreviousWeekClick() {
      const end = this.startDate;
      const start = moment(this.startDate).subtract(7, 'days').toDate();
      this.dispatchEvents(start, end);
    },
    dispatchEvents(start, end) {
      this.$store.dispatch('saveSelectedDates', {
        start,
        end,
      });

      EventBus.$emit('chart.zoom.startEnd');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/bulma/sass/utilities/mixins.sass";
@import "../../styles/variables.scss";

.date-range {
  font-family: $primary-font-family;
  font-size: 0.8rem;
  margin-top: 0.6rem;

  @include tablet {
    font-size: 1rem;
  }

  .dropdown {
    margin-right: 0.5rem;
  }
  .point-date {
    margin-right: 1rem;
  }

  a.dropdown-trigger {
    color: #000;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    cursor: default;
    position: relative;
    top: 1px;
  }
}

.dropdown-menu {
  width: 250px;

  @include tablet {
    right: 0;
    left: auto;
  }
}

.date-helper {
  font-size: 0.7rem;
  margin: .15rem 0 0 0.15rem;

  @include tablet {
    font-size: 0.8rem;
    margin: .2rem 0 0 0.3rem;
  }
}
</style>