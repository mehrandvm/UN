import React, {useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axiosInstance from "../../apis/AxiosConfig";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const ProvinceSelector = (props) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const {selectedProvince, setSelectedProvince, divisionLevel, setDivisionLevel, clearProvince} = props;
    const loading = open && (selectedProvince === null || selectedProvince.length === 0);

    const isDisabled = () => divisionLevel === "none"
    const handleProvinceChange = () => setDivisionLevel("province")

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const Response = await axiosInstance.get('/management/subdivisions/0/child').then((res) => {
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
            style={{ width: '100%' }}
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
            // getOptionDisabled={(option) => option.properties.province !== "Kermanshah"}
            value={selectedProvince}
            onChange={(event, newValue) => {
                setSelectedProvince(newValue)
                if (newValue===null){clearProvince()}
                else{setDivisionLevel("province")}
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

export default ProvinceSelector
