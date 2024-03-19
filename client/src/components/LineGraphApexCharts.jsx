import React, { useEffect, useRef } from "react";
import ApexCharts from 'apexcharts';

const ChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Your raw data
    const rawData = [
        { date: '3/2/22', open: 44438.31 },
        { date: '3/3/22', open: 43919.29 },
        { date: '3/4/22', open: 42458.89 },
        { date: '3/5/22', open: 39159.26 },
        { date: '3/6/22', open: 39405.86 },
        { date: '3/7/22', open: 38424.08 },
        { date: '3/8/22', open: 37992.63 },
        { date: '3/9/22', open: 38739.44 },
        { date: '3/10/22', open: 41959.42 },
        { date: '3/11/22', open: 39431.88 },
        { date: '3/12/22', open: 38733.39 },
        { date: '3/13/22', open: 38806.22 },
        { date: '3/14/22', open: 37794.01 },
        { date: '3/15/22', open: 39671.94 },
        { date: '3/16/22', open: 39291.58 },
        { date: '3/17/22', open: 41132.44 },
        { date: '3/18/22', open: 40941.75 },
        { date: '3/19/22', open: 41781.12 },
        { date: '3/20/22', open: 42231.04 },
        { date: '3/21/22', open: 41284.7 },
        { date: '3/22/22', open: 41005.65 },
        { date: '3/23/22', open: 42383.11 },
        { date: '3/24/22', open: 42899.5 },
        { date: '3/25/22', open: 44019.02 },
        { date: '3/26/22', open: 44333.52 },
        { date: '3/27/22', open: 44546.27 },
        { date: '3/28/22', open: 46843.06 },
        { date: '3/29/22', open: 47133.22 },
        { date: '3/30/22', open: 47459.87 },
        { date: '3/31/22', open: 47079.87 },
        { date: '4/1/22', open: 45523.9 },
        { date: '4/2/22', open: 46302.46 },
        { date: '4/3/22', open: 45816.89 },
        { date: '4/4/22', open: 46423.6 },
        { date: '4/5/22', open: 46597.67 },
        { date: '4/6/22', open: 45507.33 },
        { date: '4/7/22', open: 43172.02 },
        { date: '4/8/22', open: 43440 },
        { date: '4/9/22', open: 42255.54 },
        { date: '4/10/22', open: 42759.24 },
        { date: '4/11/22', open: 42166.35 },
        { date: '4/12/22', open: 39530.8 },
        { date: '4/13/22', open: 40080.65 },
        { date: '4/14/22', open: 41151.48 },
        { date: '4/15/22', open: 39945.91 },
        { date: '4/16/22', open: 40562.26 },
        { date: '4/17/22', open: 40389.05 },
        { date: '4/18/22', open: 39681.63 },
        { date: '4/19/22', open: 40811.12 },
        { date: '4/20/22', open: 41501.19 },
        { date: '4/21/22', open: 41368.2 },
        { date: '4/22/22', open: 40482.63 },
        { date: '4/23/22', open: 39708.86 },
        { date: '4/24/22', open: 39451.85 },
        { date: '4/25/22', open: 39455.59 },
        { date: '4/26/22', open: 40430 },
        { date: '4/27/22', open: 38113.22 },
        { date: '4/28/22', open: 39242.8 },
        { date: '4/29/22', open: 39740.07 },
        { date: '4/30/22', open: 38595.79 },
        { date: '5/1/22', open: 37636.46 },
        { date: '5/2/22', open: 38471.49 },
        { date: '5/3/22', open: 38519.69 },
        { date: '5/4/22', open: 37724.19 },
        { date: '5/5/22', open: 39682.36 },
        { date: '5/6/22', open: 36547.34 },
        { date: '5/7/22', open: 36007.45 },
        { date: '5/8/22', open: 35463.49 },
        { date: '5/9/22', open: 34039.3 },
        { date: '5/10/22', open: 30071.85 },
        { date: '5/11/22', open: 31002.2 },
        { date: '5/12/22', open: 28974.81 },
        { date: '5/13/22', open: 28947.63 },
        { date: '5/14/22', open: 29228.07 },
        { date: '5/15/22', open: 30045.08 },
        { date: '5/16/22', open: 31289.49 },
        { date: '5/17/22', open: 29837.15 },
        { date: '5/18/22', open: 30413.2 },
        { date: '5/19/22', open: 28666.61 },
        { date: '5/20/22', open: 30283.67 },
        { date: '5/21/22', open: 30436.16 },
        { date: '5/22/22', open: 30649.32 },
        { date: '5/23/22', open: 29055.84 },
        { date: '5/24/22', open: 28483.89 },
        { date: '5/25/22', open: 28394.71 },
        { date: '5/26/22', open: 28612.49 },
        { date: '5/27/22', open: 29069.94 },
        { date: '5/28/22', open: 28824.12 },
        { date: '5/29/22', open: 28665.6 },
        { date: '5/30/22', open: 28496.16 },
        { date: '5/31/22', open: 27446.32 },
        { date: '6/1/22', open: 28191.88 },
        { date: '6/2/22', open: 28129.29 },
        { date: '6/3/22', open: 27914.12 },
        { date: '6/4/22', open: 27626.01 },
        { date: '6/5/22', open: 27785.08 },
        { date: '6/6/22', open: 27990.84 },
        { date: '6/7/22', open: 28832.83 },
        { date: '6/8/22', open: 28496.55 },
        { date: '6/9/22', open: 27848.44 },
        { date: '6/10/22', open: 27994.49 },
        { date: '6/11/22', open: 27317.92 },
        { date: '6/12/22', open: 27763.53 },
        { date: '6/13/22', open: 28619.14 },
        { date: '6/14/22', open: 28463.67 },
        { date: '6/15/22', open: 27765.97 },
        { date: '6/16/22', open: 26855.6 },
        { date: '6/17/22', open: 27445.74 },
        { date: '6/18/22', open: 27580.05 },
        { date: '6/19/22', open: 27821.63 },
        { date: '6/20/22', open: 27429.94 },
        { date: '6/21/22', open: 27638.48 },
        { date: '6/22/22', open: 28362.68 },
        { date: '6/23/22', open: 28409.92 },
        { date: '6/24/22', open: 28128.79 },
        { date: '6/25/22', open: 28394.06 },
        { date: '6/26/22', open: 28210.99 },
        { date: '6/27/22', open: 28476.61 },
        { date: '6/28/22', open: 28269.06 },
        { date: '6/29/22', open: 28336.92 },
        { date: '6/30/22', open: 27982.55 },
        { date: '7/1/22', open: 28377.5 },
        { date: '7/2/22', open: 28059.63 },
        { date: '7/3/22', open: 28322.29 },
        { date: '7/4/22', open: 28391.39 },
        { date: '7/5/22', open: 28368.04 },
        { date: '7/6/22', open: 28238.05 },
        { date: '7/7/22', open: 28243.77 },
        { date: '7/8/22', open: 28406.13 },
        { date: '7/9/22', open: 28471.07 },
        { date: '7/10/22', open: 28373.53 },
        { date: '7/11/22', open: 28349.11 },
        { date: '7/12/22', open: 28622.16 },
        { date: '7/13/22', open: 28573.42 },
        { date: '7/14/22', open: 28497.94 },
        { date: '7/15/22', open: 28234.89 },
        { date: '7/16/22', open: 28247.76 },
        { date: '7/17/22', open: 28234.74 },
        { date: '7/18/22', open: 28276.92 },
        { date: '7/19/22', open: 28316.69 },
        { date: '7/20/22', open: 28280.34 },
        { date: '7/21/22', open: 28357.85 },
        { date: '7/22/22', open: 28330.11 },
        { date: '7/23/22', open: 28294.42 },
        { date: '7/24/22', open: 28314.67 },
        { date: '7/25/22', open: 28268.53 },
        { date: '7/26/22', open: 28313.16 },
        { date: '7/27/22', open: 28345.62 },
        { date: '7/28/22', open: 28280.1 },
        { date: '7/29/22', open: 28222.98 },
        { date: '7/30/22', open: 28356.39 },
        { date: '7/31/22', open: 28439.82 },
        { date: '8/1/22', open: 28410.49 },
        { date: '8/2/22', open: 28417.71 },
        { date: '8/3/22', open: 28417.58 },
        { date: '8/4/22', open: 28401.63 },
        { date: '8/5/22', open: 28384.3 },
        { date: '8/6/22', open: 28384.34 },
        { date: '8/7/22', open: 28369.08 },
        { date: '8/8/22', open: 28361.21 },
        { date: '8/9/22', open: 28362.03 },
        { date: '8/10/22', open: 28357.15 },
        { date: '8/11/22', open: 28349.07 },
        { date: '8/12/22', open: 28345.29 },
        { date: '8/13/22', open: 28345.48 },
        { date: '8/14/22', open: 28344.21 },
        { date: '8/15/22', open: 28336.18 },
        { date: '8/16/22', open: 28322.8 },
        { date: '8/17/22', open: 28313.21 },
        { date: '8/18/22', open: 28307.15 },
        { date: '8/19/22', open: 28298.56 },
        { date: '8/20/22', open: 28290.05 },
        { date: '8/21/22', open: 28280.91 },
        { date: '8/22/22', open: 28272.63 },
        { date: '8/23/22', open: 28265.9 },
        { date: '8/24/22', open: 28262.9 },
        { date: '8/25/22', open: 28258.49 },
        { date: '8/26/22', open: 28257.11 },
        { date: '8/27/22', open: 28255.58 },
        { date: '8/28/22', open: 28251.38 },
        { date: '8/29/22', open: 28247.34 },
        { date: '8/30/22', open: 28243.24 },
        { date: '8/31/22', open: 28239.18 },
        { date: '9/1/22', open: 28236.35 },
        { date: '9/2/22', open: 28233.5 },
        { date: '9/3/22', open: 28232.33 },
        { date: '9/4/22', open: 28231.48 },
        { date: '9/5/22', open: 28229.54 },
        { date: '9/6/22', open: 28228.02 },
        { date: '9/7/22', open: 28226.83 },
        { date: '9/8/22', open: 28225.64 },
        { date: '9/9/22', open: 28225.23 },
        { date: '9/10/22', open: 28223.99 },
        { date: '9/11/22', open: 28223.29 },
        { date: '9/12/22', open: 28222.61 },
        { date: '9/13/22', open: 28221.48 },
        { date: '9/14/22', open: 28221.55 },
        { date: '9/15/22', open: 28220.98 },
        { date: '9/16/22', open: 28219.61 },
        { date: '9/17/22', open: 28219.1 },
        { date: '9/18/22', open: 28218.69 },
        { date: '9/19/22', open: 28218.16 },
        { date: '9/20/22', open: 28217.62 },
        { date: '9/21/22', open: 28217.08 },
        { date: '9/22/22', open: 28216.63 },
        { date: '9/23/22', open: 28216.21 },
        { date: '9/24/22', open: 28215.82 },
        { date: '9/25/22', open: 28215.41 },
        { date: '9/26/22', open: 28215.02 },
        { date: '9/27/22', open: 28214.62 },
        { date: '9/28/22', open: 28214.27 },
        { date: '9/29/22', open: 28213.89 },
        { date: '9/30/22', open: 28213.59 },
        { date: '10/1/22', open: 28213.26 },
        { date: '10/2/22', open: 28212.93 },
        { date: '10/3/22', open: 28212.62 },
        { date: '10/4/22', open: 28212.33 },
        { date: '10/5/22', open: 28212.01 },
        { date: '10/6/22', open: 28211.7 },
        { date: '10/7/22', open: 28211.4 },
        { date: '10/8/22', open: 28211.12 },
        { date: '10/9/22', open: 28210.82 },
        { date: '10/10/22', open: 28210.55 },
        { date: '10/11/22', open: 28210.31 },
        { date: '10/12/22', open: 28210.04 },
        { date: '10/13/22', open: 28209.77 },
        { date: '10/14/22', open: 28209.53 },
        { date: '10/15/22', open: 28209.3 },
        { date: '10/16/22', open: 28209.05 },
        { date: '10/17/22', open: 28208.79 },
        { date: '10/18/22', open: 28208.59 },
        { date: '10/19/22', open: 28208.35 },
        { date: '10/20/22', open: 28208.14 },
        { date: '10/21/22', open: 28207.91 },
        { date: '10/22/22', open: 28207.72 },
        { date: '10/23/22', open: 28207.52 },
        { date: '10/24/22', open: 28207.3 },
        { date: '10/25/22', open: 28207.1 },
        { date: '10/26/22', open: 28206.92 },
        { date: '10/27/22', open: 28206.73 },
        { date: '10/28/22', open: 28206.54 },
        { date: '10/29/22', open: 28206.37 },
        { date: '10/30/22', open: 28206.17 },
        { date: '10/31/22', open: 28206.01 },
        { date: '11/1/22', open: 28205.81 },
        { date: '11/2/22', open: 28205.66 },
        { date: '11/3/22', open: 28205.5 },
        { date: '11/4/22', open: 28205.36 },
        { date: '11/5/22', open: 28205.22 },
        { date: '11/6/22', open: 28205.05 },
        { date: '11/7/22', open: 28204.91 },
        { date: '11/8/22', open: 28204.77 },
        { date: '11/9/22', open: 28204.64 },
        { date: '11/10/22', open: 28204.49 },
        { date: '11/11/22', open: 28204.38 },
        { date: '11/12/22', open: 28204.22 },
        { date: '11/13/22', open: 28204.11 },
        { date: '11/14/22', open: 28203.99 },
        { date: '11/15/22', open: 28203.88 },
        { date: '11/16/22', open: 28203.76 },
        { date: '11/17/22', open: 28203.66 },
        { date: '11/18/22', open: 28203.54 },
        { date: '11/19/22', open: 28203.42 },
        { date: '11/20/22', open: 28203.31 },
        { date: '11/21/22', open: 28203.2 },
        { date: '11/22/22', open: 28203.1 },
        { date: '11/23/22', open: 28202.98 },
        { date: '11/24/22', open: 28202.88 },
        { date: '11/25/22', open: 28202.78 },
        { date: '11/26/22', open: 28202.68 },
        { date: '11/27/22', open: 28202.57 },
        { date: '11/28/22', open: 28202.47 },
        { date: '11/29/22', open: 28202.38 },
        { date: '11/30/22', open: 28202.29 },
        { date: '12/1/22', open: 28202.19 },
        { date: '12/2/22', open: 28202.11 },
        { date: '12/3/22', open: 28202.01 },
        { date: '12/4/22', open: 28201.93 },
        { date: '12/5/22', open: 28201.86 },
        { date: '12/6/22', open: 28201.79 },
        { date: '12/7/22', open: 28201.71 },
        { date: '12/8/22', open: 28201.64 },
        { date: '12/9/22', open: 28201.56 },
        { date: '12/10/22', open: 28201.48 },
        { date: '12/11/22', open: 28201.4 },
        { date: '12/12/22', open: 28201.33 },
        { date: '12/13/22', open: 28201.27 },
        { date: '12/14/22', open: 28201.2 },
        { date: '12/15/22', open: 28201.14 },
        { date: '12/16/22', open: 28201.08 },
        { date: '12/17/22', open: 28201.02 },
        { date: '12/18/22', open: 28200.95 },
        { date: '12/19/22', open: 28200.9 },
        { date: '12/20/22', open: 28200.83 },
        { date: '12/21/22', open: 28200.78 },
        { date: '12/22/22', open: 28200.71 },
        { date: '12/23/22', open: 28200.67 },
        { date: '12/24/22', open: 28200.61 },
        { date: '12/25/22', open: 28200.57 },
        { date: '12/26/22', open: 28200.52 },
        { date: '12/27/22', open: 28200.47 },
        { date: '12/28/22', open: 28200.43 },
        { date: '12/29/22', open: 28200.37 },
        { date: '12/30/22', open: 28200.33 },
        { date: '12/31/22', open: 28200.29 },
    ];

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
    console.log("Buy");
    move = "Buy"
} 
else if (latestPrice < thresholdHold && latestPrice > thresholdBuy) {
    console.log("Hold");
    move = "Hold"
}
else {
    console.log("Sell");
    move = "Sell"
}

    // Function to render the chart with parsed data
    const renderChart = (seriesData) => {
      const options = {
        series: [{
          name: "Price",
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
          text: `Bitcoin (Recommendation: ${move})`,
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