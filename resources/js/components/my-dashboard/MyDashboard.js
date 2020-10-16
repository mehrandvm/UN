import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link, useHistory} from "react-router-dom";
import {withPermission} from "../../utils/with-premission/withPermission";
import axiosInstance from "../../apis/AxiosConfig";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Header from "../header/Header";
import {Grid} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
    container: {
        overflowX: "hidden",
        position: "relative",
    },
    chartContainer: {
        margin: "auto",
        width: '90%',
        overflowX: "scroll",
        marginTop: 64,
    },
    tableCell: {
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        textAlign: 'center',
    },
    tableTitle: {
        padding: 8,
    },
    button: {
        width: '100%',
    },
    link: {
        textDecoration: 'none',
    }
});

const MyDashboard = (props) => {
    const [rows, setRows] = useState(null)
    const [units, setUnits] = useState([])
    const [loading, setLoading] = useState(false)
    const classes = useStyles()
    const vocabs = getTranslator(useContext(LanguageContext).language);

    const fetchRows = () => {
        setLoading(true)
        axiosInstance.get('/management/tasks/summarize').then((res) => {
            const data = res.data.data
            const units = res.data.data.subdivisions
            const newData = Object.values(data.summarize).map((value, i) => {
                return {...value, stage: Object.keys(data.summarize)[i]}
            })
            setRows(newData)
            setUnits(units)
            setLoading(false)
        }).catch((e) => {
            console.error(e)
            setLoading(false)
        })
    }

    const history = useHistory()

    const checkPermission = async () => {
        await axiosInstance.get('/management/permission/manage-tasks').then((res) => {
            if (res.data.status_code === 200) history.push('/')
        }).catch((e) => {
            console.error(e)
        })
    }

    useEffect(() => {
        checkPermission()
        fetchRows()
    }, [])

    return (
        <div className={classes.container}>
            <Header name={'my-dashboard'} role={'agent'}/>
            <Grid container className={classes.chartContainer} alignItems="center" spacing={2}>
                <Grid item className={classes.tableTitle}>
                    <Link to={'/'}><IconButton><ArrowBackIcon/></IconButton></Link>
                </Grid>
                <Grid item className={classes.tableTitle}>
                    <Typography variant={'h5'}>{vocabs('my-dashboard')}</Typography>
                </Grid>
                <Grid xs={12} item className={classes.tableTitle}>
                    <Typography variant={'body1'}>{vocabs('assigned-units')}</Typography>
                </Grid>
                <Grid xs={12} item>
                    <List>
                        {units ? units.map((unit, i) => {
                            return <ListItem key={i}>
                                <ListItemIcon>
                                    <LocationOnIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={unit}
                                />
                            </ListItem>
                        }) : null}
                    </List>
                </Grid>
                <Grid xs={12} item className={classes.tableTitle}>
                    {loading ? <CircularProgress size={20} /> :
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{vocabs('stage')}</TableCell>
                                    <TableCell align="right">{vocabs('damage-assessments')}</TableCell>
                                    <TableCell align="right">{vocabs('issue-letter')}</TableCell>
                                    <TableCell align="right">{vocabs('appeals-objections')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows ? rows.map((row) => (
                                    <TableRow key={row.stage}>
                                        <TableCell component="th" scope="row">{row.stage}</TableCell>
                                        <TableCell align="right">{row.total_visits}</TableCell>
                                        <TableCell align="right">{row.issued}</TableCell>
                                        <TableCell align="right">{row.objections}</TableCell>
                                    </TableRow>
                                )) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                </Grid>
                <Grid item xs={4}><Link to={'/mytasks'} className={classes.link}>
                    <Button className={classes.button} color={'primary'}
                            variant={'contained'}>{vocabs('list-of-assessed-units')}</Button></Link></Grid>
                <Grid item xs={4}><Link to={'/mytasks/issues'} className={classes.link}>
                    <Button className={classes.button} color={'primary'}
                            variant={'contained'}>{vocabs('list-of-issue-to-bank')}</Button></Link></Grid>
                <Grid item xs={4}><Link to={'/mytasks/objections'} className={classes.link}>
                    <Button className={classes.button} color={'primary'}
                            variant={'contained'}>{vocabs('list-of-appeals-objections')}</Button></Link></Grid>
            </Grid>
        </div>
    );
};


export default withPermission(MyDashboard)
