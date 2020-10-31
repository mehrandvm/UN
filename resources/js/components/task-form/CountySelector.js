import React, {useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axiosInstance from "../../apis/AxiosConfig";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";

const CountySelector = (props) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const {selectedProvince, selectedCounty, setSelectedCounty, divisionLevel, setDivisionLevel, clearCounty} = props;
    const loading = open && (selectedCounty === null || selectedCounty.length === 0);


    const isDisabled = () => divisionLevel === "national" || divisionLevel === "none"
    const handleCountyChange = () => setDivisionLevel("county")

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await axiosInstance.get(`/management/subdivisions/${selectedProvince.id}/child`).then((res)=>{
                if (active) {
                    console.log(res.data.data)
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
    const vocabs = getTranslator(useContext(LanguageContext).language);

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
            value={selectedCounty}
            onChange={(event, newValue) => {
                setSelectedCounty(newValue)
                if (newValue===null){clearCounty()}
                else{setDivisionLevel("county")}
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
