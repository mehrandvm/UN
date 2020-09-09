import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'rgb(255,255,255,0.6)',
        borderRadius: 10,
        paddingLeft: 10,
        margin: '0px 0px 5px 5px',
    },
}));

const StageRadioGroup = (props) => {
    const {stageNumber, setStageNumber} = props

    const handleChange = (event) => {
        setStageNumber(event.target.value);
    };
    const classes = useStyles()
    return (
        <FormControl component="fieldset" className={classes.container}>
            <RadioGroup value={stageNumber} onChange={handleChange}>
                <FormControlLabel value={'1'} control={<Radio size={'small'}/>} label="Stage One"/>
                <FormControlLabel value={'2'} control={<Radio size={'small'}/>} label="Stage Two"/>
                <FormControlLabel value={'3'} control={<Radio size={'small'}/>} label="Stage Three"/>
                <FormControlLabel value={'4'} control={<Radio size={'small'}/>} label="Stage Four"/>
            </RadioGroup>
        </FormControl>
    );
}

export default StageRadioGroup
