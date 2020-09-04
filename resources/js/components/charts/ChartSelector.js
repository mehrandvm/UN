import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import {Grid, Typography} from "@material-ui/core";


const ChartSelector = (props) => {

    const returnValidData = (dataset) => {
        const validData = {labels: Object.keys(dataset), dataset: Object.values(dataset),}
        return validData
    }

    const returnValidMultiData = (dataset) => {
        const validData = {labels: dataset.labels, datasets: dataset.datasets, theme: dataset.theme}
        return validData
    }

    const renderChart = (chart) => {
        switch (chart.type) {
            case 'pie':
                return <PieChart data={returnValidData(chart.dataset)}/>
            case 'bar':
                return <BarChart data={returnValidMultiData(chart)}/>
            default:
                return null;
        }
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            style={{textAlign: 'center',}}
        >
            {props.chart.type === 'stats'
            || props.chart.type === 'area'
            || props.chart.type === 'temp' ? null : <Grid item xs={12}>
                <Typography variant='body1'>{props.chart.title}</Typography>
            </Grid>}
            <Grid item xs={12}>
                {renderChart(props.chart)}
            </Grid>
        </Grid>
    );
};

export default ChartSelector
