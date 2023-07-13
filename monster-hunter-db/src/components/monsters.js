import * as React from 'react';
import {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid,Box } from '@mui/material';
import { Link } from "react-router-dom";

export default function Monsters({ searchQuery }) {
    const [monsters, setMonsters] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const filteredMonsters = monsters.filter((monster) =>
        monster.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
    console.log(filteredMonsters);

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
        fetch("http://localhost:8080/api/v1/monsters/getAll")
            .then(res => res.json())
            .then((result)=> {
            setMonsters(result);
        })}, []);
    console.log(monsters);
    return (
        <Box display="flex" justifyContent="center">
            <Grid container spacing={2} justifyContent="space-between">
                {filteredMonsters.map(monster => (
                    <Grid item xs={12} sm={6} md={4} key={monster.id}>
                        <Box height="100%">
                            <Link to={`/monsters/${monster.id}`} >
                                <Card sx={{ height: '100%', maxWidth: 345 }} style={{
                                    ...cardStyle,
                                    ...(hoveredCard === monster.id && hoverStyle),
                                }}
                                      onMouseEnter={() => handleCardMouseEnter(monster.id)}
                                      onMouseLeave={handleCardMouseLeave}>
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
                                        {/*<Typography variant="body2" color="text.secondary">*/}
                                        {/*    {monster.description}*/}
                                        {/*</Typography>*/}
                                    </CardContent>
                                    {/*<CardActions>*/}
                                    {/*    <Button size="small">Share</Button>*/}
                                    {/*    <Button size="small">Learn More</Button>*/}
                                    {/*</CardActions>*/}
                                </Card>
                            </Link>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}