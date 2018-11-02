<template>
  <nav role="navigation" aria-label="main dropdown navigation">
    <export-header v-if="isExportPng" />

    <div v-else>
      <div class="region-selector-wrapper"><region-selector /></div>
      <div class="level">
        <div class="level-left">
          <date-selector-2 />
        </div>

        <div class="level-right">
          <date-selector />
          <export-modal />
        </div>
      </div>
    </div>    
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import RegionSelector from './RegionSelector';
import DateSelector from './DateSelector';
import ExportHeader from '../Export/Header';
import ExportModal from '../Export/Modal';
import DateSelector2 from './DateSelector2';

export default {
  name: 'header-nav',
  components: {
    RegionSelector,
    DateSelector,
    ExportHeader,
    ExportModal,
    DateSelector2,
  },
  computed: {
    ...mapGetters({
      isExportPng: 'isExportPng',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../../node_modules/bulma/sass/utilities/mixins.sass";

nav {
  position: sticky;
  z-index: 99;
  top: 0;
  background-color: $background-alpha;
  padding: 0.5rem 0;
}

h1 {
  font-weight: bold;
}

.region-selector-wrapper {
  margin-left: 1rem;

  @include tablet {
    margin-left: 0;
    text-align: center;
  }
}

.level {
  max-width: 1400px;
  margin: 1rem auto 0;
  padding: 0 1rem;
}

.level-right {
  margin-top: 0;
}

</style>