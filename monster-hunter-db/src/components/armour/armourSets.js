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
import { getArmourSetImage } from './getArmourSetImage';

export default function ArmourSets({ searchQuery }) {
    const [armoursets, setArmourSets] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const filteredArmourSets = armoursets.filter((armourset) =>
        armourset.set_name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
    console.log(filteredArmourSets);

    const handleCardMouseEnter = (id) => {
        setHoveredCard(id);
    };

    const handleCardMouseLeave = () => {
        setHoveredCard(null);
    };

    const cardStyle = {
        height: '100%',
        maxWidth: '100%',
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
        fetch(`${process.env.REACT_APP_react_url}/armour/getAllSets`)
            .then(res => res.json())
            .then((result)=> {
                setArmourSets(result);


            })}, []);
    console.log(armoursets);
    return (
        <Box m={8} display="flex" justifyContent="center" alignItems="center">
            <Grid container spacing={2} style={{ justifyContent: armoursets.length === 2 ? 'flex-start' : 'space-between', flexWrap: 'wrap' }}>
                {filteredArmourSets.map(armourset => (
                    <Grid item xs={12} sm={6} md={3} lg={3} key={armourset.id}>
                        <Box height="100%" alignItems="center" justifyContent="center">
                             <Link to={`/armour/armourSets/${armourset.id}`}> 
                                <Card style={{
                                    ...cardStyle,
                                    ...(hoveredCard === armourset.id && hoverStyle),
                                }}
                                      onMouseEnter={() => handleCardMouseEnter(armourset.id)}
                                      onMouseLeave={handleCardMouseLeave}>
                                    <Box m={4}>
                                        <CardMedia
                                            component="img"
                                            image={getArmourSetImage(armourset.set_name)}
                                            title={armourset.set_name}
                                            style={imageStyle}
                                        />
                                    </Box>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                            {armourset.set_name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Box>
                    </Grid>
                ))}
                {filteredArmourSets.length === 2 ||filteredArmourSets.length === 3 && (
                        <Grid item xs={12} sm={6} md={3} lg={3} style={{ visibility: 'hidden' }}>
                            {/* Invisible spacer item */}
                        </Grid>
                    )}
            </Grid>
        </Box>
    );
}