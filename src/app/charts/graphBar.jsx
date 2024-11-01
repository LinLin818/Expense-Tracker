import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

const BarChart = ({ budgetItems = [] }) => { // Default to an empty array
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    // Prepare data for the chart only if budgetItems is available
    const labels = budgetItems.map(item => `Budget ${item.id}`); // Adjust as needed
    const data = budgetItems.map(item => item.totalBudget || 0);

    // Create the chart
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Budget Amounts',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup chart instance on unmount
    return () => {
      myChart.destroy();
    };
  }, [budgetItems]);

  return (
    <div>
      <h2>Budget Bar Chart</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default BarChart;
