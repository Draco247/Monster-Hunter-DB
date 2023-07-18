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

export default function Quest() {
    const { id } = useParams();
    console.log(id);
    const [quest, setQuest] = useState(null);
    const [questrewards, setQuestrewards] = useState([]);
    // const [monsterquests, setMonsterQuests] = useState(null);
    // const [monsterhitzones, setMonsterHitzones] = useState(null);
    // const [monsterdrops, setMonsterDrops] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);



    const handleCardMouseEnter = (id) => {
        setHoveredCard(id);
    };

    const handleCardMouseLeave = () => {
        setHoveredCard(null);
    };

    const cardStyle = {
        height: '100%',
        maxWidth: 345,
        // transition: 'box-shadow 0.9s', // Add a smooth transition effect
    };

    const hoverStyle = {
        boxShadow: '0 0 5px 2px #888', // Apply a box shadow when hovered
    };

    const imageStyle = {
        border: '2px solid black',
        borderRadius: '10%', // Make the border curved
        backgroundColor: 'black'
    };

    useEffect(() => {
        const fetchQuest = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/quests/${id}`);
                const data = await response.json();
                setQuest(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching quest:', error);
            }
        };

        const fetchQuestRewards = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/quests/${id}/rewards`);
                const data = await response.json();
                setQuestrewards(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching quest rewards:', error);
            }
        };
        fetchQuest();
        fetchQuestRewards();
    }, [id]);


    if (!quest) {
        return <div>Loading...</div>;
    }

    if (!questrewards) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="quest-details">
                <h1>{quest.quest_name}</h1>
                <p>{quest.objective}</p>
                <p>Failure Conditions: {quest.failure_conditions}</p>
                <p>Hunter Rank Points: {quest.hrp}</p>
                <p>Master Rank Points: {quest.mrp}</p>
            </div>
            <div className="quest-rewards">
                <h2>Quest Rewards</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Item Name</TableCell>
                                <TableCell align="right">Chance</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {questrewards.map(reward => (
                                <TableRow
                                    // key={hitzone.quest_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right" component="a" href={`/items/${reward["Item id"]}`}>{reward["Item"]}</TableCell>
                                    <TableCell align="right">{reward["Chance"]}</TableCell>
                                    <TableCell align="right">{reward["Quantity"]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="quest-monsters">
                <h2>Monsters</h2>
                <Box display="flex" justifyContent="center">
                    <Grid container justifyContent={quest.monsters.length === 2 ? "flex-start" : "space-between"}>
                        {quest.monsters.map(monster => (
                            <Grid item xs={12} sm={6} md={4} key={monster.id}>
                                <Box height="100%">
                                    <Link to={`/monsters/${monster.id}`}>
                                        <Card
                                            sx={{ height: '100%', maxWidth: 345 }}
                                            style={{
                                                ...cardStyle,
                                                ...(hoveredCard === monster.id && hoverStyle),
                                            }}
                                            onMouseEnter={() => handleCardMouseEnter(monster.id)}
                                            onMouseLeave={handleCardMouseLeave}
                                        >
                                            <Box m={4}>
                                                <CardMedia
                                                    component="img"
                                                    image={monster.image_link}
                                                    title={monster.name}
                                                    style={imageStyle}
                                                />
                                            </Box>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                                    {monster.name}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
    </div>

    );
};