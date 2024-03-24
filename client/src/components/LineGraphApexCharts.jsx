import React, { useEffect, useRef, useState } from "react";
import ApexCharts from 'apexcharts';
import { useAuth } from '../contexts/AuthContext';
import FavoriteButton from './FavoriteButton';

const ChartComponent = ({ rawData, stockName, move }) => {
  const chartRef = useRef(null);
  const { userFavorites, setUserFavorites } = useAuth();

  useEffect(() => {
    const parseData = (rawData) => {
      return rawData.map(dataPoint => ({
        x: dataPoint.date,
        y: dataPoint.open
      }));
    };

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
            formatter: function (val) {
              return new Date(val).toLocaleDateString();
            }
          }
        }
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
    };

    const seriesData = parseData(rawData);
    renderChart(seriesData);

    return () => {
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <h2 style={{ flexGrow: 1, margin: 0 }}>{`${stockName} (Recommendation: ${move})`}</h2>
        <FavoriteButton
          stockName={stockName}
          userFavorites={userFavorites}
          setUserFavorites={setUserFavorites}
        />
      </div>
      <div id="chart" ref={chartRef}></div>
    </div>
  );
};

export default ChartComponent;