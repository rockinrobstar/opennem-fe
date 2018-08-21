const GraphDomains = {
  pumps: {
    colour: '#fff',
    type: 'loads',
    label: 'Pumps',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  pumps_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Pumps Market Value',
    categoryId: 'price',
    unit: '$',
  },
  battery_charging: {
    colour: '#fff',
    type: 'loads',
    label: 'Battery (Charging)',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  battery_charging_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Battery (Charging) Market Value',
    categoryId: 'price',
    unit: '$',
  },
  exports: {
    colour: '#fff',
    type: 'loads',
    label: 'Exports',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  exports_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Exports Market Value',
    categoryId: 'price',
    unit: '$',
  },
  imports: {
    colour: '#44146F',
    type: 'sources',
    label: 'Imports',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  imports_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Imports Market Value',
    categoryId: 'price',
    unit: '$',
  },
  brown_coal: {
    colour: '#8B572A',
    type: 'sources',
    label: 'Brown Coal',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  brown_coal_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Brown Coal Market Value',
    categoryId: 'price',
    unit: '$',
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
  black_coal_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Black Coal Market Value',
    categoryId: 'price',
    unit: '$',
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
  biomass_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Biomass Market Value',
    categoryId: 'price',
    unit: '$',
  },
  distillate: {
    colour: '#F35020',
    type: 'sources',
    label: 'Distillate',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  distillate_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Distillate Market Value',
    categoryId: 'price',
    unit: '$',
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
  battery_discharging_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Battery (Discharging) Market Value',
    categoryId: 'price',
    unit: '$',
  },
  hydro: {
    colour: '#4582B4',
    type: 'sources',
    label: 'Hydro',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  hydro_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Hydro Market Value',
    categoryId: 'price',
    unit: '$',
  },
  gas_steam: {
    colour: '#F48E1B',
    type: 'sources',
    label: 'Gas (Steam)',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  gas_steam_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Gas (Steam) Market Value',
    categoryId: 'price',
    unit: '$',
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
  gas_ccgt_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Gas (CCGT) Market Value',
    categoryId: 'price',
    unit: '$',
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
  gas_ocgt_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Gas (OCGT) Market Value',
    categoryId: 'price',
    unit: '$',
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
  gas_recip_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Gas (Reciprocating) Market Value',
    categoryId: 'price',
    unit: '$',
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
  wind_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Wind Market Value',
    categoryId: 'price',
    unit: '$',
  },
  solar: {
    colour: '#DFCF00',
    type: 'sources',
    label: 'Solar (Utility)',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  solar_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Solar (Utility) Market Value',
    categoryId: 'price',
    unit: '$',
  },
  rooftop_solar: {
    colour: '#F8E71C',
    type: 'sources',
    label: 'Solar (Rooftop)',
    powerUnit: 'MW',
    energyUnit: 'GWh',
  },
  rooftop_solar_market_value: {
    colour: '#000',
    type: 'market_value',
    label: 'Solar (Rooftop) Market Value',
    categoryId: 'price',
    unit: '$',
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
  emissionsIntensity: {
    colour: '#000',
    type: 'other',
    label: 'Emissions Intensity',
    unit: '',
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

function isEmissions(id) {
  const domain = GraphDomains[id];
  return domain.type === 'emissions';
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

function isMarketValue(id) {
  const domain = GraphDomains[id];
  return domain.type === 'market_value';
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
  isEmissions,
  isMarketValue,
};
