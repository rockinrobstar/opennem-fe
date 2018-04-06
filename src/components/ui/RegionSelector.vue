<template>
  <div class="region-selector dropdown" :class="{'is-active': dropdownActive}">
    <a class="dropdown-trigger" href="/">
      <img class="logo" src="../../assets/opennem-logo.svg" alt="OpenNEM logo">
      <strong>Western Australia</strong>       
    </a> 
  </div>
</template>

<script>
export default {
  name: 'region-selector',
  data() {
    return {
      dropdownActive: false,
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/bulma/sass/utilities/mixins.sass";
@import "../../styles/variables.scss";

.region-selector {
  font-family: $header-font-family;
  font-size: 1.3rem;

  @include tablet {
    font-size: 1.7rem;
  }

  a.dropdown-trigger {
    color: #000;

    strong {
      position: relative;
      top: 2px;
      border-bottom: 1px dashed $opennem-primary-alpha;
    }
  }
  
}
</style>