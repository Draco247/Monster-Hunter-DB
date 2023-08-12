import * as React from 'react';
import './monsters.css'
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
        console.log(process.env.REACT_APP_react_url)
        fetch(`${process.env.REACT_APP_react_url}/monsters/getAll`)
            .then(res => res.json())
            .then((result)=> {
            setMonsters(result);


            })}, []);
    console.log(monsters);

    const getMonsterIcons = (monster_name) => {
        // Replace underscores (_) with spaces in the image name
        const formattedImageName = `${monster_name
            .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}_Icon.png`
            .replace(/ /g, '_') // First, replace underscores with spaces

        // console.log(formattedImageName);

        try {
            // Use require to dynamically import the image
            return require(`../../assets/icons/${formattedImageName}`);
        } catch (error) {
            // Handle the case when the image doesn't exist
            console.error(`Image ${formattedImageName} not found.`);
            return null;
        }
    };

    return (
        <div>
            <div className="large-monsters" id="large-monsters-section">
                <h2>Large Monsters</h2>
                <Box m={8} display="flex" justifyContent="center" alignItems="center">
                    <Grid container spacing={2} style={{ flexWrap: 'wrap' }}>
                        {filteredMonsters.filter(monster => monster.monster_size === "large").sort((a, b) => a.name.localeCompare(b.name)).map(monster => (
                            <Grid item xs={12} sm={6} md={3} lg={3} key={monster.id}>
                                <Box height="100%" display="flex" alignItems="center" justifyContent="center">
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
                                                    image={getMonsterIcons(monster.name)}
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
                        {filteredMonsters.length === 2 && (
                            <Grid item xs={12} sm={6} md={3} lg={3} style={{ visibility: 'hidden' }}>
                                {/* Invisible spacer item */}
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </div>
            <div className="small-monsters" id="small-monsters-section">
                <h2>Small Monsters</h2>
                <Box m={8} display="flex" justifyContent="center" alignItems="center">
                    <Grid container spacing={2} style={{ flexWrap: 'wrap' }}>
                        {filteredMonsters.filter(monster => monster.monster_size === "small").sort((a, b) => a.name.localeCompare(b.name)).map(monster => (
                            <Grid item xs={12} sm={6} md={3} lg={3} key={monster.id}>
                                <Box height="100%" display="flex" alignItems="center" justifyContent="center">
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
                                                    image={getMonsterIcons(monster.name)}
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
                        {filteredMonsters.length === 2 && (
                            <Grid item xs={12} sm={6} md={3} lg={3} style={{ visibility: 'hidden' }}>
                                {/* Invisible spacer item */}
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </div>
        </div>
    );
}