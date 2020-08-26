import React, {useState} from 'react';
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import Header from '../header/Header';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        marginTop: 64,
    },
}));

const Panel = () => {
    const classes = useStyles();
    const [language, setLanguage] = useState("en")
    return (
            <div>
                <Header setLanguage={setLanguage} />
                <Grid container className={classes.container} alignItems="center">
                    <a href="/panel/user">Define User</a>
                </Grid>
                <Grid container className={classes.container} alignItems="center">
                    <a href="/panel/role">Define Role</a>
                </Grid>
                <Grid container className={classes.container} alignItems="center">
                    <a href="/panel/dashboard">Dashboard</a>
                </Grid>

            </div>
    );
}

export default Panel
