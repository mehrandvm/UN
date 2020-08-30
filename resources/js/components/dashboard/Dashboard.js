import React, {useState, useEffect} from "react";
import {Grid, LinearProgress, Typography, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ChartSelector from "../charts/ChartSelector";
import Header from "../header/Header";
import data from "./mock";
import MapFragment from "../map/MapFragment";
import HazardSelector from "../map/HazardSelector";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DivisionSelector from "../map/DivisionSelector";

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
    const [mapParams, setMapParams] = useState();
    const [mapTitle, setMapTitle] = useState('');
    const [mapRightStats, setMapRightStats] = useState([]);
    const [mapBottomStats, setMapBottomStats] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState([]);
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
                        <Grid item xs={4}>
                            <HazardSelector mapHazards={mapHazards} setMapHazards={setMapHazards} />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel>Division Level</InputLabel>
                                <Select
                                    value={mapDivisionLevel}
                                    onChange={handleMapDivisionLevel}
                                    label="Select Division Level"
                                >
                                    <MenuItem value={1}>National</MenuItem>
                                    <MenuItem value={2}>Province</MenuItem>
                                    <MenuItem value={3}>City</MenuItem>
                                    <MenuItem value={4}>Village</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <DivisionSelector
                                selectedDivision={selectedDivision}
                                setSelectedDivision={setSelectedDivision}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {mapParams ?
                                <MapFragment height={0.7} params={mapParams}/>
                                : null}
                        </Grid>
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

export default Dashboard
