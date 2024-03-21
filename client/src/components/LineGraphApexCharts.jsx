import React, { useEffect, useRef } from "react";
import ApexCharts from 'apexcharts';

const ChartComponent = ({ rawData, stockName }) => {
  const chartRef = useRef(null);

  useEffect(() => {

    // Function to parse raw data into series data for the chart
    const parseData = (rawData) => {
      return rawData.map(dataPoint => ({
        x: dataPoint.date,
        y: dataPoint.open
      }));
    };

const highestPrice = Math.max(...rawData.map(data => data.open));
console.log(highestPrice)
const latestPrice = rawData[rawData.length - 1].open;
const thresholdBuy = 0.5 * highestPrice;
const thresholdHold = 0.25 * highestPrice;
let move = ""
if (latestPrice < thresholdBuy) {
    move = "Buy"
} 
else if (latestPrice < thresholdHold && latestPrice > thresholdBuy) {
    move = "Hold"
}
else {
    move = "Sell"
}

    // Function to render the chart with parsed data
    const renderChart = (seriesData) => {
      const options = {
        series: [{
          name: `${stockName} Price`,
          data: seriesData
        }],
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: `${stockName} (Recommendation: ${move})`,
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            formatter: function(val) {
              return new Date(val).toLocaleDateString();
            }
          }
        }
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
    };

    // Parse the raw data
    const seriesData = parseData(rawData);

    // Render the chart with parsed data
    renderChart(seriesData);

    // Cleanup function to destroy chart instance
    return () => {
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div id="chart" ref={chartRef}></div>;
};

export default ChartComponent;