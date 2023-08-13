import * as React from 'react';
import './monster.css'
import Blade from '../../assets/icons/GS.png'
import Blunt from '../../assets/icons/HAM.png'
import Gunner from '../../assets/icons/LBG.png'
import Fire from '../../assets/icons/Element_Fire_Icon.webp'
import Water from '../../assets/icons/Element_Water_Icon.webp'
import Ice from '../../assets/icons/Element_Ice_Icon.webp'
import Thunder from '../../assets/icons/Element_Thunder_Icon.webp'
import Dragon from '../../assets/icons/Element_Dragon_Icon.webp'
import {useState, useEffect} from "react";
import CardMedia from '@mui/material/CardMedia';
import { Grid,Box } from '@mui/material';
import {Link, useParams} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {DataGrid,GridToolbar} from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';
import Button from "@mui/material/Button";
import {GridColumnHeaderParams} from "@mui/x-data-grid";
import ProgressBar from 'react-bootstrap/ProgressBar';

const useStyles = makeStyles({
    centerCell: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
});

export default function Monster() {
    const { id } = useParams();
    console.log(id);
    const [monster, setMonster] = useState(null);
    const [monsterquests, setMonsterQuests] = useState(null);
    const [monsterhitzones, setMonsterHitzones] = useState(null);
    const [monsterdrops, setMonsterDrops] = useState(null);
    const [monsterforgingweapons, setMonsterForgingWeapons] = useState(null);
    const [monsterupgradeweapons, setMonsterUpgradeWeapons] = useState(null);
    const [monsterarmour, setMonsterArmour] = useState(null);
    const [visible, setVisible] = useState(null);
    // const [visiblesection, setVisibleSection] = useState(null);

    const getQuestIcon = (quest_type) => {
        // Replace underscores (_) with spaces in the image name
        const formattedImageName = `${quest_type
            .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}.png`
            .replace(/ /g, '_') // First, replace underscores with spaces

        // console.log(formattedImageName);

        try {
            // Use require to dynamically import the image
            return require(`../../assets/icons/${formattedImageName}`);
        } catch (error) {
            // Handle the case when the image doesn't exist
            // console.error(`Image ${formattedImageName} not found.`);
            return null;
        }
    };
    
    const questcolumns = [
        { field: 'quest_name', headerName: 'Quest', flex:1, sortable: true, 
        renderCell: (params) => {
            const questTypeKeywords = ['hunt', 'capture', 'slay']; // Add more keywords as needed
            const questTypeMatches = questTypeKeywords.filter(keyword =>
                params.row.objective.toLowerCase().includes(keyword)
            );

            const isArena = /^arena \d+★/.test(params.row.quest_name.toLowerCase()) // check if quest name starts with arena *star to display arena icon

            const questType =
                isArena
                    ? 'Arena'
                    : questTypeMatches.length > 1
                    ? 'Endurance'
                    : questTypeMatches.length === 1
                    ? questTypeMatches[0]
                    : 'Other';

            const questIcon = getQuestIcon(questType);

            return (
                <div>
                    {questIcon && (
                        <img src={questIcon} alt={questType} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    )}
                    <a href={`/quests/${params.row.id}`}>{params.row.quest_name}</a>
                </div>
                );
            },
        },
        { field: 'objective', headerName: 'Objective', flex: 1},
        { field: 'hrp', headerName: 'HRP', flex:0.2, sortable: true},
        { field: 'mrp', headerName: 'MRP', flex:0.2, sortable: true}
    ];

    const hitzonecolumns = [
        { field: 'hitzone', headerName: 'Hitzone', flex:1, sortable: true},
        { field: 'state', headerName: 'State', flex:1, sortable: true},
        {
            field: 'blade hitzone',
            headerName: 'Blade',
            flex: 1,
            sortable: true,
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 40,
                        marginRight: '8px',
                    }}
                    alt="Blade"
                    src={Blade}
                />
            ),
        },
        { field: 'blunt hitzone', headerName: 'Blunt', flex:1, sortable: true,
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 40,
                        marginRight: '8px',
                    }}
                    alt="Blunt"
                    src={Blunt}
                />
            ),},
        { field: 'gunner hitzone', headerName: 'Gunner', flex:1, sortable: true,
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 40,
                        marginRight: '8px',
                    }}
                    alt="Gunner"
                    src={Gunner}
                />
            ),},
        { field: 'fire hitzone', headerName: 'Fire', flex:1, sortable: true,
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 40,
                        marginRight: '8px',
                    }}
                    alt="Fire"
                    src={Fire}
                />
            ),},
        { field: 'water hitzone', headerName: 'Water', flex:1, sortable: true,
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 40,
                        marginRight: '8px',
                    }}
                    alt="Water"
                    src={Water}
                />
            ),},
        { field: 'ice hitzone', headerName: 'Ice', flex:1, sortable: true,
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 40,
                        marginRight: '8px',
                    }}
                    alt="Ice"
                    src={Ice}
                />
            ),},
        { field: 'thunder hitzone', headerName: 'Thunder', flex:1, sortable: true,
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 40,
                        marginRight: '8px',
                    }}
                    alt="Thunder"
                    src={Thunder}
                />
            ),},
        { field: 'dragon hitzone', headerName: 'Dragon', flex:1, sortable: true,
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 40,
                        marginRight: '8px',
                    }}
                    alt="Dragon"
                    src={Dragon}
                />
            ),}
    ];

    const dropscolumns = [
        { field: 'Item', headerName: 'Item', flex:1, sortable: true, valueGetter: (params) => params.row['Item'], // Use 'Item' directly as the cell value
            renderCell: (params) => (
                <a href={`/items/${params.row['Item id']}`}>{params.row['Item']}</a>
            )},
        { field: 'Drop Area', headerName: 'Area', flex:1, sortable: true},
        { field: 'Drop Method', headerName: 'Method', flex:1, sortable: true},
        { field: 'Drop Rate', headerName: 'Rate', flex:1, sortable: true},
        { field: 'Item Rank', headerName: 'Rank', flex:1, sortable: true},
        { field: 'Quantity', headerName: 'Quantity', flex:1, sortable: true}
    ];

    const weaponcolumns = [
        { field: 'weapon_name', headerName: 'Name', flex:0.3, sortable: true, valueGetter: (params) => params.row['weapon_name'], // Use 'weapon_name' directly as the cell value
            renderCell: (params) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px',
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            height: 100,
                            width: 100,
                            border: '2px solid black',
                        }}
                        alt=""
                        src={params.row['weapon_img_url']}
                    />
                    <a href={`/weapons/${params.row.weapon_id}/weapons`}>{params.row.weapon_name}</a>
                </Box>
            ),
            cellClassName: 'centered-cell',
        },
        {
            field: 'weapon_type_name',
            headerName: '',
            flex: 0.1,
            sortable: true,
            renderCell: (params) =>
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 40,
                        marginRight: '8px',
                    }}
                    alt={params.row['weapon_type_name']}
                    src={getWeaponIcon(params.row['weapon_type_name'])}// Remove the parentheses and return the JSX directly}
                />
        },
        { field: 'attack', headerName: 'Attack', flex:0.1, sortable: true},
        { field: 'element', headerName: 'Element', flex:0.2, sortable: true},
        { field: 'element_val', headerName: 'Ele Val', flex:0.1, sortable: true},
        { field: 'deco_slots', headerName: 'Deco Slots', flex:0.3, sortable: true, renderCell: (params) => {
        const decoSlots = JSON.parse(params.value);

        return (
            <div>
                {decoSlots &&
                    decoSlots.map((decoration, index) => (
                        <span key={index}>
                            <Box
                                component="img"
                                sx={{
                                    height: 40,
                                    width: 40,
                                    marginRight: '8px',
                                }}
                                alt={decoration}
                                src={deco_imgs[decoration]}
                            />
                          {/*<img src={deco_imgs[decoration]} alt={decoration} />*/}
                        </span>
                                    ))}
            </div>
                );
            },
        },
        { field: 'rampage_deco_slots', headerName: 'Rampage Deco Slots', flex:0.3, sortable: true, renderCell: (params) => {
                const rampagedecoSlots = JSON.parse(params.value);

                return (
                    <div>
                        {rampagedecoSlots &&
                            rampagedecoSlots.map((decoration, index) => (
                                <span key={index}>
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 40,
                                            width: 40,
                                            marginRight: '8px',
                                        }}
                                        alt={decoration}
                                        src={deco_imgs[decoration]}
                                    />
                                  {/*<img src={deco_imgs[decoration]} alt={decoration} />*/}
                                </span>
                                    ))}
                    </div>
                );
            },
        },
        { field: 'rarity', headerName: 'Rarity', flex:0.3, sortable: true},
    ];

    const armourcolumns = [
        { field: 'armour_name', headerName: 'Name', flex:0.3, sortable: true, valueGetter: (params) => params.row.armour_name,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px',
                    }}
                >
                    {/* <Box
                        component="img"
                        sx={{
                            height: 100,
                            width: 100,
                            border: '2px solid black',
                        }}
                        alt=""
                        src={params.row['weapon_img_url']}
                    /> */}
                    <a href={`/armour/${params.row.armour_id}`}>{params.row.armour_name}</a>
                </Box>
            ),
            cellClassName: 'centered-cell',
        },
        {
            field: 'piece_type',
            headerName: '',
            flex: 0.1,
            sortable: true,
            renderCell: (params) =>
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 40,
                        marginRight: '8px',
                    }}
                    alt={params.row.piece_type}
                    src={getArmourIcon(params.row.piece_type)}// Remove the parentheses and return the JSX directly}
                />
        },
        { field: 'set_name', headerName: 'Set', flex:0.3, sortable: true, valueGetter: (params) => params.row.set_name,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px',
                    }}
                >
                    {/* <Box
                        component="img"
                        sx={{
                            height: 100,
                            width: 100,
                            border: '2px solid black',
                        }}
                        alt=""
                        src={params.row['weapon_img_url']}
                    /> */}
                    <a href={`/armourSets/${params.row.set_id}`}>{params.row.set_name}</a>
                </Box>
            ),
            cellClassName: 'centered-cell',
        },
        { field: 'defense', headerName: 'Defense', flex:0.2, sortable: true},
        { field: 'fire_res', headerName: 'Fire', flex:0.2, sortable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <Box
                component="img"
                sx={{
                    height: 40,
                    width: 40,
                    marginRight: '8px',
                }}
                alt="Fire"
                src={Fire}
            />
        ),},
        { field: 'water_res', headerName: 'Water', flex:0.2, sortable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <Box
                component="img"
                sx={{
                    height: 40,
                    width: 40,
                    marginRight: '8px',
                }}
                alt="Water"
                src={Water}
            />
        ),},
        { field: 'ice_res', headerName: 'Ice', flex:0.2, sortable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <Box
                component="img"
                sx={{
                    height: 40,
                    width: 40,
                    marginRight: '8px',
                }}
                alt="Ice"
                src={Ice}
            />
        ),},
        { field: 'thunder_res', headerName: 'Thunder', flex:0.2, sortable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <Box
                component="img"
                sx={{
                    height: 40,
                    width: 40,
                    marginRight: '8px',
                }}
                alt="Thunder"
                src={Thunder}
            />
        ),},
        { field: 'dragon_res', headerName: 'Dragon', flex:0.2, sortable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <Box
                component="img"
                sx={{
                    height: 40,
                    width: 40,
                    marginRight: '8px',
                }}
                alt="Dragon"
                src={Dragon}
            />
        ),},
        { field: 'deco_slots', headerName: 'Deco Slots', flex:0.3, sortable: true, renderCell: (params) => {
        const decoSlots = JSON.parse(params.value);

        return (
            <div>
                {decoSlots &&
                    decoSlots.map((decoration, index) => (
                        <span key={index}>
                            <Box
                                component="img"
                                sx={{
                                    height: 40,
                                    width: 40,
                                    marginRight: '8px',
                                }}
                                alt={decoration}
                                src={deco_imgs[decoration]}
                            />
                          {/*<img src={deco_imgs[decoration]} alt={decoration} />*/}
                        </span>
                                    ))}
            </div>
                );
            },
        },
        { field: 'rarity', headerName: 'Rarity', flex:0.3, sortable: true},
    ];

    const deco_imgs = {
        "deco1": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco1.png",
        "deco2": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco2.png",
        "deco3": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco3.png",
        "deco4": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco4.png"
    }


    useEffect(() => {
        const fetchMonster = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}`);
                const data = await response.json();
                setMonster(data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching monster:', error);
            }
        };

        const fetchMonsterQuests = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/quests`);
                const data = await response.json();
                setMonsterQuests(data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching monster quests:', error);
            }
        };

        const fetchMonsterHitzones = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/hitzones`);
                const data = await response.json();
                setMonsterHitzones(data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching monster hitzones:', error);
            }
        };

        const fetchMonsterDrops = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/drops`);
                const data = await response.json();
                setMonsterDrops(data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching monster drops:', error);
            }
        };

        const fetchMonsterForgingWeapons = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/forging-weapons`);
                const data = await response.json();
                setMonsterForgingWeapons(data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching monster forging weapons:', error);
            }
        };

        const fetchMonsterUpgradeWeapons = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/upgrade-weapons`);
                const data = await response.json();
                setMonsterUpgradeWeapons(data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching monster upgrade weapons:', error);
            }
        };

        const fetchMonsterArmour = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/armour`);
                const data = await response.json();
                setMonsterArmour(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster armour:', error);
            }
        };

        fetchMonster()
        fetchMonsterQuests()
        fetchMonsterHitzones()
        fetchMonsterDrops()
        fetchMonsterForgingWeapons()
        fetchMonsterUpgradeWeapons()
        fetchMonsterArmour()
    }, [id]);

    if (!monster || !monsterquests || !monsterhitzones || !monsterdrops || !monsterupgradeweapons || !monsterforgingweapons ||!monsterarmour) {
        return <div>Loading...</div>;
    }

    const generateUniqueID = () => {
        return uuidv4(); // Generates a random UUID (unique identifier)
    };

    const handleVisibleChange = (table) => {
        if (visible === table) {
            // Toggle visibility off if the same section is clicked again
            setVisible(null);
        } else {
            setVisible(table);
        }

        // console.log(visible)
        // // console.log(visiblesection)
    };

    const getMonsterIcon = (monster_name) => {
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

    const getWeaponIcon = (weapon_type) => {
        // Replace underscores (_) with spaces in the image name
        const formattedImageName = `${weapon_type.toUpperCase()}.png`

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

    const getArmourIcon = (piece_type) => {
        // Replace underscores (_) with spaces in the image name
        const formattedImageName = `${piece_type}.png`

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
            <div className="monster-details">
                <h1>{monster.name}</h1>
                <Grid container spacing={2} alignItems="stretch">
                    <Grid item xs={12} sm={9}>
                        <div style={{ border: '1px solid black', borderRadius: '5px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ fontSize: '32px', textAlign: 'center', padding: '10px' }}>{monster.description}</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div style={{ border: '1px solid black', borderRadius: '5px', height: '100%', display: 'flex' }}>
                            <Box style={{ border: '1px solid red', borderRadius: '5px', padding: '10px', width: '100%' }}>
                                <CardMedia
                                    component="img"
                                    image={getMonsterIcon(monster.name)}
                                    title={monster.name}
                                    style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }}
                                />
                            </Box>
                        </div>
                    </Grid>
                </Grid>

            </div>
            {
                /*
                might get rid of the buttons and just display everything
                */
            }
            <div className="monster-tables">
                <div className="monster-quests">
                    <div className="expand-button">
                        <Button onClick={() => handleVisibleChange("quests")}>
                            <h2>Monster Quests</h2>
                        </Button>
                    </div>
                    {visible === "quests" && (
                        <div className="monster-section monster-quests-content">
                            <Box sx={{ height: 400, width: '100%'}}>
                                <DataGrid
                                    rows={monsterquests}
                                    columns={questcolumns}
                                    getRowId={(row) => row.id}
                                    autoHeight
                                    slots={{ toolbar: GridToolbar }}
                                    pageSize={5}
                                    disableRowSelectionOnClick
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'quest_name', sort: 'asc' }],
                                        },
                                    }}
                                />
                            </Box>
                        </div>
                    )}
                </div>
                <div className="monster-hitzones" >
                    <div className="expand-button">
                       <Button onClick={() => handleVisibleChange("hitzones")}>
                        <h2>Monster Hitzones</h2>
                    </Button>
                    </div>
                    {visible === "hitzones" && (
                        <div className="monster-section monster-hitzones">
                            <Box sx={{ height: 400, width: '100%'}}>
                                <DataGrid
                                    rows={monsterhitzones}
                                    columns={hitzonecolumns}
                                    getRowId={(row) => `${row.hitzone}-${generateUniqueID()}`}
                                    autoHeight
                                    // disableColumnMenu
                                    pageSize={5}
                                    // checkboxSelection
                                    disableRowSelectionOnClick
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'hitzone', sort: 'asc' }],
                                        },
                                    }}
                                
                                />
                            </Box>
                        </div>
                    )}
                </div>
                {/* {need to fix the filter for drops table} */}
                <div className="monster-drops">
                    <div className="expand-button">
                       <Button onClick={() => handleVisibleChange("drops")}>
                        <h2>Monster Drops</h2>
                    </Button>
                    </div>  
                    {visible === "drops" && (
                        <div className="monster-section monster-drops">
                            <Box sx={{ height: 400, width: '100%'}}>
                                <DataGrid
                                    rows={monsterdrops}
                                    columns={dropscolumns}
                                    getRowId={(row) => `${row["Item id"]}-${generateUniqueID()}`}
                                    autoHeight
                                    sx={{ '.centered-cell': { justifyContent: 'center' } }} // Add this line to center the cell content
                                    slots={{ toolbar: GridToolbar }}
                                    // disableColumnMenu
                                    pageSize={5}
                                    // checkboxSelection
                                    disableRowSelectionOnClick
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'Item name', sort: 'asc' }],
                                        },
                                    }}
                                    
                                />
                            </Box>
                        </div>
                        )}
                </div>
                {/* {might need to change heights of these tables since it looks weird
                when their heights are inconsistent} */}
                <div className="monster-weapon-forging">
                    <div className="expand-button">
                        <Button onClick={() => handleVisibleChange("forging")}>
                            <h2>Monster Forging Weapons</h2>
                        </Button>
                    </div>
                    {visible === "forging" && (
                        <div className="monster-section monster-weapon-forging">
                            <Box sx={{ height: 400, width: '100%'}}>
                                <DataGrid
                                    rows={monsterforgingweapons}
                                    columns={weaponcolumns}
                                    getRowId={(row) => `${row.weapon_id}-${generateUniqueID()}`}
                                    autoHeight
                                    sx={{ '.centered-cell': { justifyContent: 'center' } }} // Add this line to center the cell content
                                    slots={{ toolbar: GridToolbar }}
                                    // disableColumnMenu
                                    pageSize={5}
                                    // checkboxSelection
                                    disableRowSelectionOnClick
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'weapon_name', sort: 'asc' }],
                                        },
                                    }}
                                    getRowHeight={() => 'auto'}
                                />
                            </Box>
                        </div>
                        )}
                </div>
                <div className="monster-weapon-upgrade">
                    <div className="expand-button">
                       <Button onClick={() => handleVisibleChange("upgrade")}>
                            <h2>Monster Upgrade Weapons</h2>
                        </Button>
                    </div>
                    {visible === "upgrade" && (
                        <div className="monster-section monster-weapon-upgrade">
                            <Box sx={{ height: 400, width: '100%'}}>
                                <DataGrid
                                    rows={monsterupgradeweapons}
                                    columns={weaponcolumns}
                                    getRowId={(row) => `${row.weapon_id}-${generateUniqueID()}`}
                                    autoHeight
                                    // disableColumnMenu
                                    pageSize={5}
                                    // checkboxSelection
                                    disableRowSelectionOnClick
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'quest_name', sort: 'asc' }],
                                        },
                                    }}
                                    getRowHeight={() => 'auto'}
                                />
                            </Box>
                        </div>
                        )}
                </div>
                <div className="monster-armour">
                    <div className="expand-button">
                       <Button onClick={() => handleVisibleChange("armour")}>
                            <h2>Monster Armour</h2>
                        </Button>
                    </div>
                    {visible === "armour" && (
                        <div className="monster-section monster-armour">
                            <Box sx={{ height: 400, width: '100%'}}>
                                <DataGrid
                                    rows={monsterarmour}
                                    columns={armourcolumns}
                                    getRowId={(row) => row.armour_id}
                                    autoHeight
                                    // disableColumnMenu
                                    pageSize={5}
                                    // checkboxSelection
                                    disableRowSelectionOnClick
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'quest_name', sort: 'asc' }],
                                        },
                                    }}
                                    getRowHeight={() => 'auto'}
                                />
                            </Box>
                        </div>
                        )}
                </div>
            </div>
        </div>

    );
};