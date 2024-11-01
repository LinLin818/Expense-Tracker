import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

// Function to generate a random hex color
const RandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PieChart = ({ budgetItems = [] }) => { // Default to an empty array
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    // Prepare data for the chart
    const labels = budgetItems.map(item => `${item.icon} ${item.name}`); // Using emoji and name
    const data = budgetItems.map(item => item.totalBudget || 0); // Use totalBudget for each budget item
    const backgroundColors = budgetItems.map(() => RandomColor()); // Generate random colors

    // Create the chart
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Budget Amounts',
            data: data,
            backgroundColor: backgroundColors,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += `: $${context.raw}`;
                }
                return label;
              },
            },
          },
        },
        cutout: 0, // Full pie chart
      },
    });

    // Cleanup chart instance on unmount
    return () => {
      myChart.destroy();
    };
  }, [budgetItems]);

  return (
    <div>
      <h2>Budget Pie Chart</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default PieChart;
