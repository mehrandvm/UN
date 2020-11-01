import React, {useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";
import axiosInstance from "../../apis/AxiosConfig";
import {useSnackbar} from "notistack";

const CountySelector = (props) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const {enqueueSnackbar} = useSnackbar();
    const {
        selectedDivision,
        setSelectedDivision,
        divisionLevel,
        setDivisionLevel,
        selectedProvince,
        clearCounty,
        setSelectedCountyLayer,
        setLoading
    } = props;
    const loading = open && (selectedDivision === null || selectedDivision.length === 0);
    const vocabs = getTranslator(useContext(LanguageContext).language);

    const isDisabled = () => divisionLevel === "national" || divisionLevel === "none"
    const getCountyLayer = async (county) => {
        // await Axios.get('http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AShahrestan&outputFormat=application%2Fjson')
        //     .then(res => {
        //     console.log(res.data)
        // })
        setLoading(true)
        fetch('http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AShahrestan&outputFormat=application%2Fjson')
            .then(response => response.json())
            .then(data => {
                const matchCounty = data.features.filter((countyLayer) => {
                    // console.log(county)
                    // console.log(countyLayer)
                    return countyLayer.properties.OBJECTID === county.id + 2
                })
                setSelectedCountyLayer(matchCounty[0])
                setSelectedDivision(county)
                setDivisionLevel("county")
                setLoading(false)
            }).catch(e => {
            enqueueSnackbar('Error fetching data!', {variant: "error"})
        });
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            // const response = await axiosInstance.get(`/management/subdivisions/${selectedProvince.id}/child`).then((res) => {
            //     if (active) {
            //         setOptions(res.data.data)
            //     }
            // });
            fetch('http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AShahrestan&maxFeatures=50&outputFormat=application%2Fjson')
                .then(response => response.json())
                .then(data => {
                    if (active) {
                        setOptions(data.features)
                    }
                }).catch(e => {
                enqueueSnackbar('Error fetching data!', {variant: "error"})
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
            getOptionSelected={(option, value) => option === value}
            getOptionLabel={(option) => option.properties.F_SHAHREST}
            options={options}
            loading={loading}
            disabled={isDisabled()}
            value={selectedDivision}
            onChange={(event, newValue) => {
                if (newValue) {
                    getCountyLayer(newValue)
                }
                if (newValue === null) {
                    clearCounty()
                    setSelectedCountyLayer(null)
                    setDivisionLevel("province")
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={vocabs('selected-county')}
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

export default CountySelector
