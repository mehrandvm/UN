import React, {useContext, useEffect, useState} from 'react';
import {
    SortingState, EditingState, PagingState,
    IntegratedPaging, IntegratedSorting, IntegratedSummary,
} from '@devexpress/dx-react-grid';
import {
    Table, TableHeaderRow, TableEditRow, TableEditColumn,
    PagingPanel, DragDropProvider, TableColumnReordering,
    TableSummaryRow, Grid as DevGrid,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Header from "../header/Header";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";
import Grid from "@material-ui/core/Grid";
import axiosInstance from "../../apis/AxiosConfig";
import {withPermission} from "../../utils/with-premission/withPermission";
import TableCell from "@material-ui/core/TableCell";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    container: {
        overflowX: "hidden",
        position: "relative",
    },
    chartContainer: {
        width: '100%',
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
    loadingContainer: {
        zIndex: 2,
        position: 'absolute',
        margin: 'auto',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    loading: {
        textAlign: 'center',
    },
    lookupEditCell: {
        padding: theme.spacing(1),
    },
    dialog: {
        width: 'calc(100% - 16px)',
    },
    inputRoot: {
        width: '100%',
    },
    selectMenu: {
        position: 'absolute !important',
    },
}));

const AddButton = ({onExecute}) => (
    <div style={{textAlign: 'center'}}>
        <Button
            color="primary"
            onClick={onExecute}
            title="Create new row"
        >
            New
        </Button>
    </div>
);

const EditButton = ({onExecute}) => (
    <IconButton onClick={onExecute} title="Edit row">
        <EditIcon/>
    </IconButton>
);

const DeleteButton = ({onExecute}) => (
    <IconButton
        onClick={() => {
            // eslint-disable-next-line
            if (window.confirm('Are you sure you want to delete this row?')) {
                onExecute();
            }
        }}
        title="Delete row"
    >
        <DeleteIcon/>
    </IconButton>
);

const CommitButton = ({onExecute}) => (
    <IconButton onClick={onExecute} title="Save changes">
        <SaveIcon/>
    </IconButton>
);

const CancelButton = ({onExecute}) => (
    <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
        <CancelIcon/>
    </IconButton>
);

const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton,
};

const Command = ({id, onExecute}) => {
    const CommandButton = commandComponents[id];
    return (
        <CommandButton
            onExecute={onExecute}
        />
    );
};

const Cell = (props) => {
    return <Table.Cell {...props} />;
};

const LookupEditCell = ({value, onValueChange, styles}) => {
    const [incidents, setIncidents] = useState(null)
    const getIncidents = async () => {
        axiosInstance.get('/analysis/incident').then(res => {
            setIncidents(res.data.data)
        }).catch(err => console.error(err))
    }

    useEffect(() => {
        getIncidents()
    }, [])
    return (<TableCell
            className={styles.lookupEditCell}
        >
            <Select
                value={value}
                onChange={event => onValueChange(event.target.value)}
                MenuProps={{
                    className: styles.selectMenu,
                }}
                input={(
                    <Input
                        classes={{root: styles.inputRoot}}
                    />
                )}
            >
                {incidents ? incidents.map(item => {
                    return (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    )
                }) : <div className={styles.loading}><CircularProgress size={20} /></div>}
            </Select>
        </TableCell>
    );
}

const EditCell = (props) => {
    const {column} = props;
    const classes = useStyles()
    if (column.name === 'incident') {
        return <LookupEditCell {...props} styles={classes} />;
    }
    return <TableEditRow.Cell {...props} />;
};

const getRowId = row => row.id;

const SurveyForm = () => {
    const [columns] = useState([
        {name: 'name', title: 'Survey Name'},
        {name: 'incident', title: 'Incident'},
    ]);
    const [rows, setRows] = useState([])
    const [tableColumnExtensions] = useState([
        {columnName: 'name', width: 180},
        {columnName: 'incident', width: 180},
    ]);
    const [sorting, getSorting] = useState([]);
    const [editingRowIds, getEditingRowIds] = useState([]);
    const [addedRows, setAddedRows] = useState([]);
    const [rowChanges, setRowChanges] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [pageSizes] = useState([5, 10, 0]);
    const [columnOrder, setColumnOrder] = useState(['name', 'influence']);
    const classes = useStyles()

    const getRows = async () => {
        try {
            await axiosInstance.get(`management/incident/form`).then((res) => {
                setRows(res.data.data)
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getRows()
    }, [])

    const changeAddedRows = value => setAddedRows(
        value.map(row => (Object.keys(row).length ? row : {
            name: '',
            incident: '',
        })),
    );

    const deleteRows = (deletedIds) => {
        const rowsForDelete = rows.slice();
        deletedIds.forEach((rowId) => {
            const index = rowsForDelete.findIndex(row => row.id === rowId);
            if (index > -1) {
                rowsForDelete.splice(index, 1);
            }
        });
        return rowsForDelete;
    };

    const commitChanges = ({added, changed, deleted}) => {
        let changedRows;
        if (added) {
            axiosInstance.post('/management/incident/form', added[0])
            getRows()
            // const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            // changedRows = [
            //     ...rows,
            //     ...added.map((row, index) => ({
            //         id: startingAddedId + index,
            //         ...row,
            //     })),
            // ];
        }
        if (changed) {
            const surveyID = Object.keys(changed)
            axiosInstance.post(`/management/incident/form/${surveyID}/sync`)
            getRows()
            // changedRows = rows.map(row => (changed[row.id] ? {...row, ...changed[row.id]} : row));
        }
        if (deleted) {
            console.log(deleted)
            // changedRows = deleteRows(deleted);
        }
    };
    const vocabs = getTranslator(useContext(LanguageContext).language);
    return (
        <div className={classes.container}>
            <Header name={'survey-forms'} role={'admin'}/>
            <Grid container className={classes.chartContainer} alignItems="center">
                <Grid item className={classes.tableTitle}>
                    <Link to={'/dashboard'}><IconButton><ArrowBackIcon/></IconButton></Link>
                </Grid>
                <Grid item className={classes.tableTitle}>
                    <Typography variant={'h5'}>{vocabs('survey-table')}</Typography>
                </Grid>
                <Paper>
                    <DevGrid
                        rows={rows}
                        columns={columns}
                        getRowId={getRowId}
                    >
                        <SortingState
                            sorting={sorting}
                            onSortingChange={getSorting}
                        />
                        <PagingState
                            currentPage={currentPage}
                            onCurrentPageChange={setCurrentPage}
                            pageSize={pageSize}
                            onPageSizeChange={setPageSize}
                        />
                        <EditingState
                            editingRowIds={editingRowIds}
                            onEditingRowIdsChange={getEditingRowIds}
                            rowChanges={rowChanges}
                            onRowChangesChange={setRowChanges}
                            addedRows={addedRows}
                            onAddedRowsChange={changeAddedRows}
                            onCommitChanges={commitChanges}
                        />

                        <IntegratedSorting/>
                        <IntegratedPaging/>

                        <Table
                            columnExtensions={tableColumnExtensions}
                            cellComponent={Cell}
                        />
                        <TableColumnReordering
                            order={columnOrder}
                            onOrderChange={setColumnOrder}
                        />
                        <TableHeaderRow showSortingControls/>
                        <TableEditRow
                            cellComponent={EditCell}
                        />
                        <TableEditColumn
                            width={170}
                            showAddCommand={!addedRows.length}
                            showEditCommand
                            showDeleteCommand
                            commandComponent={Command}
                        />
                        <PagingPanel
                            pageSizes={pageSizes}
                        />
                    </DevGrid>
                </Paper>
            </Grid>
        </div>
    );
};
export default withPermission(SurveyForm)
