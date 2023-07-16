import * as React from 'react';
import {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid,Box } from '@mui/material';
import {Link, useLocation} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

export default function Weapons(weaponType) {
    const [weapons, setWeapons] = useState([])
    console.log(weaponType)
    useEffect(() => {
        fetch(`${process.env.REACT_APP_react_url}/weapons/${weaponType.weaponType}/weapons`)
            .then(res => res.json())
            .then((result)=> {
                setWeapons(result);
            })}, []);
    console.log(weapons);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Img</TableCell>
                        <TableCell align="right">Weapon Name</TableCell>
                        <TableCell align="right">Attack</TableCell>
                        {/*<TableCell align="right">HRP</TableCell>*/}
                        {/*<TableCell align="right">MRP</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weapons.map(weapon => (
                        <TableRow
                            key={weapon.weapon_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">
                                <Box
                                    component="img"
                                    sx={{
                                        height: 100,
                                        width: 100,
                                        border: '2px solid black'
                                        // maxHeight: { xs: 233, md: 167 },
                                        // maxWidth: { xs: 350, md: 250 },
                                    }}
                                    alt=""
                                    src={weapon.weapon_img_url}
                                />
                            </TableCell>
                            <TableCell component="a" href = {`/weapons/${weapon.id}/weapons`} scope="row" align="right">
                                {weapon.weapon_name}
                            </TableCell>
                            <TableCell align="right">{weapon.attack}</TableCell>
                            {/*<TableCell align="right">{quest.hrp}</TableCell>*/}
                            {/*<TableCell align="right">{quest.mrp}</TableCell>*/}
                            {/*<TableCell align="right">{row.protein}</TableCell>*/}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}