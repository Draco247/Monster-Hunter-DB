import * as React from 'react';
import {useState, useEffect} from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Pagination, TablePagination } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

export default function BasicTable() {
    const [quests, setQuests] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchValue, setSearchValue] = useState('');
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);

    const columns = ["Locale", "Quest","Objective", "HRP", "MRP"];

    const options = {
        search: searchBtn,
        viewColumns: viewColumnBtn,
        print: false,
        // filter: filterBtn,
        // filterType: "dropdown",
        // responsive,
        // tableBodyHeight,
        // tableBodyMaxHeight,
        onTableChange: (event, state) => {
            console.log(event);
            console.dir(state);
        }
    };

    const tableData = quests.map((quest) => [
        ".....",
        <a href={`/quests/${quest.id}`}>{quest.quest_name}</a>,
        quest.objective,
        parseInt(quest.hrp.replace(/,/g, ""), 10),
        parseInt(quest.mrp.replace(/,/g, ""), 10),
    ]);

    const getMuiTheme = () =>
        createTheme({
            overrides: {
                MUIDataTableBodyCell: {
                    root: {
                        backgroundColor: "#FF0000",
                    },
                },
                MUIDataTablePagination: {
                    root: {
                        backgroundColor: "#000",
                        color: "#fff",
                    },
                },
            },
        });



    useEffect(() => {
        fetch(`${process.env.REACT_APP_react_url}/quests/getAll`)
            .then(res => res.json())
            .then((result)=> {
                setQuests(result);
            })}, []);
    console.log(quests);
    return (
        <div>
            <ThemeProvider theme={getMuiTheme}>
                <MUIDataTable title={"Quests"} data={tableData} columns={columns} options={options} />
            </ThemeProvider>
        </div>

    );
}