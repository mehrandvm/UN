import React from 'react';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import nationalFeatureCollection from '../../../static/national.json'

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const ProvinceSelector = (props) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const {selectedDivision, setSelectedDivision, divisionLevel, setDivisionLevel, clearProvince} = props;
    const loading = open && (selectedDivision === null || selectedDivision.length === 0);

    const isDisabled = () => divisionLevel === "none"
    const handleProvinceChange = () => setDivisionLevel("province")

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            // const response = await Axios.get('https://country.register.gov.uk/records.json?page-size=5000');
            await sleep(1e3); // For demo purposes.
            // const countries = await response.json();

            if (active) {
                setOptions(nationalFeatureCollection.features)
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
            getOptionSelected={(option, value) => option === value}
            getOptionLabel={(option) => option.properties.province}
            options={options}
            loading={loading}
            disabled={isDisabled()}
            getOptionDisabled={(option) => option.properties.province !== "Kermanshah"}
            value={selectedDivision}
            onChange={(event, newValue) => {
                setSelectedDivision(newValue)
                if (newValue===null){clearProvince()}
                else{setDivisionLevel("province")}
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Selected Province"
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