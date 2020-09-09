import React, {useEffect} from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import {Grid, Typography} from "@material-ui/core";
import LineChart from "./LineChart";


const ChartSelector = (props) => {

    // const returnValidData = (dataset) => {
    //     const validData = {labels: Object.keys(dataset), dataset: Object.values(dataset),}
    //     return validData
    // }
    //
    // const returnValidMultiData = (dataset) => {
    //     const validData = {labels: dataset.labels, datasets: dataset.datasets, theme: dataset.theme}
    //     return validData
    // }
    useEffect(()=>{

    },[props.divisionLevel])

    const returnRandomDataBasedOnStage = (baseData, theme) => {
        let data = []
        let lastData
        if (props.divisionLevel === "national") {
            lastData = 100
        } else if (props.divisionLevel === "province") {
            lastData = baseData.properties[`SUM_Stage${props.stageNumber}`]
        } else if (props.divisionLevel === "county") {
            lastData = baseData.properties[`Sum_stage${props.stageNumber}`]
        } else if (props.divisionLevel === "village") {
            lastData = baseData.properties[`stage${props.stageNumber}`]
        }
        for (let i = 0; i < 12; i++) {
            data.push(lastData)
            const random = 100 - Math.floor(Math.random() * 25)
            lastData *= random / 100
        }
        if (theme === 0) {
            return {'Stage One': data.reverse()}
        } else if (theme === 1) {
            return {'Stage Two': data.reverse()}
        } else if (theme === 2) {
            return {'Stage Three': data.reverse()}
        } else if (theme === 3) {
            return {'Stage Four': data.reverse()}
        } else if (theme === 4) {
        return {'Past Year Progress by Month': data.reverse()}
        }
    }

    const returnRandomDataBasedOnStage2 = () => {
        const random = Math.floor(Math.random() * 100)
        const random2 = Math.floor(Math.random() * random)
        const random3 = Math.floor(Math.random() * random2)
        const random4 = 100 - (random + random2 + random3)
        return [random, random2, random3, random4]
    }

    const newReturnValidData = (chart, dataset) => {
        // const validData = {labels: Object.keys(dataset), dataset: Object.values(dataset),}
        const validData = {
            labels: [
                'Stage One',
                'Stage Two',
                'Stage Three',
                'Stage Four',
            ],
            dataset: returnRandomDataBasedOnStage2(),
        }
        return validData
    }

    const newReturnValidMultiData = (chart, dataset) => {
        // const validData = {labels: dataset.labels, datasets: dataset.datasets, theme: dataset.theme}
        const validData = {
            labels: [
                'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            ],
            datasets: returnRandomDataBasedOnStage(dataset, chart.theme),
            theme: chart.theme,
        }
        return validData
    }

    const renderChart = (chart, dataset) => {
        switch (chart.type) {
            case 'pie':
                return <PieChart data={newReturnValidData(chart, dataset)}/>
            case 'bar':
                return <BarChart data={newReturnValidMultiData(chart, dataset)}/>
            case 'line':
                return <LineChart data={newReturnValidMultiData(chart, dataset)}/>
            default:
                return null;
        }
    }

    const passProperDataToRenderChart = (chart) => {
        if (props.divisionLevel === "national") {
            return renderChart(chart, props.selectedNation)
        } else if (props.divisionLevel === "province") {
            return renderChart(chart, props.selectedProvince)
        } else if (props.divisionLevel === "county") {
            return renderChart(chart, props.selectedCounty)
        } else if (props.divisionLevel === "village") {
            return renderChart(chart, props.selectedVillage)
        } else {
            return renderChart(props.chart)
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
                {passProperDataToRenderChart(props.chart)}
            </Grid>
        </Grid>
    );
};

export default ChartSelector
