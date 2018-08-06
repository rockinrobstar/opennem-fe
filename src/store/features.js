/* eslint-disable */
import { lsGet, lsSet } from '@/lib/localstorage';
import * as MutationTypes from '@/constants/mutation-types';

// set up local storage
if (!lsGet(MutationTypes.FEATURE_TOGGLE_LOCAL_DATA)) {
  lsSet(MutationTypes.FEATURE_TOGGLE_LOCAL_DATA, false);
}
if (!lsGet(MutationTypes.FEATURE_TOGGLE_MORE_DATE_RANGES)) {
  lsSet(MutationTypes.FEATURE_TOGGLE_MORE_DATE_RANGES, false);
}
if (!lsGet(MutationTypes.FEATURE_TOGGLE_RECORDS_TABLE)) {
  lsSet(MutationTypes.FEATURE_TOGGLE_RECORDS_TABLE, false);
}
if (!lsGet(MutationTypes.FEATURE_TOGGLE_EMISSIONS_VOLUME)) {
  lsSet(MutationTypes.FEATURE_TOGGLE_EMISSIONS_VOLUME, false);
}
if (!lsGet(MutationTypes.FEATURE_TOGGLE_EMISSIONS_INTENSITY)) {
  lsSet(MutationTypes.FEATURE_TOGGLE_EMISSIONS_INTENSITY, false);
}

const state = {
  localData: lsGet(MutationTypes.FEATURE_TOGGLE_LOCAL_DATA),
  moreDateRanges: lsGet(MutationTypes.FEATURE_TOGGLE_MORE_DATE_RANGES),
  recordsTable: lsGet(MutationTypes.FEATURE_TOGGLE_RECORDS_TABLE),
  emissionsVolume: lsGet(MutationTypes.FEATURE_TOGGLE_EMISSIONS_VOLUME),
  emissionsIntensity: lsGet(MutationTypes.FEATURE_TOGGLE_EMISSIONS_INTENSITY),
};

const mutations = {
  [MutationTypes.FEATURE_TOGGLE_LOCAL_DATA](state, data) {
    lsSet(MutationTypes.FEATURE_TOGGLE_LOCAL_DATA, data);
    state.localData = data;
  },
  [MutationTypes.FEATURE_TOGGLE_MORE_DATE_RANGES](state, data) {
    lsSet(MutationTypes.FEATURE_TOGGLE_MORE_DATE_RANGES, data);
    state.moreDateRanges = data;
  },
  [MutationTypes.FEATURE_TOGGLE_RECORDS_TABLE](state, data) {
    lsSet(MutationTypes.FEATURE_TOGGLE_RECORDS_TABLE, data);
    state.recordsTable = data;
  },
  [MutationTypes.FEATURE_TOGGLE_EMISSIONS_VOLUME](state, data) {
    lsSet(MutationTypes.FEATURE_TOGGLE_EMISSIONS_VOLUME, data);
    state.emissionsVolume = data;
  },
  [MutationTypes.FEATURE_TOGGLE_EMISSIONS_INTENSITY](state, data) {
    lsSet(MutationTypes.FEATURE_TOGGLE_EMISSIONS_INTENSITY, data);
    state.emissionsIntensity = data;
  },
};

const getters = {
  localData: state => {
    return state.localData;
  },
  moreDateRanges: state => {
    return state.moreDateRanges;
  },
  recordsTable: state => {
    return state.recordsTable;
  },
  emissionsVolume: state => {
    return state.emissionsVolume;
  },
  emissionsIntensity: state => {
    return state.emissionsIntensity;
  },
};

const actions = {
  localData({ commit, state }, data) {
    commit(MutationTypes.FEATURE_TOGGLE_LOCAL_DATA, data);
  },
  moreDateRanges({ commit, state }, data) {
    commit(MutationTypes.FEATURE_TOGGLE_MORE_DATE_RANGES, data);
  },
  recordsTable({ commit, state }, data) {
    commit(MutationTypes.FEATURE_TOGGLE_RECORDS_TABLE, data);
  },
  emissionsVolume({ commit, state }, data) {
    commit(MutationTypes.FEATURE_TOGGLE_EMISSIONS_VOLUME, data);
  },
  emissionsIntensity({ commit, state }, data) {
    commit(MutationTypes.FEATURE_TOGGLE_EMISSIONS_INTENSITY, data);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
