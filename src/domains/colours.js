const ColourPalettes = [];

// default set
const defaultSet = {
  label: 'Default',
  colours: {
    pumps: '#fff',
    battery_charging: '#fff',
    exports: '#fff',
    imports: '#44146F',
    brown_coal: '#8B572A',
    black_coal: '#121212',
    biomass: '#A3886F',
    distillate: '#F35020',
    battery_discharging: '#00A2FA',
    hydro: '#4582B4',
    gas_steam: '#F48E1B',
    gas_ccgt: '#FDB462',
    gas_ocgt: '#FFCD96',
    gas_recip: '#F9DCBC',
    coal_gas_baseload: '#8B572A',
    fast_response_gas_turbine: '#FFCD96',
    wind: '#417505',
    solar: '#DFCF00',
    rooftop_solar: '#F8E71C',
    fixed_pv: '#DFCF00',
    rooftop_pv: '#F8E71C',
    demand: '#000',
    temperature: '#000',
    temperature_mean: '#000',
    temperature_min: '#000',
    temperature_max: '#000',
    price: '#000',
    volume_weighted_price: '#000',
    pricePos: '#000',
    priceNeg: '#000',
  },
};
// add to ColourPalettes
ColourPalettes.push(defaultSet);

// define your set
const highContrastSet = {
  label: 'High Contrast',
  colours: {
    coal_gas_baseload: '#d73027',
    fast_response_gas_turbine: '#fee090',
    wind: '#417505',
    fixed_pv: '#e0f3f8',
    rooftop_pv: '#4575b4',
    demand: '#000',
  },
};
// add to ColourPalettes
ColourPalettes.push(highContrastSet);

export default ColourPalettes;
