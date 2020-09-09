import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import {makeStyles} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'rgb(255,255,255,0.6)',
        borderRadius: 10,
        paddingLeft: 10,
        margin: '0px 5px 5px 0px',
    },
}));

const HazardSelector = (props) => {
    const handleChange = (event) => {
        props.setHazards({...props.hazards, [event.target.name]: event.target.checked});
    };
    const classes = useStyles()
    return (
        <FormControl component="fieldset" className={classes.container}>
            {/*<FormLabel component="legend">Assign responsibility</FormLabel>*/}
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={props.hazards.seismicHazard} onChange={handleChange} name={'seismicHazard'} />}
                    label="Seismic Hazard Zone"
                />
                <FormControlLabel
                    control={<Checkbox checked={props.hazards.floodHazard} onChange={handleChange} name={'floodHazard'} />}
                    label="Flood Hazard Zone"
                />
            </FormGroup>
        </FormControl>
    );
}

export default HazardSelector
