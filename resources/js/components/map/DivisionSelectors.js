import React, {useState} from 'react';
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import NationalSelector from "./NationalSelector";
import ProvinceSelector from "./ProvinceSelector";
import CountySelector from "./CountySelector";
import VillageSelector from "./VillageSelector";
import HazardSelector from "./HazardSelector";

const DivisionSelectors = (props) => {
    const {
        dashboardAccessLevel,
        divisionLevel,
        setDivisionLevel,
        selectedNation,
        selectedProvince,
        selectedCounty,
        selectedVillage,
        setSelectedNation,
        setSelectedProvince,
        setSelectedCounty,
        setSelectedVillage,
        mapHazards,
        setMapHazards,
        setSelectedProvinceLayer,
        setSelectedCountyLayer,
        setSelectedVillageLayer,
        setLoading,
    } = props

    const clearNational = () => {
        setDivisionLevel("national")
        setSelectedProvince(null)
        setSelectedCounty(null)
        setSelectedVillage(null)
    }

    const clearProvince = () => {
        setDivisionLevel("national")
        setSelectedCounty(null)
        setSelectedVillage(null)
        setSelectedProvince(null)
        setSelectedProvinceLayer(null)
    }

    const clearCounty = () => {
        setDivisionLevel("province")
        setSelectedVillage(null)
        setSelectedCounty(null)
        setSelectedCountyLayer(null)
    }

    const clearVillage = () => {
        setDivisionLevel("county")
        setSelectedVillage(null)
        setSelectedVillageLayer(null)
    }

    return (
        <>
            <Grid item xs={4} lg={2}>
                <NationalSelector
                    dashboardAccessLevel={dashboardAccessLevel}
                    selectedDivision={selectedNation}
                    setSelectedDivision={setSelectedNation}
                    divisionLevel={divisionLevel}
                    setDivisionLevel={setDivisionLevel}
                    clearNational={clearNational}
                />
            </Grid>
            <Grid item xs={4} lg>
                <ProvinceSelector
                    dashboardAccessLevel={dashboardAccessLevel}
                    selectedDivision={selectedProvince}
                    setSelectedDivision={setSelectedProvince}
                    divisionLevel={divisionLevel}
                    setDivisionLevel={setDivisionLevel}
                    clearProvince={clearProvince}
                    setSelectedProvinceLayer={setSelectedProvinceLayer}
                    setLoading={setLoading}
                />
            </Grid>
            <Grid item xs={4} lg>
                <CountySelector
                    selectedDivision={selectedCounty}
                    setSelectedDivision={setSelectedCounty}
                    divisionLevel={divisionLevel}
                    setDivisionLevel={setDivisionLevel}
                    selectedProvince={selectedProvince}
                    clearCounty={clearCounty}
                    setSelectedCountyLayer={setSelectedCountyLayer}
                    setLoading={setLoading}
                />
            </Grid>
            <Grid item xs={6} lg>
                <VillageSelector
                    selectedDivision={selectedVillage}
                    setSelectedDivision={setSelectedVillage}
                    divisionLevel={divisionLevel}
                    setDivisionLevel={setDivisionLevel}
                    clearVillage={clearVillage}
                    selectedCounty={selectedCounty}
                    setSelectedVillageLayer={setSelectedVillageLayer}
                    setLoading={setLoading}
                />
            </Grid>
            <Grid item xs={6} lg>
                <HazardSelector hazards={mapHazards} setHazards={setMapHazards}/>
            </Grid>
        </>
    );
}

export default DivisionSelectors
