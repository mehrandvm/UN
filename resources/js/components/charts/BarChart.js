import React from "react";
import {Bar} from 'react-chartjs-2';

const returnLineChartColor = (i, theme) => {
    const chartColors = ['rgb(255, 112, 67)', 'rgb(255, 202, 40)', 'rgb(139, 195, 74)', 'rgb(66, 165, 245)']
    return chartColors[(i + theme) % 5]
}

const returnLineChartBackgroundColor = (i, theme) => {
    const chartColors = ['rgb(255, 112, 67, 0.4)', 'rgb(255, 202, 40, 0.4)', 'rgb(139, 195, 74, 0.4)', 'rgb(66,165,245, 0.4)']
    return chartColors[(i + theme) % 5]
}

const returnData = (data,) => {
    const chartData = {
        labels: data.labels,
        datasets: Object.values(data.datasets).map((dataset, i) => {
            return {
                label: Object.keys(data.datasets)[i],
                backgroundColor: returnLineChartBackgroundColor(i, data.theme),
                borderColor: returnLineChartColor(i, data.theme),
                borderWidth: 1,
                hoverBackgroundColor: returnLineChartColor(i, data.theme),
                hoverBorderColor: returnLineChartColor(i, data.theme),
                data: dataset,
            }
        }),
    };
    return chartData
};

const returnOptions = (isLog) => {
    const options = {
        legend: {
            display: true,
            position: 'bottom',
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: (value, index, values) => {
                        return Number(value.toString());//pass tick values as a string into Number function
                    },
                },
                type: isLog ? 'logarithmic' : 'linear',
            }]
        },
    };
    return options;
}

const BarChart = (props) => {
    return (
        <Bar data={returnData(props.data)} options={returnOptions(props.isLog)}/>
    );
};

export default BarChart
