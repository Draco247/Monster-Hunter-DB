import * as React from 'react';
import {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid,Box } from '@mui/material';
import {Link, useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

export default function Monster() {
    const { id } = useParams();
    console.log(id);
    const [monster, setMonster] = useState(null);
    const [monsterquests, setMonsterQuests] = useState(null);
    const [monsterhitzones, setMonsterHitzones] = useState(null);
    const [monsterdrops, setMonsterDrops] = useState(null);


    useEffect(() => {
        const fetchMonster = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}`);
                const data = await response.json();
                setMonster(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster:', error);
            }
        };

        const fetchMonsterQuests = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/quests`);
                const data = await response.json();
                setMonsterQuests(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster quests:', error);
            }
        };

        const fetchMonsterHitzones = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/hitzones`);
                const data = await response.json();
                setMonsterHitzones(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster hitzones:', error);
            }
        };

        const fetchMonsterDrops = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/drops`);
                const data = await response.json();
                setMonsterDrops(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster drops:', error);
            }
        };

        fetchMonster();
        fetchMonsterQuests();
        fetchMonsterHitzones()
        fetchMonsterDrops()
    }, [id]);

    if (!monster) {
        return <div>Loading...</div>;
    }

    if (!monsterquests) {
        return <div>Loading...</div>;
    }

    if (!monsterhitzones) {
        return <div>Loading...</div>;
    }

    if (!monsterdrops){
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="monster-details">
                <h1>{monster.name}</h1>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <div style={{ border: '1px solid black', borderRadius:'5px', padding: '10px', marginRight: '10px' }}>
                            <p style={{ fontSize: '32px' }}>{monster.description}</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div style={{ border: '1px solid black', borderRadius:'5px', padding: '10px' }}>
                            <Box m={4}>
                                <CardMedia
                                    component="img"
                                    image={monster.image_link}
                                    title={monster.name}
                                    style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }}
                                    // style={imageStyle}
                                />
                            </Box>
                        </div>
                    </Grid>
                </Grid>



            </div>
            <div className="monster-quests">
                <h2>Monster Quests</h2>
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
                            {monsterquests.map(quest => (
                                <TableRow
                                    key={quest.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">.....</TableCell>
                                    <TableCell component="a" href={`/quests/${quest.id}`} scope="row" align="right">
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
            </div>
            <div className="monster-hitzones">
                <h2>Monster Hitzones</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Hitzone</TableCell>
                                <TableCell align="right">Blade</TableCell>
                                <TableCell align="right">Blunt</TableCell>
                                <TableCell align="right">Gunner</TableCell>
                                <TableCell align="right">Fire</TableCell>
                                <TableCell align="right">Water</TableCell>
                                <TableCell align="right">Ice</TableCell>
                                <TableCell align="right">Thunder</TableCell>
                                <TableCell align="right">Dragon</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {monsterhitzones.map(hitzone => (
                                <TableRow
                                    // key={hitzone.quest_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{hitzone.hitzone}</TableCell>
                                    <TableCell align="right">{hitzone["blade hitzone"]}</TableCell>
                                    <TableCell align="right">{hitzone["blunt hitzone"]}</TableCell>
                                    <TableCell align="right">{hitzone["gunner hitzone"]}</TableCell>
                                    <TableCell align="right">{hitzone["fire hitzone"]}</TableCell>
                                    <TableCell align="right">{hitzone["water hitzone"]}</TableCell>
                                    <TableCell align="right">{hitzone["ice hitzone"]}</TableCell>
                                    <TableCell align="right">{hitzone["thunder hitzone"]}</TableCell>
                                    <TableCell align="right">{hitzone["dragon hitzone"]}</TableCell>
                                    {/*<TableCell align="right">{row.protein}</TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="monster-drops">
                <h2>Monster Drops</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Item Name</TableCell>
                                <TableCell align="right">Area</TableCell>
                                <TableCell align="right">Method</TableCell>
                                <TableCell align="right">Drop Rate</TableCell>
                                <TableCell align="right">Item Rank</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {monsterdrops.map(drop => (
                                <TableRow
                                    // key={hitzone.quest_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right" component="a" href={`/items/${drop["Item id"]}`}>{drop["Item"]}</TableCell>
                                    <TableCell align="right">{drop["Drop Area"]}</TableCell>
                                    <TableCell align="right">{drop["Drop Method"]}</TableCell>
                                    <TableCell align="right">{drop["Drop Rate"]}</TableCell>
                                    <TableCell align="right">{drop["Item Rank"]}</TableCell>
                                    <TableCell align="right">{drop["Quantity"]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
};