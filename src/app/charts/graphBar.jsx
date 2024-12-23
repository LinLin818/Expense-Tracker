import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

const BarChart = ({ budgetItems = [] }) => { // Default to an empty array
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    if (budgetItems.length === 0) {
      // No data to display
      return;
    }

    // Prepare data for the chart
    const labels = budgetItems.map(item => `${item.name}`); // Adjust label as needed
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
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default BarChart;
