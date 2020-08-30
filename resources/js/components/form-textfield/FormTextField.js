import React from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const colors = {
    error: red[300],
};

export const useStyles = makeStyles((theme) => createStyles({
    textField: {
        marginTop: theme.spacing(1),
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none',
        },
    },
    error: {
        color: colors.error,
    },
    formControl: {
        minWidth: '100%',
    },
}));

const FormTextField = (props) => {
  const classes = useStyles();
  const { errorMessage, ...restProps } = props;
  return (
    <FormControl className={classes.formControl}>
      <TextField
        {...restProps}
        className={classes.textField}
        error={props.error}
        variant="outlined"
      />
      <FormHelperText className={classes.error}>
        {props.errorMessage
          ? props.errorMessage : null}
      </FormHelperText>
    </FormControl>
  );
};

export default FormTextField;
