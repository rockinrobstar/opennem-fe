<template>
  <div>
    <button class="colour-palette-btn button is-small is-rounded is-primary is-inverted"
      @click="handleClick">
      <font-awesome-icon class="fal fa-fw" :icon="iconPalette" />
    </button>

    <transition name="fade">
      <div class="modal is-active" v-if="modalActive">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="panel">
            <h3 class="panel-heading">
              Pick another colour palette
            </h3>
            
            <a 
              class="panel-block" 
              @click="setColourPalette(palette)"
              :class="{ 'selected': colourPalette.label === palette.label }"
              v-for="(palette, index) in colourPalettes" 
              :key="index"
            >
              {{palette.label}}

              <div class="selected-icon">
                <font-awesome-icon 
                  v-show="colourPalette.label === palette.label"
                  class="fal fa-fw"
                  :icon="iconSelected" />
              </div>
            </a>

          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="handleClick"></button>
      </div>
    </transition>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faPalette, faCheck } from '@fortawesome/fontawesome-pro-light';
import ColourPalettes from '@/domains/colours';

export default {
  name: 'colour-palette-selector',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      modalActive: false,
      colourPalettes: ColourPalettes,
    };
  },
  computed: {
    ...mapGetters({
      colourPalette: 'colourPalette',
    }),
    iconPalette() {
      return faPalette;
    },
    iconSelected() {
      return faCheck;
    },
  },
  methods: {
    handleClick() {
      const isActive = !this.modalActive;
      this.modalActive = isActive;
    },
    closeModal() {
      this.modalActive = false;
    },
    setColourPalette(palette) {
      this.$store.dispatch('colourPalette', palette);
      this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/bulma/sass/utilities/mixins.sass";

.colour-palette-btn {
  position: absolute;
  right: 1rem;
  top: 1.5rem;

  .fal {
    position: relative;
    top: 1px;
    font-size: 18px;
  }

  @include tablet {
    // margin-left: 1rem;
    position: relative;
    top: 5px;
    right: 0;
  }
}

.panel-heading {
  font-size: 0.9rem;
  font-weight: 600;
}
.panel-block {
  padding: 0.5rem 1rem;
}

.selected-icon {
  position: absolute;
  right: 10px;
}

.modal-content {
  border-radius: 5px;
  max-width: 300px;
  background: #fff;
}
</style>