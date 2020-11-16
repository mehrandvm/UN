import React, {useState} from 'react';
import DivisionSelectors from "../map/DivisionSelectors";
import {Grid} from "@material-ui/core";
import MapContainer from "../map/MapContainer";

const MapWithControls = (props) => {
    const [mapHazards, setMapHazards] = useState([]);
    const [loading, setLoading] = useState(false);
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
        selectedProvinceLayer,
        setSelectedProvinceLayer,
        selectedCountyLayer,
        setSelectedCountyLayer,
        selectedVillageLayer,
        setSelectedVillageLayer,
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
                selectedProvinceLayer={selectedProvinceLayer}
                setSelectedProvinceLayer={setSelectedProvinceLayer}
                selectedCountyLayer={selectedCountyLayer}
                setSelectedCountyLayer={setSelectedCountyLayer}
                selectedVillageLayer={selectedVillageLayer}
                setSelectedVillageLayer={setSelectedVillageLayer}
                setLoading={setLoading}
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
                        selectedProvinceLayer={selectedProvinceLayer}
                        setSelectedProvinceLayer={setSelectedProvinceLayer}
                        selectedCountyLayer={selectedCountyLayer}
                        setSelectedCountyLayer={setSelectedCountyLayer}
                        selectedVillageLayer={selectedVillageLayer}
                        setSelectedVillageLayer={setSelectedVillageLayer}
                        loading={loading}
                    />
                </Grid>
                : null}
        </>
    );
};

export default MapWithControls;
