import React from "react";
import Pie from 'react-chartjs-2';

const returnPieChartBackgroundColor = (labels) => {
    const colors = ['rgb(255, 112, 67, 0.6)', 'rgb(255, 202, 40, 0.6)', 'rgb(139, 195, 74, 0.6)', 'rgb(66, 165, 245, 0.6)', 'rgb(111, 28, 125, 0.6)']
    const bgcolors = labels.map((item, i) => {
        return colors[i % 6]
    })
    return bgcolors
}

const returnPieChartBackgroundHoverColor = (labels) => {
    const colors = ['rgb(255, 112, 67)', 'rgb(255, 202, 40)', 'rgb(139, 195, 74)', 'rgb(66, 165, 245)', 'rgb(111, 28, 125)']
    const bgcolors = labels.map((item, i) => {
        return colors[i % 6]
    })
    return bgcolors
}


const returnData = (data) => {
    const chartData = {
        labels: data.labels,
        datasets: [{
            data: data.dataset,
            backgroundColor: returnPieChartBackgroundColor(data.labels),
            hoverBackgroundColor: returnPieChartBackgroundHoverColor(data.labels)
        }],
    }
    return chartData
};

const returnOptions = () => {
    const options = {
        legend: {
            display: true,
            position: 'right',
        },
        cutoutPercentage: 0,
    };
    return options;
}

const PieChart = (props) => {
    return (
        <div style={{padding: 20}}>
            <Pie data={returnData(props.data)} options={returnOptions()}/>
        </div>
    );
};

export default PieChart
