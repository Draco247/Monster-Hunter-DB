import * as React from 'react';
import {useState, useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable() {
    const [quests, setQuests] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/quests/getAll")
            .then(res => res.json())
            .then((result)=> {
                setQuests(result);
            })}, []);
    console.log(quests);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Locale</TableCell>
                        <TableCell align="right">Quest</TableCell>
                        <TableCell align="right">Objective</TableCell>
                        <TableCell align="right">HRP</TableCell>
                        <TableCell align="right">MRP</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {quests.map(quest => (
                        <TableRow
                            key={quest.quest_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">.....</TableCell>
                            <TableCell component="a" href = "{quest.quest_url}" scope="row" align="right">
                                {quest.quest_name}
                            </TableCell>
                            <TableCell align="right">{quest.objective}</TableCell>
                            <TableCell align="right">{quest.hrp}</TableCell>
                            <TableCell align="right">{quest.mrp}</TableCell>
                            {/*<TableCell align="right">{row.protein}</TableCell>*/}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}