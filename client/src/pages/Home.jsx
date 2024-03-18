import React from 'react';
import LineChart from '../components/LineGraph2';
import LineGraphApexCharts from '../components/LineGraphApexCharts';

function Home() {
  return (
    <div className="page">
      <h2>Home</h2>
      <p>Welcome to the Home page!</p>
      <div style={{ width: '100%' }} className="chart-container">
        <LineGraphApexCharts />
        <LineGraphApexCharts />
        <LineGraphApexCharts />
        <LineGraphApexCharts />

      </div>
    </div>
  );
}

export default Home;