import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const NationalSelector = (props) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState(["Iran"]);
    const [inputValue, setInputValue] = React.useState('');
    const {selectedDivision, setSelectedDivision, divisionLevel, setDivisionLevel, clearNational} = props;
    const loading = open && (selectedDivision === null || selectedDivision.length === 0);

    const isDisabled = () => false

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
                setOptions(["Iran"])
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
            style={{width: '100%'}}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option === value}
            getOptionLabel={(option) => option}
            options={options}
            loading={loading}
            disabled={isDisabled()}
            value={selectedDivision}
            onChange={(event, newValue) => {
                setSelectedDivision(newValue)
                if (newValue===null){clearNational()}
                else{setDivisionLevel("national")}
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Selected Nation"
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

export default NationalSelector
