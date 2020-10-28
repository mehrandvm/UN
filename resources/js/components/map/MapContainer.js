import React, {useState} from "react";
import MapFragment from "./MapFragment";

const MapContainer = (props) => {
    const {
        params,
        divisionLevel,
        selectedNation,
        selectedProvince,
        selectedCounty,
        selectedVillage,
        dashboardAccessLevel,
        mapHazards
    } = props
    const [stageNumber, setStageNumber] = useState('1')
    return (
        <>
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
            />
        </>
    );
};

export default MapContainer
