import React, {useContext} from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import {makeStyles} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'rgb(255,255,255,0.6)',
        borderRadius: 10,
        width: '100%',
        [theme.breakpoints.up('lg')]:{
            maxWidth: 200,
        },
        [theme.breakpoints.up('xl')]:{
            maxWidth: '100%',
        }
    },
}));

const HazardSelector = (props) => {
    const handleChange = (event) => {
        props.setHazards(event.target.value);
        // props.setHazards({...props.hazards, [event.target.name]: event.target.checked});
    };
    const classes = useStyles()
    const vocabs = getTranslator(useContext(LanguageContext).language);
    return (
        <FormControl component="fieldset" variant="outlined" className={classes.container}>
            <InputLabel>{vocabs('hazard-placeholder')}</InputLabel>
            <Select
                multiple
                value={props.hazards}
                onChange={handleChange}
            >
                <MenuItem value={'seismic'}>{vocabs('seismic-hazard-zone')}</MenuItem>
                <MenuItem value={'flood'}>{vocabs('flood-hazard-zone')}</MenuItem>
            </Select>
            {/*<FormGroup>*/}
            {/*    <FormControlLabel*/}
            {/*        control={<Checkbox checked={props.hazards.seismicHazard} onChange={handleChange} name={'seismicHazard'} />}*/}
            {/*        label={vocabs('seismic-hazard-zone')}*/}
            {/*    />*/}
            {/*    <FormControlLabel*/}
            {/*        control={<Checkbox checked={props.hazards.floodHazard} onChange={handleChange} name={'floodHazard'} />}*/}
            {/*        label={vocabs('flood-hazard-zone')}*/}
            {/*    />*/}
            {/*</FormGroup>*/}
        </FormControl>
    );
}

export default HazardSelector
