import React, {useState} from "react";
import MapFragment from "./MapFragment";
import CircularProgress from "@material-ui/core/CircularProgress";

const MapContainer = (props) => {
    const {
        params,
        divisionLevel,
        selectedNation,
        selectedProvince,
        selectedCounty,
        selectedVillage,
        dashboardAccessLevel,
        mapHazards,
        selectedProvinceLayer,
        setSelectedProvinceLayer,
        selectedCountyLayer,
        setSelectedCountyLayer,
        selectedVillageLayer,
        setSelectedVillageLayer,
        loading,
    } = props
    const [stageNumber, setStageNumber] = useState('1')
    return (
        <>
            {loading &&
            <div style={{
                backgroundColor: 'rgb(0,0,0,0.25)',
                height: '100vh',
                width: '100%',
                position: 'fixed',
                zIndex: 5,
                top: 0,
                left: 0,
            }}><CircularProgress style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                color: 'white',
            }}/></div>}
            <MapFragment
                params={params}
                dashboardAccessLevel={dashboardAccessLevel}
                divisionLevel={divisionLevel}
                selectedNation={selectedNation}
                selectedProvince={selectedProvince}
                selectedCounty={selectedCounty}
                selectedVillage={selectedVillage}
                stageNumber={stageNumber}
                setStageNumber={setStageNumber}
                mapHazards={mapHazards}
                selectedProvinceLayer={selectedProvinceLayer}
                setSelectedProvinceLayer={setSelectedProvinceLayer}
                selectedCountyLayer={selectedCountyLayer}
                setSelectedCountyLayer={setSelectedCountyLayer}
                selectedVillageLayer={selectedVillageLayer}
                setSelectedVillageLayer={setSelectedVillageLayer}
                loading={loading}
            />
        </>
    );
};

export default MapContainer
