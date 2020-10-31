import React, {useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";
import axiosInstance from "../../apis/AxiosConfig";

const ProvinceSelector = (props) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const {
        selectedDivision,
        setSelectedDivision,
        dashboardAccessLevel,
        setDivisionLevel,
        clearProvince,
        setSelectedProvinceLayer,
        setLoading
    } = props;
    const loading = open && (selectedDivision === null || selectedDivision.length === 0);
    const vocabs = getTranslator(useContext(LanguageContext).language);

    const isDisabled = () => !(dashboardAccessLevel === 'province' || dashboardAccessLevel === 'national')
    const getProvinceLayer = async (province) => {
        // await Axios.get('http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AShahrestan&outputFormat=application%2Fjson')
        //     .then(res => {
        //     console.log(res.data)
        // })
        setLoading(true)
        fetch('http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AOstan&maxFeatures=50&outputFormat=application%2Fjson')
            .then(response => response.json())
            .then(data => {
                const matchProvince = data.features.filter((provinceLayer) => {
                    return provinceLayer.properties.province_F === "کرمانشاه"
                })
                setSelectedProvinceLayer(matchProvince[0])
                setSelectedDivision(province)
                setDivisionLevel("province")
                setLoading(false)
            });
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const Response = await axiosInstance.get('/management/subdivisions/0/child').then((res) => {
                if (active) {
                    setOptions(res.data.data)
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
            getOptionSelected={(option, value) => option === value}
            getOptionLabel={(option) => option.subdivision_name}
            options={options}
            loading={loading}
            disabled={isDisabled()}
            // getOptionDisabled={(option) => option.subdivision_name !== "Kermanshah"}
            value={selectedDivision}
            onChange={(event, newValue) => {
                if (newValue) {
                    getProvinceLayer(newValue)
                }
                if (newValue === null) {
                    clearProvince()
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={vocabs('selected-province')}
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

export default ProvinceSelector
