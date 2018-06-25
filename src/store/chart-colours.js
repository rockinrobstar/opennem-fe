/* eslint-disable */
import * as MutationTypes from '@/constants/mutation-types';
import ColourPalettes from '@/domains/colours';

const defaultSet = ColourPalettes[1]; // default set
const state = {
  colourPalette: defaultSet,
};

const mutations = {
  [MutationTypes.CHART_COLOUR_PALETTE](state, data) {
    state.colourPalette = data;
  },
};

const getters = {
  colourPalette: state => {
    return state.colourPalette;
  },
};

const actions = {
  colourPalette({ commit, state }, data) {
    commit(MutationTypes.CHART_COLOUR_PALETTE, data);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
