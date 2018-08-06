const GraphDomains = {
  pumps: {
    colour: '#fff',
    type: 'loads',
    label: 'Pumps',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  battery_charging: {
    colour: '#fff',
    type: 'loads',
    label: 'Battery (Charging)',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  exports: {
    colour: '#fff',
    type: 'loads',
    label: 'Exports',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  imports: {
    colour: '#44146F',
    type: 'sources',
    label: 'Imports',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  brown_coal: {
    colour: '#8B572A',
    type: 'sources',
    label: 'Brown Coal',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  brown_coal_emissions_volume: {
    colour: '#8B572A',
    type: 'emissions',
    label: 'Brown Coal',
    unit: '',
  },
  black_coal: {
    colour: '#121212',
    type: 'sources',
    label: 'Black Coal',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  black_coal_emissions_volume: {
    colour: '#121212',
    type: 'emissions',
    label: 'Black Coal',
    unit: '',
  },
  biomass: {
    colour: '#A3886F',
    type: 'sources',
    label: 'Biomass',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  distillate: {
    colour: '#F35020',
    type: 'sources',
    label: 'Distillate',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  distillate_emissions_volume: {
    colour: '#F35020',
    type: 'emissions',
    label: 'Distillate',
    unit: '',
  },
  battery_discharging: {
    colour: '#00A2FA',
    type: 'sources',
    label: 'Battery (Discharging)',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  hydro: {
    colour: '#4582B4',
    type: 'sources',
    label: 'Hydro',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  gas_steam: {
    colour: '#F48E1B',
    type: 'sources',
    label: 'Gas (Steam)',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  gas_steam_emissions_volume: {
    colour: '#F48E1B',
    type: 'emissions',
    label: 'Gas (Steam)',
    unit: '',
  },
  gas_ccgt: {
    colour: '#FDB462',
    type: 'sources',
    label: 'Gas (CCGT)',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  gas_ccgt_emissions_volume: {
    colour: '#FDB462',
    type: 'emissions',
    label: 'Gas (CCGT)',
    unit: '',
  },
  gas_ocgt: {
    colour: '#FFCD96',
    type: 'sources',
    label: 'Gas (OCGT)',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  gas_ocgt_emissions_volume: {
    colour: '#FFCD96',
    type: 'emissions',
    label: 'Gas (OCGT)',
    unit: '',
  },
  gas_recip: {
    colour: '#F9DCBC',
    type: 'sources',
    label: 'Gas (Reciprocating)',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  gas_recip_emissions_volume: {
    colour: '#F9DCBC',
    type: 'emissions',
    label: 'Gas (Reciprocating)',
    unit: '',
  },
  wind: {
    colour: '#417505',
    type: 'sources',
    label: 'Wind',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  solar: {
    colour: '#DFCF00',
    type: 'sources',
    label: 'Solar (Utility)',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  rooftop_solar: {
    colour: '#F8E71C',
    type: 'sources',
    label: 'Solar (Rooftop)',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  temperature: {
    colour: '#000',
    type: 'other',
    label: 'Temperature',
    categoryId: 'temperature',
    unit: 'C',
  },
  temperature_mean: {
    colour: '#000',
    type: 'other',
    label: 'Temperature',
    categoryId: 'temperature',
    unit: 'C',
  },
  temperature_min: {
    colour: '#000',
    type: 'other',
    label: 'Temperature',
    categoryId: 'temperature',
    unit: 'C',
  },
  temperature_max: {
    colour: '#000',
    type: 'other',
    label: 'Temperature',
    categoryId: 'temperature',
    unit: 'C',
  },
  price: {
    colour: '#000',
    type: 'other',
    label: 'Trading Price',
    categoryId: 'price',
    unit: '$/MWh',
  },
  volume_weighted_price: {
    colour: '#000',
    type: 'other',
    label: 'Volume Weighted Price',
    categoryId: 'price',
    unit: '$/MWh',
  },
  pricePos: {
    colour: '#000',
    type: 'other',
    label: 'Price (Positive only)',
    categoryId: 'price',
    unit: '$/MWh',
  },
  priceNeg: {
    colour: '#000',
    type: 'other',
    label: 'Price (Negative only)',
    categoryId: 'price',
    unit: '$/MWh',
  },
};

function getUnit(domain, visType) {
  let unit = GraphDomains[domain].unit;
  if (!unit) {
    const type = visType || 'power';
    unit = GraphDomains[domain][`${type}Unit`];
  }
  return unit;
}

function isValidFuelTech(id) {
  const domain = GraphDomains[id];
  return domain.type === 'sources' || domain.type === 'loads';
}

function isRenewableFuelTech(id) {
  return id === 'wind' ||
    id === 'biomass' ||
    id === 'hydro' ||
    id === 'rooftop_solar' ||
    id === 'solar';
}

function isPrice(id) {
  return id === 'price' || id === 'volume_weighted_price';
}

function isTemperature(id) {
  return id === 'temperature' ||
  id === 'temperature_mean' ||
  id === 'temperature_min' ||
  id === 'temperature_max';
}

function isLoads(id) {
  const domain = GraphDomains[id];
  return domain.type === 'loads';
}

function isImports(id) {
  return id === 'imports';
}

function getCSVHeaders(visType) {
  const headers = {
    Time: 'date',
  };

  Object.keys(GraphDomains).reverse().forEach((domain) => {
    function isValidCsvHeader(name) {
      return name !== 'pricePos' &&
        name !== 'priceNeg';
    }

    if (isValidCsvHeader(domain)) {
      const ftLabel = GraphDomains[domain].label;
      const ftUnit = getUnit(domain, visType);
      const label = `${ftLabel} - ${ftUnit}`;
      headers[label] = domain;
    }
  });

  return headers;
}

export {
  GraphDomains,
  getCSVHeaders,
  isLoads,
  isImports,
  isValidFuelTech,
  isRenewableFuelTech,
  isPrice,
  isTemperature,
};
