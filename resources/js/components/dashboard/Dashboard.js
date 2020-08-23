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

const Dashboard = () => {
    const classes = useStyles();
    const [language, setLanguage] = useState("en")
    return (
            <div>
                <Header setLanguage={setLanguage} />
                <Grid container className={classes.container} alignItems="center">
                   <a href="/dashboard/user">Define User</a>
                </Grid>
            </div>
    );
}

export default Dashboard
