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


    useEffect(() => {
        const fetchMonster = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/monsters/${id}`);
                const data = await response.json();
                setMonster(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster:', error);
            }
        };

        const fetchMonsterQuests = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/monsters/${id}/quests`);
                const data = await response.json();
                setMonsterQuests(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster quests:', error);
            }
        };

        const fetchMonsterHitzones = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/monsters/${id}/hitzones`);
                const data = await response.json();
                setMonsterHitzones(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster hitzones:', error);
            }
        };

        fetchMonster();
        fetchMonsterQuests();
        fetchMonsterHitzones()
    }, [id]);

    // useEffect(() => {
    //     const fetchMonsterQuests = async () => {
    //         try {
    //             const response = await fetch("http://localhost:8080/api/v1/monsters/15778133/quests");
    //             const data = await response.json();
    //             setMonsterQuests(data);
    //         } catch (error) {
    //             console.error('Error fetching monster quests:', error);
    //         }
    //     };
    //
    //     fetchMonsterQuests();
    // }, [id]);

    // useEffect(() => {
    //     const fetchMonsterHitzones = async () => {
    //         try {
    //             const response = await fetch("http://localhost:8080/api/v1/monsters/15778133/hitzones");
    //             const data = await response.json();
    //             setMonsterHitzones(data);
    //             console.log(data);
    //         } catch (error) {
    //             console.error('Error fetching monster hitzones:', error);
    //         }
    //     };
    //
    //     fetchMonsterHitzones();
    // }, [id]);

    if (!monster) {
        return <div>Loading...</div>;
    }

    if (!monsterquests) {
        return <div>Loading...</div>;
    }

    if (!monsterhitzones) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="monster-details">
                <h1>{monster.name}</h1>
                <p>{monster.description}</p>
                <Box m={4}>
                    <CardMedia
                        component="img"
                        image={monster.image_link}
                        title={monster.name}
                        // style={imageStyle}
                    />
                </Box>
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
        </div>

    );
};