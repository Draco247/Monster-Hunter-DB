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
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import { getMonsterIcon } from '../monsters/getMonsterIcon';
import { getLocationImage } from './getLocationImage';
import { v4 as uuidv4 } from 'uuid';
import CrownMini from "../../assets/icons/crown_mini.png"
import CrownKing from "../../assets/icons/crown_king.png"
import { useTheme } from "@mui/material";





export default function Quest() {
    const { id } = useParams();
    console.log(id);
    const [quest, setQuest] = useState(null);
    const [questrewards, setQuestrewards] = useState([]);
    const [questminicrowns, setQuestminicrowns] = useState([]);
    const [questkingcrowns, setQuestkingcrowns] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const { palette } = useTheme();

    
    const datagridSx = {
        border: palette.borderColour.MUIDataGrid,
        borderRadius: '5px',
        '.centered-cell': { justifyContent: 'center' },
        "& .MuiDataGrid-columnHeaders": {
        backgroundColor: palette.background.MuiDataGridcolumnHeaders,
        fontSize: 16
        },
        "& .MuiDataGrid-row": {
            backgroundColor: palette.background.MuiDataGridrow
        }
    };
    
    
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

        const fetchQuestMiniCrowns = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/quests/${id}/mini_crown`);
                const data = await response.json();
                setQuestminicrowns(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching quest mini crowns:', error);
            }
        };

        const fetchQuestKingCrowns = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/quests/${id}/king_crown`);
                const data = await response.json();
                setQuestkingcrowns(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching quest king crowns:', error);
            }
        };
        fetchQuest();
        fetchQuestRewards();
        fetchQuestMiniCrowns();
        fetchQuestKingCrowns();
    }, [id]);


    if (!quest) {
        return <div>Loading...</div>;
    }

    if (!questrewards) {
        return <div>Loading...</div>;
    }


    const generateUniqueID = () => {
        return uuidv4(); // Generates a random UUID (unique identifier)
    };

    return (
        <div>
            <div className="quest-details">
                <h1 style={{ textDecoration: 'underline' }}>{quest.quest_name}</h1>
                <br/>
                <Grid container spacing={2} alignItems="stretch">
                    <Grid item xs={12} sm={7}>
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box
                                component="img"
                                sx={{
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    height: 'auto',
                                    border: '2px solid black',
                                    borderRadius: '5px',
                                }}
                                alt={quest.quest_location}
                                src={getLocationImage(quest.quest_location)}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={5} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div>
                            <div style={{ flex: '1 0 50%', display: 'flex', alignItems: 'flex-end' }}>
                                {/* Empty space to move the second image down */}
                            </div>
                            <p>Quest Objective: {quest.objective}</p>
                            <p>Failure Conditions: {quest.failure_conditions}</p>
                            <p>Hunter Rank Points: {quest.hrp}</p>
                            <p>Master Rank Points: {quest.mrp}</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="quest-rewards">
                <h2>Quest Rewards</h2>
                <div className='quest-section quest-rewards'>
                    <Box>
                        <DataGrid
                            rows={questrewards}
                            columns={columns}
                            getRowId={(row) => `${row["Item id"]}-${generateUniqueID()}`}
                            autoHeight
                            slots={{ toolbar: GridToolbar }}
                            sx={datagridSx}
                            // disableColumnMenu
                            pageSize={5}
                            // checkboxSelection
                            disableRowSelectionOnClick
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'quest_name', sort: 'asc' }],
                                },
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[5, 10, 25]}
                        />
                    </Box>
                </div>
                {/* <MUIDataTable title={"Quests"} data={tableData} columns={columns} options={options} /> */}
            </div>
            <div className="quest-monsters">
                <h2>Monsters</h2>
                <div className='quest-section quest-monsters'>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Grid container spacing={2} style={{ flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
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
                                                        image={getMonsterIcon(monster.name)}
                                                        title={monster.name}
                                                        style={imageStyle}
                                                    />
                                                </Box>
                                                <CardContent >
                                                    <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                                        {monster.name}
                                                    </Typography>
                                                    <div>
                                                    {questminicrowns[monster.id] && questminicrowns[monster.id].length > 0 && (
                                                            <div>
                                                                <hr style={{ width: '100%' }} /> {/* Separator */}
                                                                <Typography gutterBottom variant="p" component="div" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                    <img src={CrownMini} alt="mini crown" style={{ width: 30, height: 30, marginRight: '10px' }} />
                                                                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                                                                        {questminicrowns[monster.id].map((item, index) => (
                                                                            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                                                {Object.entries(item).map(([key, value]) => (
                                                                                    <p key={key}>
                                                                                        {key}: {value}
                                                                                    </p>
                                                                                ))}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </Typography>
                                                            </div>
                                                        )}
                                                    {questkingcrowns[monster.id] && questkingcrowns[monster.id].length > 0 && (
                                                        <div>
                                                            <hr style={{ width: '100%' }} /> {/* Separator */}
                                                            <Typography gutterBottom variant="p" component="div" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                <img src={CrownKing} alt="king crown" style={{ width: 30, height: 30, marginRight: '10px' }} />
                                                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                                                {questkingcrowns[monster.id] &&
                                                                    questkingcrowns[monster.id].map((item, index) => (
                                                                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                                        {Object.entries(item).map(([key, value]) => (
                                                                        <p key={key}>
                                                                            {key}: {value}
                                                                        </p>
                                                                        ))}
                                                                    </li>
                                                                    ))}
                                                                </ul>
                                                            </Typography>
                                                        </div>
                                                        )}
                                                    </div>
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
    </div>

    );
};