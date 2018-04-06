const Domains = {
  coal_gas_baseload: {
    colour: '#8B572A',
    type: 'sources',
    label: 'Coal Gas Baseload',
    unit: 'MW',
  },
  fast_response_gas_turbine: {
    colour: '#FFCD96',
    type: 'sources',
    label: 'Gas (FR Turbine)',
    unit: 'MW',
  },
  wind: {
    colour: '#417505',
    type: 'sources',
    label: 'Wind',
    unit: 'MW',
  },
  rooftop_pv: {
    colour: '#DFCF00',
    type: 'sources',
    label: 'Solar (Rooftop PV)',
    unit: 'MW',
  },
  fixed_pv: {
    colour: '#F8E71C',
    type: 'sources',
    label: 'Solar (Fixed PV)',
    unit: 'MW',
  },
  demand: {
    colour: '#000',
    type: 'sources',
    label: 'Demand',
    unit: 'MW',
  },
};

export { Domains as default };
