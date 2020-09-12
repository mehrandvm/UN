import React, {useEffect, useState} from 'react';
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
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles';
import Header from "../header/Header";
import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import {withPermission} from "../../utils/with-premission/withPermission";
import axiosInstance from "../../apis/AxiosConfig";
import Typography from "@material-ui/core/Typography";
import PostAddIcon from '@material-ui/icons/PostAdd';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CircularProgress from "@material-ui/core/CircularProgress";

const values = {
    userRole: [
        'National Admin',
        'State Reconstruction Headquarter',
        'County',
        'Experienced Damage Assessor',
        'Damage Assessor'
    ],
}

const data = []

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
        position: 'absolute',
        top: '50%',
        left: '50%',
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

const LookupEditCellBase = ({
                                availableColumnValues, value, onValueChange,
                            }) => (
    <TableCell>
        <Select
            value={value}
            onChange={event => onValueChange(event.target.value)}
            input={(
                <Input/>
            )}
        >
            {availableColumnValues.map(item => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
            ))}
        </Select>
    </TableCell>
);
export const LookupEditCell = LookupEditCellBase;

const Cell = (props) => {
    const {column} = props;
    // custom table cells here
    return <Table.Cell {...props} />;
};

const EditCell = (props) => {
    const {column} = props;
    const availableColumnValues = values[column.name];
    if (availableColumnValues) {
        return <LookupEditCell {...props} availableColumnValues={availableColumnValues}/>;
    }
    return <TableEditRow.Cell {...props} />;
};

const getRowId = row => row.id;


const EditColumnHeaderCell = () => {
    const classes = useStyles()
    return (
        <th className={classes.tableCell}>
            <Link to={`/user/new`}><IconButton><AddIcon/></IconButton></Link>
        </th>
    )
};

const User = () => {
    const classes = useStyles();
    const [language, setLanguage] = useState("en")
    const [columns] = useState([
        {name: 'f_name', title: 'First Name'},
        {name: 'l_name', title: 'Last Name'},
        {name: 'username', title: 'User Name'},
        {name: 'roles', title: 'User Role'},
        {name: 'email', title: 'Email'},
        {name: 'phone_number', title: 'Phone Number'},
    ]);
    const [rows, setRows] = useState(data);
    const [loading, setLoading] = useState(false);
    const [tableColumnExtensions] = useState([
        {columnName: 'f_name', width: 200},
        {columnName: 'l_name', width: 200},
        {columnName: 'username', width: 180},
        {columnName: 'roles', width: 200},
        {columnName: 'email', width: 200},
        {columnName: 'phone_number', width: 200},
    ]);
    const [sorting, getSorting] = useState([]);
    const [editingRowIds, getEditingRowIds] = useState([]);
    const [addedRows, setAddedRows] = useState([]);
    const [rowChanges, setRowChanges] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [pageSizes] = useState([5, 10, 0]);
    const [columnOrder, setColumnOrder] = useState([]);
    const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);
    const [totalSummaryItems] = useState([
        {columnName: 'discount', type: 'avg'},
        {columnName: 'amount', type: 'sum'},
    ]);

    const EditColumnCell = (editProps) => {
        const deleteItem = () => {
            // TODO: replace with MUI pop up
            if (window.confirm('Are you sure you want to delete this row?')) {
                axiosInstance.delete(`/management/users/${editProps.row.id}`).then((res) => {
                    console.log(res)
                }).catch((e)=>{
                    console.error(e)
                })
                fetchRows()
                // props.deleteEntity(editProps.row.id).then(() => {
                //     updateTable();
                // }).catch(() => SnackbarUtil.error('err'));
            }
        };
        const classes = useStyles()
        return (
            <td className={classes.tableCell}>
                <Link to={`/user/details/${editProps.row.id}`}><IconButton disabled><PostAddIcon/></IconButton></Link>
                <Link to={`/user/edit/${editProps.row.id}`}><IconButton><EditIcon/></IconButton></Link>
                <IconButton onClick={deleteItem}><DeleteIcon/></IconButton>
            </td>
        );
    };

    const fetchRows = () => {
        setLoading(true)
        axiosInstance.get('/management/users').then((res) => {
            const dat = res.data.data.map((dataRow) => {
                if (dataRow.roles.length !== 0) {
                    return {...dataRow, roles: dataRow.roles[0].name}
                } else {
                    return dataRow
                }
            })
            setRows(dat)
            setLoading(false)
        }).catch((e)=>{
            console.error(e)
        })
    }

    useEffect(() => {
        fetchRows()
    }, [])

    const changeAddedRows = value => setAddedRows(
        value.map(row => (Object.keys(row).length ? row : {
            firstName: "",
            lastName: "",
            userName: "",
            userRole: values.userRole[0],
        })),
    );

    const commitChanges = ({added, changed, deleted}) => {
        let changedRows;
        // if (added) {
        //     const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        //     changedRows = [
        //         ...rows,
        //         ...added.map((row, index) => ({
        //             id: startingAddedId + index,
        //             ...row,
        //         })),
        //     ];
        // }
        // if (changed) {
        //     changedRows = rows.map(row => (changed[row.id] ? {...row, ...changed[row.id]} : row));
        // }
        if (deleted) {
            // changedRows = deleteRows(deleted);
        }
        // setRows(changedRows);
    };
    console.log(rows)
    return (
        <div className={classes.container}>
            <Header setLanguage={setLanguage}/>
            <Grid container className={classes.chartContainer} alignItems="center">
                <Grid item className={classes.tableTitle}>
                    <Link to={'/dashboard'}><IconButton><ArrowBackIcon/></IconButton></Link>
                </Grid>
                <Grid item className={classes.tableTitle}>
                    <Typography variant={'h5'}>Users Table</Typography>
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

                        <DragDropProvider/>

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
                            cellComponent={EditColumnCell}
                            headerCellComponent={EditColumnHeaderCell}
                        />
                        <TableFixedColumns
                            leftColumns={leftFixedColumns}
                        />
                        <PagingPanel
                            pageSizes={pageSizes}
                        />
                        <div className={loading ? classes.loadingContainer : ''} />
                        {loading && <CircularProgress size={50} className={classes.loading} />}
                    </DevGrid>
                </Paper>
            </Grid>
        </div>
    );
};


export default withPermission(User)
