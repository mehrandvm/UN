import React, {useState, useEffect} from "react";
import {Grid, LinearProgress, Typography, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ChartSelector from "../charts/ChartSelector";
import Header from "../header/Header";
import data from "./mock";
import MapFragment from "../map/MapFragment";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        margin: "auto",
        paddingTop: 64,
    },
    mapContainer: {
        textAlign: "center",
    },
    chartContainer: {
        overflow: "hidden",
        margin: 0
    },
    tempBox: {
        maxHeight: 100,
    },
    progressTitle: {
        fontSize: 12,
    },
    mapTitle: {
        textAlign: 'center'
    },
}));

const Dashboard = () => {
    const [mapParams, setMapParams] = useState();
    const [mapTitle, setMapTitle] = useState('');
    const [mapRightStats, setMapRightStats] = useState([]);
    useEffect(() => {
        const mapData = data;
        setMapParams(mapData.mapParams);
        setMapTitle(mapData.title);
        setMapRightStats(Object.values(mapData.rightCharts));
    }, [])
    console.log(data);
    const classes = useStyles();
    return (
        <>
            <Header/>
            <div className={classes.container}>
                <Box p={1} className={classes.mapTitle}>
                    <Typography variant='h5'>
                        {`IPPO - RPW Contain & Eradicion Program (${mapTitle} View)`}
                    </Typography>
                </Box>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid
                        container
                        item
                        sm={12}
                        md={8}
                        className={classes.mapContainer}
                    >
                        <Grid item xs={12}>
                            {mapParams ?
                                <MapFragment height={0.7} params={mapParams}/>
                                : null}
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        sm={12}
                        md={4}
                        spacing={2}
                        justify="center"
                        alignItems="center"
                        className={classes.chartContainer}
                    >
                        {mapRightStats.map((chart, i) => {
                                return (
                                    <Grid item xs={12} sm={6} md={12} key={i}>
                                        <ChartSelector chart={chart}/>
                                    </Grid>
                                )
                            }
                        )}
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Dashboard
