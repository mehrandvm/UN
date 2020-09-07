import React, {useState, useEffect} from "react";
import {Grid, LinearProgress, Typography, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ChartSelector from "../charts/ChartSelector";
import Header from "../header/Header";
import data from "./mock";
import MapFragment from "../map/MapFragment";
import {withPermission} from "../../utils/with-premission/withPermission";
import DivisionSelectors from "../map/DivisionSelectors";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        margin: "auto",
        paddingTop: 64,
    },
    mapContainer: {
        textAlign: "center",
        paddingTop: 20,
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
    formControl: {
        width: '100%',
    },
}));

const Dashboard = () => {
    const [divisionLevel, setDivisionLevel] = useState("none") // none, national, province, county, village
    const [mapParams, setMapParams] = useState();
    const [mapTitle, setMapTitle] = useState('');
    const [mapRightStats, setMapRightStats] = useState([]);
    const [mapBottomStats, setMapBottomStats] = useState([]);
    const [mapDivisionLevel, setMapDivisionLevel] = useState(1);
    const [mapHazards, setMapHazards] = useState({
        hazardOne: false,
        hazardTwo: false,
        hazardThree: false,
    });
    useEffect(() => {
        const mapData = data;
        setMapParams(mapData.mapParams);
        setMapTitle(mapData.title);
        setMapRightStats(Object.values(mapData.rightCharts));
        setMapBottomStats(Object.values(mapData.bottomCharts));
    }, [])
    // console.log(data);
    const handleMapDivisionLevel = (e) => {
        setMapDivisionLevel(e.target.value);
    }
    const classes = useStyles();
    return (
        <>
            <Header/>
            <div className={classes.container}>
                {/*<Box p={1} className={classes.mapTitle}>*/}
                {/*    <Typography variant='h5'>*/}
                {/*        {`IPPO - RPW Contain & Eradicion Program (${mapTitle} View)`}*/}
                {/*    </Typography>*/}
                {/*</Box>*/}
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
                        spacing={2}
                    >
                        <DivisionSelectors divisionLevel={divisionLevel} setDivisionLevel={setDivisionLevel}/>
                        {/*<Grid item xs={3}>*/}
                        {/*    <HazardSelector mapHazards={mapHazards} setMapHazards={setMapHazards} />*/}
                        {/*</Grid>*/}
                        {mapParams ?
                            <Grid item xs={12}>
                                <MapFragment params={mapParams} divisionLevel={divisionLevel}/>
                            </Grid>
                            : null}
                        {mapBottomStats.map((chart, i) => {
                                return (
                                    <Grid item xs={12} key={i}>
                                        <ChartSelector chart={chart}/>
                                    </Grid>
                                )
                            }
                        )}
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

export default withPermission(Dashboard)
