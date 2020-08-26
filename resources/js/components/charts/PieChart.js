import React from "react";
import Pie from 'react-chartjs-2';

const returnPieChartBackgroundColor = (labels) => {
	const colors = ['#015f92', '#348aba', '#69bbe0', '#94ecfd', '#8dd5f5', '#76c6ef']
	const bgcolors = labels.map((item, i) => {
		return colors[i % 6]
	})
	return bgcolors
}

const returnPieChartBackgroundHoverColor = (labels) => {
	const colors = ['#014265', '#2d779f', '#41a8d8', '#69e3fc', '#72ccf3', '#48b4ea']
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
		<Pie data={returnData(props.data)} options={returnOptions()} />
	);
};

export default PieChart