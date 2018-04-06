<template>
  <div class="date-range">
    <transition name="slide-fade" mode="out-in">
      <loader class="fetching" v-if="isFetching" />
      <div v-else class="dropdown" :class="{'is-active': dropdownActive}">
        <div v-if="isPointHovered">
          {{pointDate}}
        </div>
        <div v-else>
          <a class="dropdown-trigger">
            {{startDate}} – {{endDate}}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatDateForDisplay } from '@/lib/formatter';
import Loader from './Loader';

export default {
  name: 'date-selector',
  components: {
    Loader,
  },
  data() {
    return {
      dropdownActive: false,
    };
  },
  computed: {
    ...mapGetters({
      isFetching: 'isFetching',
      isPointHovered: 'isPointHovered',
    }),
    pointDate() {
      return formatDateForDisplay(this.$store.getters.getPointSummary.date);
    },
    startDate() {
      return formatDateForDisplay(this.$store.getters.getSelectedStartDate);
    },
    endDate() {
      return formatDateForDisplay(this.$store.getters.getSelectedEndDate);
    },
  },
  watch: {
  },
  methods: {
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

  a.dropdown-trigger {
    color: #000;
  }
}
</style>