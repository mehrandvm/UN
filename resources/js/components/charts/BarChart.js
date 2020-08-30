import React from "react";
import { Bar } from 'react-chartjs-2';

const returnLineChartColor = (i) => {
  const chartColors = ['rgb(136, 132, 216)', 'rgb(255, 99, 132)', 'rgb(255, 206, 86)', 'rgb(130, 202, 157)', 'rgb(164, 222, 108)']
  return chartColors[i % 5]
}

const returnLineChartBackgroundColor = (i) => {
  const chartColors = ['rgb(136, 132, 216, 0.4)', 'rgb(255, 99, 132, 0.4)', 'rgb(255, 206, 86, 0.4)', 'rgb(130, 202, 157, 0.4)', 'rgb(164, 222, 108, 0.4)']
  return chartColors[i % 5]
}

const returnData = (data) => {
  const chartData = {
    labels: data.labels,
    datasets: Object.values(data.datasets).map((dataset, i) => {
      return {
        label: Object.keys(data.datasets)[i],
        backgroundColor: returnLineChartBackgroundColor(i),
        borderColor: returnLineChartColor(i),
        borderWidth: 1,
        hoverBackgroundColor: returnLineChartColor(i),
        hoverBorderColor: returnLineChartColor(i),
        data: dataset,
      }
    }),
  };
  return chartData
};

const returnOptions = () => {
  const options = {
    legend: {
      display: true,
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
  };
  return options;
}

const BarChart = (props) => {
  return (
    <Bar data={returnData(props.data)} options={returnOptions()} />
  );
};

export default BarChart