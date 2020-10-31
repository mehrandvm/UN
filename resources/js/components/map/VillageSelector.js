import React, {useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axiosInstance from "../../apis/AxiosConfig";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";

const VillageSelector = (props) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const {
        selectedDivision,
        setSelectedDivision,
        divisionLevel,
        setDivisionLevel,
        clearVillage,
        selectedCounty,
        setSelectedVillageLayer,
        setLoading,
    } = props;
    const loading = open && (selectedDivision === null || selectedDivision.length === 0);
    const vocabs = getTranslator(useContext(LanguageContext).language);

    const isDisabled = () => divisionLevel === "national" || divisionLevel === "province" || divisionLevel === "none"
    const getVillageLayer = async (village) => {
        // await Axios.get('http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AShahrestan&outputFormat=application%2Fjson')
        //     .then(res => {
        //     console.log(res.data)
        // })
        setLoading(true)
        fetch('http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AK_Villages&outputFormat=application%2Fjson')
            .then(response => response.json())
            .then(data => {
                const matchVillage = data.features.filter((villageLayer) => {
                    // console.log(village)
                    // console.log(villageLayer)
                    return villageLayer.properties.OBJECTID + 335 === village.id
                })
                setSelectedVillageLayer(matchVillage[0])
                setSelectedDivision(village)
                setDivisionLevel("village")
                setLoading(false)
            });
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            // const response = await axiosInstance.get(`/management/subdivisions/${selectedCounty.id}/child`).then((res) => {
            //     if (active) {
            //         setOptions(res.data.data)
            //     }
            // });
            fetch('http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AK_Villages&outputFormat=application%2Fjson')
                .then(response => response.json())
                .then(data => {
                    if (active) {
                        setOptions(data.features.filter((feature)=>feature.properties.F_SHAHREST === selectedCounty.properties.F_SHAHREST))
                    }
                });
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
            style={{width: '100%'}}
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
                if (newValue) {
                    getVillageLayer(newValue)
                }
                if (newValue === null) {
                    clearVillage()
                    setSelectedVillageLayer(null)
                    setDivisionLevel("county")
                }
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
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
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
