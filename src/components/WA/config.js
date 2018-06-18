import { getGenerationPanel, getEnergyPanel } from '@/lib/chart-panels';
import { formatNumberForDisplay } from '@/lib/formatter';

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

// custom Demand Graph
function getDemandGraph() {
  return {
    stackable: false,
    id: 'demand',
    valueField: 'demand',
    type: 'smoothedLine',
    fillAlphas: 0,
    lineAlpha: 1,
    lineColor: '#000',
    useDataSetColors: false,
    showBalloon: true,
    periodValue: 'Average',
    balloonFunction: (item) => {
      let balloonTxt = '';

      if (item.values.value > 0) {
        const value = formatNumberForDisplay(item.dataContext.demandAverage);
        const displayValue = `${value} MW`;

        balloonTxt = `
          <div style="font-size: 1.1em;">
            <span 
              style="display: inline-block; width: 13px; 
                height: 13px; position: relative; top: 2px; 
                margin-right: 5px; background: #000;"></span>
            Demand: <strong> ${displayValue}</strong>
          </div>
        `;
      }
      return balloonTxt;
    },
  };
}

export {
  powerPanel,
  energyPanel,
  getDemandGraph,
};
