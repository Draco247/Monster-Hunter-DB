import * as React from 'react';
import {useState, useEffect} from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Pagination,
    TablePagination,
    Box
} from '@mui/material';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";

export default function BasicTable() {
    const [quests, setQuests] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchValue, setSearchValue] = useState('');
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);

    // const columns = ["Locale", "Quest","Objective", "HRP", "MRP"];
    const columns = [
        { field: 'quest_name', headerName: 'Quest', flex:1, sortable: true, renderCell: (params) => <a href={`/quests/${params.row.id}`}>{params.row.quest_name}</a>},
        { field: 'objective', headerName: 'Objective', flex: 1},
        { field: 'hrp', headerName: 'HRP', flex:0.1, sortable: true},
        { field: 'mrp', headerName: 'MRP', flex:0.1, sortable: true}
    ];

    // const options = {
    //     search: searchBtn,
    //     viewColumns: viewColumnBtn,
    //     print: false,
    //     // filter: filterBtn,
    //     // filterType: "dropdown",
    //     // responsive,
    //     // tableBodyHeight,
    //     // tableBodyMaxHeight,
    //     onTableChange: (event, state) => {
    //         console.log(event);
    //         console.dir(state);
    //     }
    // };


    // const tableData = quests.map((quest) => [
    //     ".....",
    //     <a href={`/quests/${quest.id}`}>{quest.quest_name}</a>,
    //     quest.objective,
    //     parseInt(quest.hrp.replace(/,/g, ""), 10),
    //     parseInt(quest.mrp.replace(/,/g, ""), 10),
    // ]);

    // const getMuiTheme = () =>
    //     createTheme({
    //         overrides: {
    //             MUIDataTableBodyCell: {
    //                 root: {
    //                     backgroundColor: "#FF0000",
    //                 },
    //             },
    //             MUIDataTablePagination: {
    //                 root: {
    //                     backgroundColor: "#000",
    //                     color: "#fff",
    //                 },
    //             },
    //         },
    //     });


    useEffect(() => {
        fetch(`${process.env.REACT_APP_react_url}/quests/getAll`)
            .then(res => res.json())
            .then((result)=> {
                setQuests(result);
            })}, []);
    console.log(quests);

    return (
        <div>
            <Box sx={{ height: 400, width: '100%'}}>
                <DataGrid
                    rows={quests}
                    columns={columns}
                    getRowId={(row) => row.id}
                    autoHeight
                    slots={{ toolbar: GridToolbar }}
                    // disableColumnMenu
                    pageSize={5}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'quest_name', sort: 'asc' }],
                        },
                    }}
                    // getRowHeight={(params) => {
                    //     const defaultRowHeight = 100; // Set a default row height (adjust as needed)
                    //     const questNames = JSON.parse(params.model.quest_name);
                    //
                    //     // Calculate the height required for the list items in the cell
                    //     const listItemHeight = 30; // Assuming each list item has a height of 30px
                    //
                    //     // Calculate the total height needed for all list items
                    //     const totalHeight = questNames.length * listItemHeight;
                    //
                    //     // Return the greater of the total height or the default row height
                    //     return Math.max(defaultRowHeight, totalHeight);

                    // }}
                />
            </Box>
        </div>

    );
}