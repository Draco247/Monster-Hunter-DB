import * as React from 'react';
import {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
        monsters.map(monster => (
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={monster.image_link}
                    title={monster.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {monster.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        ))
    );
}