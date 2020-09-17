import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link, useHistory, useParams} from "react-router-dom";
import {withPermission} from "../../utils/with-premission/withPermission";
import axiosInstance from "../../apis/AxiosConfig";
import Header from "../header/Header";
import {Grid} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";
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

const Objections = (props) => {
    const [objection, setObjection] = useState('')
    const [loading, setLoading] = useState(false)
    const classes = useStyles()
    const vocabs = getTranslator(useContext(LanguageContext).language);
    const params = useParams()
    const fetchObjection = () => {
        setLoading(true)
        axiosInstance.get(`/management/tasks/objection/${params.id}`).then((res) => {
            const data = res.data.data.expression
            if (data) {
                setObjection(data)
            }
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
        fetchObjection()
    }, [])

    return (
        <div className={classes.container}>
            <Header/>
            <Grid container className={classes.chartContainer} alignItems="center" spacing={2}>
                <Grid item className={classes.tableTitle}>
                    <Link to={'/'}><IconButton><ArrowBackIcon/></IconButton></Link>
                </Grid>
                <Grid item className={classes.tableTitle}>
                    <Typography variant={'h5'}>{vocabs('objection-review')}</Typography>
                </Grid>
                <Grid xs={12} item className={classes.tableTitle}>
                    <Typography variant={'body1'}>{vocabs('objection-text')}</Typography>
                </Grid>
                <Grid xs={12} item className={classes.tableTitle}>
                    {loading ? <CircularProgress size={20}/> :
                        <Typography variant={'body1'}>{objection}</Typography>
                    }
                </Grid>
            </Grid>
        </div>
    );
};


export default withPermission(Objections)
