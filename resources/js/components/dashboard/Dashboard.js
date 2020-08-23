import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Typography, Grid, Button, ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Header from '../header/Header';
import theme from '../theme/theme';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        marginTop: 64,
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    const [language, setLanguage] = useState("en")
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Header setLanguage={setLanguage} />
                <Grid container className={classes.container} alignItems="center">
                   <a href="/dashboard/user">Define User</a>
                </Grid>
            </div>
        </ThemeProvider>
    );
}

if (document.getElementById("dashboard")) {
    var csrf_token = document.getElementById("dashboard").getAttribute("csrf_token");
    var message = document.getElementById("dashboard").getAttribute("dashboard");
    ReactDOM.render(<Dashboard csrf_token={csrf_token} message={message} />, document.getElementById("dashboard"));
}
