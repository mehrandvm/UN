import React, {useState, useEffect, useContext} from "react";
import {Grid, LinearProgress, Typography, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ChartSelector from "../charts/ChartSelector";
import Header from "../header/Header";
import data from "./mock";
import MapFragment from "../map/MapFragment";
import {withPermission} from "../../utils/with-premission/withPermission";
import DivisionSelectors from "../map/DivisionSelectors";
import {useHistory} from "react-router-dom";
import axiosInstance from "../../apis/AxiosConfig";
import MapContainer from "../map/MapContainer";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    const [divisionLevel, setDivisionLevel] = useState("national") // national, province, county, village
    const [dashboardAccessLevel, setDashboardAccessLevel] = useState("none") // national, province, county, village, none
    const [selectedNation, setSelectedNation] = useState("Iran");
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState(null);
    const [selectedVillage, setSelectedVillage] = useState(null);
    const [mapParams, setMapParams] = useState();
    const [mapTitle, setMapTitle] = useState('');
    const [mapRightStats, setMapRightStats] = useState([]);
    const [mapBottomStats, setMapBottomStats] = useState([]);
    const [mapDivisionLevel, setMapDivisionLevel] = useState(1);

    const history = useHistory()

    const checkPermission = async () => {
        let isRBACVerified = false
        await axiosInstance.get('/management/permission/view-dashboard').then((res) => {
            if (res.data.status_code !== 200) history.push('/mytasks')
        }).catch((e) => {
            console.error(e)
        })
        await axiosInstance.get('/management/permission/national-access').then((res) => {
            if (res.data.status_code === 200) {
                isRBACVerified = true
                setDashboardAccessLevel('national')
            }
        }).catch((e) => {
            console.error(e)
        })
        await axiosInstance.get('/management/permission/province-access').then((res) => {
            if (res.data.status_code === 200) {
                if (!isRBACVerified) {
                    setDashboardAccessLevel('province')
                }
            }
        }).catch((e) => {
            console.error(e)
        })
    }

    useEffect(() => {
        checkPermission()
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
    const vocabs = getTranslator(useContext(LanguageContext).language);
    return (
        dashboardAccessLevel === "none" ? <CircularProgress color="inherit" size={20}/> :
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
                            <DivisionSelectors
                                dashboardAccessLevel={dashboardAccessLevel}
                                divisionLevel={divisionLevel}
                                setDivisionLevel={setDivisionLevel}
                                selectedNation={selectedNation}
                                selectedProvince={selectedProvince}
                                selectedCounty={selectedCounty}
                                selectedVillage={selectedVillage}
                                setSelectedNation={setSelectedNation}
                                setSelectedProvince={setSelectedProvince}
                                setSelectedCounty={setSelectedCounty}
                                setSelectedVillage={setSelectedVillage}
                            />
                            {/*<Grid item xs={3}>*/}
                            {/*    <HazardSelector mapHazards={mapHazards} setMapHazards={setMapHazards} />*/}
                            {/*</Grid>*/}
                            {mapParams ?
                                <Grid item xs={12}>
                                    <MapContainer
                                        dashboardAccessLevel={dashboardAccessLevel}
                                        params={mapParams}
                                        divisionLevel={divisionLevel}
                                        selectedNation={selectedNation}
                                        selectedProvince={selectedProvince}
                                        selectedCounty={selectedCounty}
                                        selectedVillage={selectedVillage}
                                    />
                                </Grid>
                                : null}
                            {mapBottomStats.map((chart, i) => {
                                    return (
                                        <Grid item xs={12} key={i}>
                                            <Typography
                                                variant={'body1'}>{vocabs('past-year-progress-by-month')}</Typography>
                                            <ChartSelector
                                                chart={chart}
                                                divisionLevel={divisionLevel}
                                                selectedNation={selectedNation}
                                                selectedProvince={selectedProvince}
                                                selectedCounty={selectedCounty}
                                                selectedVillage={selectedVillage}
                                            />
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
                                            <ChartSelector
                                                nthChart={i}
                                                chart={chart}
                                                divisionLevel={divisionLevel}
                                                selectedNation={selectedNation}
                                                selectedProvince={selectedProvince}
                                                selectedCounty={selectedCounty}
                                                selectedVillage={selectedVillage}
                                            />
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
