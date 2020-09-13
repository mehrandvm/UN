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
        let divisionName = ""
        let lastData
        if (props.divisionLevel === "national") {
            if (props.nthChart === 1) lastData = 226342
            if (props.nthChart === 2) lastData = 167025
            if (props.nthChart === 3) lastData = 105580
            if (props.nthChart === 4) lastData = 58383
            divisionName = props.selectedNation
        } else if (props.divisionLevel === "province") {
            lastData = baseData.properties[`SUM_Stage${props.nthChart}`]
            divisionName = baseData.properties[`province`]
        } else if (props.divisionLevel === "county") {
            lastData = baseData.properties[`Sum_stage${props.nthChart}`]
            divisionName = baseData.properties[`F_SHAHREST`]
        } else if (props.divisionLevel === "village") {
            lastData = baseData.properties[`stage${props.nthChart}`]
            divisionName = baseData.properties[`V_ABADI`]
        }
        for (let i = 0; i < 12; i++) {
            data.push(lastData)
            const random = 100 - Math.floor(Math.random() * 25)
            lastData = Math.floor(lastData * (random / 100))
        }
        if (theme === 0) {
            return {[`Stage One (${divisionName})`]: data.reverse()}
        } else if (theme === 1) {
            return {[`Stage Two (${divisionName})`]: data.reverse()}
        } else if (theme === 2) {
            return {[`Stage Three (${divisionName})`]: data.reverse()}
        } else if (theme === 3) {
            return {[`Stage Four (${divisionName})`]: data.reverse()}
        } else if (theme === 4) {
        return {[`Past Year Progress by Month (${divisionName})`]: data.reverse()}
        }
    }

    const returnRandomDataBasedOnStage2 = (baseData, theme) => {
        let dat1 = 0
        let dat2 = 0
        let dat3 = 0
        let dat4 = 0
        let divisionName = ""
        if (props.divisionLevel === "national") {
            dat1 = 226342
            dat2 = 167025
            dat3 = 105580
            dat4 = 58383
            divisionName = props.selectedNation
        } else if (props.divisionLevel === "province") {
            dat1 = baseData.properties[`SUM_Stage1`]
            dat2 = baseData.properties[`SUM_Stage2`]
            dat3 = baseData.properties[`SUM_Stage3`]
            dat4 = baseData.properties[`SUM_Stage4`]
            divisionName = baseData.properties[`province`]
        } else if (props.divisionLevel === "county") {
            dat1 = baseData.properties[`Sum_stage1`]
            dat2 = baseData.properties[`Sum_stage2`]
            dat3 = baseData.properties[`Sum_stage3`]
            dat4 = baseData.properties[`Sum_stage4`]
            divisionName = baseData.properties[`F_SHAHREST`]
        } else if (props.divisionLevel === "village") {
            dat1 = baseData.properties[`stage1`]
            dat2 = baseData.properties[`stage2`]
            dat3 = baseData.properties[`stage3`]
            dat4 = baseData.properties[`stage4`]
            divisionName = baseData.properties[`V_ABADI`]
        }
        // const random = Math.floor(Math.random() * 100)
        // const random2 = Math.floor(Math.random() * random)
        // const random3 = Math.floor(Math.random() * random2)
        // const random4 = 100 - (random + random2 + random3)
        return [dat1, dat2, dat3, dat4]
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
            dataset: returnRandomDataBasedOnStage2(dataset, chart.theme),
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

    const newReturnValidLineData = (chart, dataset) => {
        let lineData = {}
        let data
        let lastData
        for (let i = 1; i <= 4; i++) {
            data = []
            if (props.divisionLevel === "national") {
                if (i === 1) lastData = 226342
                if (i === 2) lastData = 167025
                if (i === 3) lastData = 105580
                if (i === 4) lastData = 58383
            } else if (props.divisionLevel === "province") {
                lastData = dataset.properties[`SUM_Stage${i}`]
            } else if (props.divisionLevel === "county") {
                lastData = dataset.properties[`Sum_stage${i}`]
            } else if (props.divisionLevel === "village") {
                lastData = dataset.properties[`stage${i}`]
            }
            for (let i = 0; i < 12; i++) {
                data.push(lastData)
                const random = 100 - Math.floor(Math.random() * 25)
                lastData = Math.floor(lastData * (random / 100))
            }
            lineData[`Stage ${i}`] = data.reverse()
        }
        const validData = {
            labels: [
                'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            ],
            datasets: lineData,
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
                return <LineChart data={newReturnValidLineData(chart, dataset)}/>
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
