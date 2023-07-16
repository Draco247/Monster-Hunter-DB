import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Box, Grid} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Item() {
    const { id } = useParams();
    console.log(id);
    const [item, setItem] = useState(null);
    const [itemmonsters, setItemMonsters] = useState([]);
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

    const itemimageStyle = {
        border: '2px solid black',
        borderRadius: '10%',
        backgroundColor: 'black',
        width: '50px', // Adjust the width value to your desired size
        height: '50px', // Adjust the height value to your desired size
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                console.log(process.env.REACT_APP_react_url)
                const response = await fetch(`${process.env.REACT_APP_react_url}/items/${id}`);
                const data = await response.json();
                setItem(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        const fetchItemMonsters = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/items/${id}/monsters`);
                const data = await response.json();
                setItemMonsters(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching item monsters:', error);
            }
        };

        fetchItem();
        fetchItemMonsters();
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }
    if (!itemmonsters) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <div className="item-details">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <h1>{item.item_name}</h1>
                    <Box ml={2}>
                        <CardMedia
                            component="img"
                            image={item.item_img}
                            title={item.item_name}
                            style={itemimageStyle}
                        />
                    </Box>
                </Box>
                <p>{item.item_description}</p>
            </div>
            <div className="item-monsters">
                <h2>Monsters</h2>
                <Box display="flex" justifyContent="center">
                    <Grid container spacing={2} justifyContent="space-between">
                        {itemmonsters.map(monster => (
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
            </div>
        </div>

    );
};