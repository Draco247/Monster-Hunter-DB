import * as React from 'react';
import './quest.css';
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
import MUIDataTable from "mui-datatables";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";



export default function Quest() {
    const { id } = useParams();
    console.log(id);
    const [quest, setQuest] = useState(null);
    const [questrewards, setQuestrewards] = useState([]);
    // const [monsterquests, setMonsterQuests] = useState(null);
    // const [monsterhitzones, setMonsterHitzones] = useState(null);
    // const [monsterdrops, setMonsterDrops] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    
    
    const columns = [
        { field: 'Item', headerName: 'Item', flex:1, sortable: true,
        renderCell: (params) => {

            return (
                <div>
                    {/* {questIcon && (
                        <img src={questIcon} alt={questType} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    )} */}
                    <Link to={`/items/${params.row["Item id"]}`}>
                        {params.row.Item}
                    </Link>
                </div>
                );
            },
        },
        { field: 'Chance', headerName: 'Chance', flex: 1},
        { field: 'Quantity', headerName: 'Quantity', flex:0.3, sortable: true}
    ];
    // const columns = ["Item Name","Chance","Quantity"];

    // const options = {
    //     search: searchBtn,
    //     viewColumns: viewColumnBtn,
    //     print: false,
    //     // filter: filterBtn,
    //     // filterType: "dropdown",
    //     // responsive,
    //     // tableBodyHeight,
    //     // tableBodyMaxHeight,
    //     onTableChange: (event, state) => {
    //         console.log(event);
    //         console.dir(state);
    //     }
    // };

    // const tableData = questrewards.map((reward) => [
    //     <a href={`/items/${reward["Item id"]}`}>{reward["Item"]}</a>,
    //     reward["Chance"],
    //     reward["Quantity"]
    // ]);

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
            <div className="quest-details">
                <h1 style={{ textDecoration: 'underline' }}>{quest.quest_name}</h1>
                <p>{quest.objective}</p>
                <p>Failure Conditions: {quest.failure_conditions}</p>
                <p>Hunter Rank Points: {quest.hrp}</p>
                <p>Master Rank Points: {quest.mrp}</p>
            </div>
            <div className="quest-rewards">
                <h2>Quest Rewards</h2>
                <div className='quest-section'>
                    <Box sx={{ height: 400, width: '100%'}}>
                        <DataGrid
                            rows={questrewards}
                            columns={columns}
                            getRowId={(row) => row["Item id"]}
                            autoHeight
                            slots={{ toolbar: GridToolbar }}
                            // disableColumnMenu
                            pageSize={5}
                            // checkboxSelection
                            disableRowSelectionOnClick
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'quest_name', sort: 'asc' }],
                                },
                            }}
                        />
                    </Box>
                </div>
                {/* <MUIDataTable title={"Quests"} data={tableData} columns={columns} options={options} /> */}
            </div>
            <div className="quest-monsters">
                <h2>Monsters</h2>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Grid container spacing={2} style={{ flexWrap: 'wrap' }}>
                        {quest.monsters.map(monster => (
                            <Grid item xs={12} sm={6} md={3} lg={3} key={monster.id}>
                                <Box height="100%" display="flex" alignItems="center" justifyContent="center">                  
                                    <Link to={`/monsters/${monster.id}`}>
                                        <Card
                                            // sx={{ height: '100%', maxWidth: 345 }}
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
                                            <CardContent >
                                                <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                                    {monster.name}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Box>
                            </Grid>
                        ))}
                        {quest.monsters.length === 2 && (
                            <Grid item xs={12} sm={6} md={3} lg={3} style={{ visibility: 'hidden' }}>
                                {/* Invisible spacer item */}
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </div>
    </div>

    );
};