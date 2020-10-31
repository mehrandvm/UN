import React, {useContext} from 'react';
import Axios from 'axios';
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
            const response = await axiosInstance.get(`/management/subdivisions/${selectedCounty.id}/child`).then((res)=>{
                if (active) {
                    console.log(res.data.data)
                    setOptions(res.data.data)
                }
            })
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
