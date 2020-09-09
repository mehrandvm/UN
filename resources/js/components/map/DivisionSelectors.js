import React, {useState} from 'react';
import { Grid } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import NationalSelector from "./NationalSelector";
import ProvinceSelector from "./ProvinceSelector";
import CountySelector from "./CountySelector";
import VillageSelector from "./VillageSelector";

const DivisionSelectors = (props) => {
    const {
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
    } = props
    const [language, setLanguage] = useState("en")

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
    }

    const clearCounty = () => {
        setDivisionLevel("province")
        setSelectedVillage(null)
    }

    const clearVillage = () => {
        setDivisionLevel("county")
    }

    return (
        <>
            <Grid item xs={3}>
                <NationalSelector
                    selectedDivision={selectedNation}
                    setSelectedDivision={setSelectedNation}
                    divisionLevel={divisionLevel}
                    setDivisionLevel={setDivisionLevel}
                    clearNational={clearNational}
                />
            </Grid>
            <Grid item xs={3}>
                <ProvinceSelector
                    selectedDivision={selectedProvince}
                    setSelectedDivision={setSelectedProvince}
                    divisionLevel={divisionLevel}
                    setDivisionLevel={setDivisionLevel}
                    clearProvince={clearProvince}
                />
            </Grid>
            <Grid item xs={3}>
                <CountySelector
                    selectedDivision={selectedCounty}
                    setSelectedDivision={setSelectedCounty}
                    divisionLevel={divisionLevel}
                    setDivisionLevel={setDivisionLevel}
                    clearCounty={clearCounty}
                />
            </Grid>
            <Grid item xs={3}>
                <VillageSelector
                    selectedDivision={selectedVillage}
                    setSelectedDivision={setSelectedVillage}
                    divisionLevel={divisionLevel}
                    setDivisionLevel={setDivisionLevel}
                    clearVillage={clearVillage}
                    selectedCounty={selectedCounty}
                />
            </Grid>
        </>
    );
}

export default DivisionSelectors
