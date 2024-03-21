import React, { useEffect, useRef, useState } from "react";
import ApexCharts from 'apexcharts';

const ChartComponent = ({ rawData, stockName, move }) => {
  const chartRef = useRef(null);
  const buttonRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await fetch(`http://localhost:3001/api/user/favorites/${stockName}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
          });
          
          if (response.ok) {
            const data = await response.json();
            setIsSaved(data.isFavorite);
          } else {
            throw new Error('Failed to fetch favorite status');
          }
        } catch (error) {
          console.error('Failed to fetch favorite status:', error);
        }
      } else {
        console.log('User is not logged in.');
        setIsSaved(false);
      }
    };
    fetchFavoriteStatus();
  }, [stockName]);

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
            formatter: function(val) {
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

    const button = buttonRef.current;
    button.style.position = 'absolute';
    button.style.top = '0px'; // Adjust the top position as needed
    button.style.left = '210px'; // Adjust the left position as needed

    return () => {
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }
    };
  }, []);

  const toggleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token available');
      }
      const method = isSaved ? 'DELETE' : 'POST';
      const url = `http://localhost:3001/api/user/favorites${isSaved ? `/${stockName}` : ''}`;
      const body = isSaved ? null : JSON.stringify({ stockSymbol: stockName });
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        ...(body && { body }),
      });
      if (response.ok) {
        setIsSaved(!isSaved);
      } else {
        const errorData = await response.json();
        console.error('Failed to update favorite status:', errorData.error);
        alert(`Failed to update favorite status: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      alert(`Please log in to save stocks to favorites.`);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div id="chart" ref={chartRef}></div>
      <button 
        ref={buttonRef} 
        style={{ 
          backgroundColor: isSaved ? 'green' : 'blue', 
          color: isSaved ? '#fff' : '#fff', 
          border: 'none', 
          padding: '5px 10px', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }} 
        onClick={toggleFavorite} 
      >
        {isSaved ? "Stock saved!" : "Save stock to favorites"}
      </button>
    </div>
  );
};

export default ChartComponent;