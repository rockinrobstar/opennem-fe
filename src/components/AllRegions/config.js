import { getGenerationPanel, getEnergyPanel, getEmissionsVolumePanel } from '@/lib/chart-panels';

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
  ];
}

export {
  powerPanel,
  energyPanel,
  energyEmissionsPanels,
};
