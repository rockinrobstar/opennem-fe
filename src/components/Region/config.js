import {
  getGenerationPanel,
  getEnergyPanel,
  getPricePanels,
  getTemperaturePanel,
  getEmissionsVolumePanel,
  getEmissionsIntensityPanel,
} from '@/lib/chart-panels';

function getAllPanelsGeneration(listeners, priceField, temperatureField, hasMinMax, showBullets) {
  return [
    getGenerationPanel(listeners),
    ...getPricePanels(listeners, priceField), // 3 panels in price
    getTemperaturePanel(listeners, temperatureField, hasMinMax, showBullets),
  ];
}

function getAllPanelsEnergy(listeners, priceField, temperatureField, hasMinMax, showBullets) {
  return [
    getEnergyPanel(listeners),
    ...getPricePanels(listeners, priceField), // 3 panels in price
    getTemperaturePanel(listeners, temperatureField, hasMinMax, showBullets),
  ];
}

function getAllPanelsEnergyEmissions(listeners, priceField,
  temperatureField, hasMinMax, showBullets) {
  return [
    getEnergyPanel(listeners),
    ...getPricePanels(listeners, priceField), // 3 panels in price
    getTemperaturePanel(listeners, temperatureField, hasMinMax, showBullets),
    getEmissionsVolumePanel(listeners),
    getEmissionsIntensityPanel(listeners),
  ];
}

function getGenerationAndPricePanels(listeners) {
  return [
    getGenerationPanel(listeners),
    ...getPricePanels(listeners), // 3 panels in price
  ];
}

function getGenerationAndTemperaturePanels(listeners) {
  return [
    getGenerationPanel(listeners),
    getTemperaturePanel(listeners),
  ];
}

function generationPanel(listeners) {
  return [
    getGenerationPanel(listeners),
  ];
}

function energyPanel(listeners) {
  return [
    getEnergyPanel(listeners),
  ];
}

function getAllPanelsPercentHeight() {
  return [50, 7, 13, 5, 15];
}

function getGenerationOnlyPanelPercentHeight() {
  return [100, 0, 0, 0, 0];
}

function getGenerationPricePanelPercentHeight() {
  return [60, 10, 18, 7, 0];
}

function getGenerationTemperaturePanelPercentHeight() {
  return [70, 0, 0, 0, 30];
}

export {
  getAllPanelsGeneration,
  getAllPanelsEnergy,
  getAllPanelsEnergyEmissions,
  getGenerationAndPricePanels,
  getGenerationAndTemperaturePanels,
  generationPanel,
  energyPanel,
  getAllPanelsPercentHeight,
  getGenerationOnlyPanelPercentHeight,
  getGenerationPricePanelPercentHeight,
  getGenerationTemperaturePanelPercentHeight,
};
