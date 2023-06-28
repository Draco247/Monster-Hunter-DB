import * as React from 'react';
import {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid,Box } from '@mui/material';

export default function Monsters() {
    const [monsters, setMonsters] = useState([]);
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
                {monsters.map(monster => (
                    <Grid item xs={12} sm={6} md={4} key={monster.id}>
                        <Box height="100%">
                            <Card sx={{ height: '100%', maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    image={monster.image_link}
                                    title={monster.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {monster.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {monster.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}