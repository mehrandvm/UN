import React, {useState} from 'react';
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

const values = {
    userRole: [
        'National Admin',
        'State Reconstruction Headquarter',
        'County',
        'Experienced Damage Assessor',
        'Damage Assessor'
    ],
}

const data = [
    {
        id: 0,
        firstName: "Mehran",
        lastName: "Daneshvar",
        userName: "mehrandvm",
        userRole: "National Admin",
    },
    {
        id: 1,
        firstName: "Hamid",
        lastName: "Nazemi",
        userName: "hamid_nzm",
        userRole: "State Reconstruction Headquarter",
    },
    {
        id: 2,
        firstName: "Mahdi",
        lastName: "Mahmoodian",
        userName: "triple_m",
        userRole: "County",
    },
    {
        id: 3,
        firstName: "John",
        lastName: "Doe",
        userName: "johndoe",
        userRole: "Damage Assessor",
    },
    {
        id: 4,
        firstName: "Jane",
        lastName: "Doe",
        userName: "janedoe",
        userRole: "Experienced Damage Assessor",
    },
]

const useStyles = makeStyles((theme) => ({
    container: {
        overflowX: "hidden"
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
    }
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

const EditColumnCell = (editProps) => {
    const deleteItem = () => {
        // TODO: replace with MUI pop up
        if (window.confirm('Are you sure you want to delete this row?')) {
            // props.deleteEntity(editProps.row.id).then(() => {
            //     updateTable();
            // }).catch(() => SnackbarUtil.error('err'));
        }
    };
    const classes = useStyles()
    return (
        <td className={classes.tableCell}>
            <Link to={`/panel/user/details/${editProps.row.id}`}><IconButton><InfoIcon/></IconButton></Link>
            <Link to={`/panel/user/edit/${editProps.row.id}`}><IconButton><EditIcon/></IconButton></Link>
            <IconButton onClick={deleteItem}><DeleteIcon/></IconButton>
        </td>
    );
};

const EditColumnHeaderCell = () => {
    const classes = useStyles()
    return (
        <th className={classes.tableCell}>
            <Link to={`/panel/user/new`}><IconButton><AddIcon/></IconButton></Link>
        </th>
    )
};

const User = () => {
    const classes = useStyles();
    const [language, setLanguage] = useState("en")
    const [columns] = useState([
        {name: 'firstName', title: 'First Name'},
        {name: 'lastName', title: 'Last Name'},
        {name: 'userName', title: 'User Name'},
        {name: 'userRole', title: 'User Role'},
    ]);
    const [rows, setRows] = useState(data);
    const [tableColumnExtensions] = useState([
        {columnName: 'firstName', width: 200},
        {columnName: 'lastName', width: 200},
        {columnName: 'userName', width: 180},
        {columnName: 'userRole', width: 200},
    ]);
    const [sorting, getSorting] = useState([]);
    const [editingRowIds, getEditingRowIds] = useState([]);
    const [addedRows, setAddedRows] = useState([]);
    const [rowChanges, setRowChanges] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [pageSizes] = useState([5, 10, 0]);
    const [columnOrder, setColumnOrder] = useState(['firstName', 'lastName', 'userName', 'userRole']);
    const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);
    const [totalSummaryItems] = useState([
        {columnName: 'discount', type: 'avg'},
        {columnName: 'amount', type: 'sum'},
    ]);

    const changeAddedRows = value => setAddedRows(
        value.map(row => (Object.keys(row).length ? row : {
            firstName: "",
            lastName: "",
            userName: "",
            userRole: values.userRole[0],
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
            changedRows = deleteRows(deleted);
        }
        setRows(changedRows);
    };
    console.log(rows)
    return (
        <div className={classes.container}>
            <Header setLanguage={setLanguage}/>
            <Grid container className={classes.chartContainer} alignItems="center">
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
                    </DevGrid>
                </Paper>
            </Grid>
        </div>
    );
};


export default User