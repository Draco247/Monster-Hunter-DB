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

export default function Armours({ searchQuery }) {
    const [armours, setArmours] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const filteredArmours = armours.filter((armour) =>
        armour.armour_name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
    console.log(filteredArmours);

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
        backgroundColor: 'black',
        maxWidth: '50%',
        maxHeight: '50%',
        height: 'auto',
        display: 'block',
        margin: '0 auto'
    };

    useEffect(() => {
        console.log(process.env.REACT_APP_react_url)
        fetch(`${process.env.REACT_APP_react_url}/armour/getAll`)
            .then(res => res.json())
            .then((result)=> {
                setArmours(result);


            })}, []);
    console.log(armours);
    return (
        <Box display="flex" justifyContent="center">
            <Grid container spacing={2} style={{ justifyContent: armours.length === 2 ? 'flex-start' : 'space-between', flexWrap: 'wrap' }}>
                {filteredArmours.map(armour => (
                    <Grid item xs={12} sm={6} md={4} key={armour.id}>
                        <Box height="100%">
                            <Link to={`/armour/${armour.id}`} >
                                <Card sx={{ height: '100%', maxWidth: 345 }} style={{
                                    ...cardStyle,
                                    ...(hoveredCard === armour.id && hoverStyle),
                                }}
                                      onMouseEnter={() => handleCardMouseEnter(armour.id)}
                                      onMouseLeave={handleCardMouseLeave}>
                                    <Box m={4}>
                                        <CardMedia
                                            component="img"
                                            image={armour.m_armour_img_url}
                                            title={armour.armour_name}
                                            style={imageStyle}
                                        />
                                    </Box>
                                    <Box m={4}>
                                        <CardMedia
                                            component="img"
                                            image={armour.f_armour_img_url}
                                            title={armour.armour_name}
                                            style={imageStyle}
                                        />
                                    </Box>

                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                            {armour.armour_name}
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