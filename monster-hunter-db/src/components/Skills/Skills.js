import * as React from 'react';
import {useState, useEffect} from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Pagination, TablePagination } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    centerCell: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
});

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchValue, setSearchValue] = useState('');
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);

    const columns = [{
        name: "Skill",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Description",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Skill Lvls",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Decorations",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    }];

    const classes = useStyles();

    const options = {
        search: searchBtn,
        viewColumns: viewColumnBtn,
        print: false,
        selectableRows: false,
        onTableChange: (event, state) => {
            console.log(event);
            console.dir(state);
        }
    };


    useEffect(() => {
        fetch(`${process.env.REACT_APP_react_url}/skills/getAll`)
            .then(res => res.json())
            .then((result)=> {
                setSkills(result);
            })}, []);
    // console.log(skills);
    // console.log(JSON.parse(skills[0].skill_levels));

    const tableData = skills.map((skill, index) => [
        <a href={`/skills/${skill.id}`}>{skill.skill_name}</a>,
        skill.skill_description,
        // skill.skillDecorations,
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
            {JSON.parse(skill.skill_levels).map((level, index) => (
                <li key={`skill-level-${index}`}>{level}</li>
            ))}
        </ul>,
        <ul key={`decoration-list-${index}`} style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
            {skill.skillDecorations.map((deco, decoIndex) => (
                <li key={`decoration-${index}-${decoIndex}`}>
                    <Link to={`/decorations/${deco.id}`}>{deco.decoration_name}</Link>
                </li>
            ))}
        </ul>
    ]);
    return (
        <div>
            <ThemeProvider>
                <MUIDataTable title={"Skills"} data={tableData} columns={columns} options={options} />
            </ThemeProvider>
        </div>

    );
}