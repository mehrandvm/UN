import React, {useState} from 'react';
import DivisionSelectors from "../map/DivisionSelectors";
import {Grid} from "@material-ui/core";
import MapContainer from "../map/MapContainer";

const MapWithControls = (props) => {
    const [mapHazards, setMapHazards] = useState('');
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
        mapParams,
    } = props
    return (
        <>
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
                mapHazards={mapHazards}
                setMapHazards={setMapHazards}
            />
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
                        mapHazards={mapHazards}
                    />
                </Grid>
                : null}
        </>
    );
};

export default MapWithControls;
