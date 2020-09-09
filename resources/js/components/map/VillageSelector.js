import React from 'react';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import villageFeatureCollection from '../../../static/village.json'
import axiosInstance from "../../apis/AxiosConfig";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const VillageSelector = (props) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const {selectedDivision, setSelectedDivision, divisionLevel, setDivisionLevel, clearVillage, selectedCounty} = props;
    const loading = open && (selectedDivision === null || selectedDivision.length === 0);


    const isDisabled = () => divisionLevel === "national" || divisionLevel === "province" || divisionLevel === "none"
    const handleVillageChange = () => setDivisionLevel("village")

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await axiosInstance.get('http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AK_Villages&outputFormat=application%2Fjson'
            ).then((res)=>{
                setOptions(res.data.features.filter((feature)=>feature.properties.F_SHAHREST === selectedCounty.properties.F_SHAHREST))
            });


            if (active) {
                // setOptions(villageFeatureCollection.features)
                // setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            style={{ width: '100%' }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option = value}
            getOptionLabel={(option) => option.properties.V_ABADI}
            options={options}
            loading={loading}
            disabled={isDisabled()}
            value={selectedDivision}
            onChange={(event, newValue) => {
                setSelectedDivision(newValue)
                if (newValue===null){clearVillage()}
                else{setDivisionLevel("village")}
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Selected Village"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default VillageSelector
