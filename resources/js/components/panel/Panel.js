import React, {useState} from 'react';
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import Header from '../header/Header';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles((theme) => ({
        container: {
            width: '100%',
            margin: "auto",
            marginTop: 64,
        },
        button: {
            height: 150,
            width: '100%',
            textDecoration: 'none',
        },
        link: {
            textDecoration: 'none',
        }
    })
);

const Panel = () => {
    const classes = useStyles();
    const [language, setLanguage] = useState("en")
    return (
        <Grid
            container
            item
            sm={12}
            className={classes.container}
            spacing={2}
        >
            <Header setLanguage={setLanguage}/>
            <Grid item xs={6} sm={3}>
                <Link to="/panel/user" className={classes.link}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        <PeopleIcon color="inherit"/>
                        <Typography>Define User</Typography>
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Link to="/panel/role" className={classes.link}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        <AssignmentIndIcon color="inherit"/>
                        <Typography>Define Role</Typography>
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Link to="/panel/task" className={classes.link}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        <AssignmentIcon color="inherit"/>
                        <Typography>Define Task</Typography>
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Link to="/panel/dashboard" className={classes.link}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        <DashboardIcon color="inherit"/>
                        <Typography>Dashboard</Typography>
                    </Button>
                </Link>
            </Grid>

        </Grid>
    );
}

export default Panel
