import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";

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
            const response = await Axios.get('https://country.register.gov.uk/records.json?page-size=5000');
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
        <Button style={{height: '100%', width: '100%'}} onClick={clearNational} variant={'outlined'}>National View</Button>
    );
}

export default NationalSelector
