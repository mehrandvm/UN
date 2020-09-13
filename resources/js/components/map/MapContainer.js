import React, {useState} from "react";
import MapFragment from "./MapFragment";

const MapContainer = (props) => {
    const {
        params,
        divisionLevel,
        selectedNation,
        selectedProvince,
        selectedCounty,
        selectedVillage
    } = props
    const [stageNumber, setStageNumber] = useState('1')
    const [mapHazards, setMapHazards] = useState({
        seismicHazard: false,
        floodHazard: false,
    });
    return (
        <>
            <MapFragment
                params={params}
                divisionLevel={divisionLevel}
                selectedNation={selectedNation}
                selectedProvince={selectedProvince}
                selectedCounty={selectedCounty}
                selectedVillage={selectedVillage}
                stageNumber={stageNumber}
                setStageNumber={setStageNumber}
                mapHazards={mapHazards}
                setMapHazards={setMapHazards}
            />
        </>
    );
};

export default MapContainer
