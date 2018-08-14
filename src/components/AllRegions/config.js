import {
  getGenerationPanel,
  getEnergyPanel,
  getEmissionsVolumePanel,
  getEmissionsIntensityPanel,
} from '@/lib/chart-panels';

function powerPanel(listeners) {
  return [
    getGenerationPanel(listeners),
  ];
}

function energyPanel(listeners) {
  return [
    getEnergyPanel(listeners),
  ];
}

function energyEmissionsPanels(listeners) {
  return [
    getEnergyPanel(listeners),
    getEmissionsVolumePanel(listeners),
    getEmissionsIntensityPanel(listeners),
  ];
}

export {
  powerPanel,
  energyPanel,
  energyEmissionsPanels,
};
