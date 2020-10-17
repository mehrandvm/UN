import React, {useContext, useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import {makeStyles} from '@material-ui/core/styles';
import Header from "../header/Header";
import {Grid} from "@material-ui/core";
import {Link, useHistory, useParams} from "react-router-dom";
import {withPermission} from "../../utils/with-premission/withPermission";
import axiosInstance from "../../apis/AxiosConfig";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CircularProgress from "@material-ui/core/CircularProgress";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";
import {useSnackbar} from "notistack";
import ImageViewer from "./ImageViewer";
import BuildingMap from "./BuildingMap";
import StageUtilButtons from "./StageUtilButtons";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const data = []

const useStyles = makeStyles((theme) => ({
    container: {
        overflowX: "hidden",
        position: "relative",
    },
    chartContainer: {
        width: '100%',
        marginTop: 64,
    },
    tableContainer: {
        overflowX: 'hidden'
    },
    tableCell: {
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        textAlign: 'center',
    },
    tableTitle: {
        padding: 8,
    },
    loadingContainer: {
        zIndex: 2,
        position: 'absolute',
        margin: 'auto',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    },
    link: {
        textDecoration: 'none',
    },
    button: {
        margin: '0 8px',
        width: 150,
        fontSize: '0.7rem',
    },
}));
const CaseDetails = () => {

    const classes = useStyles();
    const language = useContext(LanguageContext).language
    const vocabs = getTranslator(language);
    const [rows, setRows] = useState(data);
    const [loading, setLoading] = useState(false);
    const fetchRows = () => {
        setLoading(true)
        axiosInstance.get('/management/tasks/building').then((res) => {
            const dat = res.data.data.map((dataRow, i) => {
                const newRow = {
                    id: dataRow.id,
                    referrence_code: dataRow.referrence_code,
                    subdivision: dataRow.subdivision,
                    incident: dataRow.incident,
                    stage_number: dataRow.stage_number,
                    is_wall_damaged: dataRow.is_wall_damaged ? vocabs('yes') : vocabs('no'),
                    damage_type: dataRow.damage_type,
                    issued: dataRow.issued,
                    objection: dataRow.objection,
                }
                return newRow
            })
            console.log(params)
            if (params.filter === 'issues') {
                const dataWithIssues = dat.filter((row) => {
                    return row.issued !== null
                })
                setRows(dataWithIssues)
            } else if (params.filter === 'objections') {
                const dataWithObjection = dat.filter((row) => {
                    return row.objection !== null
                })
                setRows(dataWithObjection)
            } else {
                const dataWithReferrenceCode = dat.filter((row) => {
                    return row.referrence_code === params.case
                })
                setRows(dataWithReferrenceCode)
            }
            setLoading(false)
        }).catch((e) => {
            console.error(e)
        })
    }

    const history = useHistory()
    const params = useParams()

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
            <Header name={'my-tasks'} role={'agent'}/>
            {!loading && rows[0] ?
                <Grid container className={classes.chartContainer} alignItems="center">
                    <Grid item xs={12} className={classes.tableTitle}>
                        <Typography variant={'h5'}><Link
                            to={'/mytasks'}><IconButton>{language === 'en' ? <ArrowBackIcon/> :
                            <ArrowForwardIcon/>}</IconButton></Link> {`${vocabs('case-details')}: ${params.case}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.tableTitle}>
                        <Typography variant={'body2'}>
                            {vocabs('subdivision') + ': ' + rows[0].subdivision}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.tableTitle}>
                        <Typography variant={'body2'}>
                            {vocabs('incident') + ': ' + rows[0].incident}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.tableTitle}>
                        <Typography variant={'body2'}>
                            {vocabs('damage_type') + ': ' + rows[0].damage_type}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.tableTitle}>
                        <Typography variant={'body2'}>
                            {vocabs('is_wall_damaged') + ': ' + rows[0].is_wall_damaged}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.tableTitle}>
                        <ImageViewer/>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.tableTitle}>
                        <BuildingMap vocabs={vocabs} subdivision={rows[0] ? rows[0].subdivision : ''}/>
                    </Grid>
                    <Grid item xs={12} className={classes.tableTitle}>
                        <TableContainer component={Paper} className={classes.tableContainer}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{vocabs('referrence_code')}</TableCell>
                                        <TableCell align="right">{vocabs('stage_number')}</TableCell>
                                        <TableCell/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.stage_number}>
                                            <TableCell>{row.referrence_code}</TableCell>
                                            <TableCell align="right">{row.stage_number}</TableCell>
                                            <StageUtilButtons row={row}/>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid> : <CircularProgress size={50} className={classes.loading}/>}
        </div>
    );
};


export default withPermission(CaseDetails)
