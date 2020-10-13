import React, {useContext, useState} from 'react';
import {
    EditingState,
    IntegratedPaging,
    IntegratedSorting,
    IntegratedSummary,
    PagingState,
    SortingState,
    SummaryState,
} from '@devexpress/dx-react-grid';
import {
    DragDropProvider,
    Grid as DevGrid,
    PagingPanel,
    Table,
    TableColumnReordering,
    TableEditColumn,
    TableEditRow,
    TableFixedColumns,
    TableHeaderRow,
    TableSummaryRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {makeStyles} from '@material-ui/core/styles';
import Header from "../header/Header";
import {Grid} from "@material-ui/core";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";
import {withPermission} from "../../utils/with-premission/withPermission";

const useStyles = makeStyles((theme) => ({
    container: {
        overflowX: "hidden"
    },
    chartContainer: {
        width: '100%',
        overflowX: "scroll",
        marginTop: 64,
    },
    button: {
        marginTop: 25,
        marginRight: 25,
        width: '200px',
        height: '50px',
        textDecoration: 'none',
        textShadow: 'none',
    },
}));

const data = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5']

const Cases = () => {
    const classes = useStyles();
    const vocabs = getTranslator(useContext(LanguageContext).language);
    return (
        <div className={classes.container}>
            <Header name={'cases'} role={'admin'}/>
            <Grid container className={classes.chartContainer} alignItems="center">
                {data.map((item, i) =>
                    <>
                        <Grid item xs={6} sm={2}>
                            <Paper className={classes.paper}>{item}</Paper>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                {vocabs('visit')}
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                {vocabs('view issue letter')}
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                {vocabs('request objection')}
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                {vocabs('objection result')}
                            </Button>
                        </Grid>
                    </>
                )}
            </Grid>
        </div>
    );
};

export default withPermission(Cases)
