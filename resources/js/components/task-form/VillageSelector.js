import React, {useContext} from 'react';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import villageFeatureCollection from '../../../static/village.json'
import axiosInstance from "../../apis/AxiosConfig";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";


function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const VillageSelector = (props) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const {selectedCounty, selectedVillage, setSelectedVillage, divisionLevel, setDivisionLevel, clearVillage} = props;
    const loading = open && (selectedVillage === null || selectedVillage.length === 0);


    const isDisabled = () => divisionLevel === "national" || divisionLevel === "province" || divisionLevel === "none"
    const handleVillageChange = () => setDivisionLevel("village")

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            // const response = await axiosInstance.get('http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AK_Villages&outputFormat=application%2Fjson'
            // ).then((res)=>{
            //     setOptions(res.data.features.filter((feature)=>feature.properties.F_SHAHREST === selectedCounty.properties.F_SHAHREST))
            // });
            const response = await axiosInstance.get(`/management/subdivisions/child/${selectedCounty.id}`).then((res)=>{
                console.log(res.data)
                setOptions(res.data.data)
            }).catch((e)=>{
                console.error(e)
            });
            // await sleep(1e3); // For demo purposes.


            if (active) {

                // setOptions(villageFeatureCollection.features.filter(
                //     (feature)=>feature.properties.F_SHAHREST === selectedCounty.properties.F_SHAHREST))
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
    const vocabs = getTranslator(useContext(LanguageContext).language);

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
            getOptionLabel={(option) => option.subdivision_name}
            options={options}
            loading={loading}
            disabled={isDisabled()}
            value={selectedVillage}
            onChange={(event, newValue) => {
                setSelectedVillage(newValue)
                if (newValue===null){clearVillage()}
                else{setDivisionLevel("village")}
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={vocabs('selected-village')}
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
