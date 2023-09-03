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
import Blast from '../../assets/icons/Element_Icon_Blast.png'
import Paralysis from '../../assets/icons/Element_Paralysis_Icon.png'
import Sleep from '../../assets/icons/Element_Icon_Sleep.png'
import Poison from '../../assets/icons/Element_Poison_Icon.png'
import {useState, useEffect} from "react";
import CardMedia from '@mui/material/CardMedia';
import { Grid,Box } from '@mui/material';
import {Link, useParams} from "react-router-dom";
import {DataGrid,GridToolbar} from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';
import Button from "@mui/material/Button";
import {GridColumnHeaderParams} from "@mui/x-data-grid";
import { getWeaponIcon } from '../weapons/getWeaponIcon';
import { getMonsterIcon } from './getMonsterIcon';
import { getMonsterIntro } from './getMonsterIntro';
import { getArmourIcon } from '../armour/getArmourIcon';
import { getQuestIcon } from '../quests/getQuestIcon';
import { useTheme } from "@mui/material";

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
    const { palette } = useTheme();

    const elementIcons = {
        Fire,
        Water,
        Ice,
        Thunder,
        Dragon,
        Blast,
        Paralysis,
        Sleep,
        Poison,
    };
    
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
    // const [visiblesection, setVisibleSection] = useState(null);

    // const getQuestIcon = (quest_type) => {
    //     // Replace underscores (_) with spaces in the image name
    //     const formattedImageName = `${quest_type
    //         .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}.png`
    //         .replace(/ /g, '_') // First, replace underscores with spaces

    //     // console.log(formattedImageName);

    //     try {
    //         // Use require to dynamically import the image
    //         return require(`../../assets/icons/${formattedImageName}`);
    //     } catch (error) {
    //         // Handle the case when the image doesn't exist
    //         // console.error(`Image ${formattedImageName} not found.`);
    //         return null;
    //     }
    // };
    
    const questcolumns = [
        { field: 'quest_name', headerName: 'Quest', flex:1, sortable: true, 
        renderCell: (params) => {
            const questTypeKeywords = ['hunt all', 'slay all', 'hunt', 'capture', 'slay','deliver']; 
        
            const questTypeMatches = questTypeKeywords.filter(keyword =>
                params.row.objective.toLowerCase().includes(keyword)
            );
            // console.log(questTypeMatches[0]);

            const isArena = /^arena \d+★/.test(params.row.quest_name.toLowerCase()) // check if quest name starts with arena *star to display arena icon

            const questType =
                isArena
                    ? 'Arena'
                    : questTypeMatches.includes('hunt all')  || questTypeMatches.includes('slay all')
                    ? 'Endurance'
                    : questTypeMatches.includes('deliver')
                    ? 'Gathering'
                    : questTypeMatches.includes('deliver')
                    ? 'Gathering'
                    : questTypeMatches.length === 1
                    ? questTypeMatches[0]
                    : 'Hunt';

            const questIcon = getQuestIcon(questType);

            return (
                <div>
                    {questIcon && (
                        <img src={questIcon} alt={questType} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    )}
                    <a href={`/quest/${params.row.id}`}>{params.row.quest_name}</a>
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
                    <a href={`/weapon/${params.row.weapon_id}`}>{params.row.weapon_name}</a>
                </Box>
            ),
            cellClassName: 'centered-cell',
        },
        {
            field: 'weapon_type_name',
            headerName: '',
            flex: 0.1,
            sortable: true,
            // type: "singleSelect",
            // valueOptions: ["sns"],
            renderCell: (params) =>
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 40,
                        marginRight: '8px',
                    }}
                    alt={params.row['weapon_type_name']}
                    src={getWeaponIcon(params.row['weapon_type_name'])}
                />
        },
        { field: 'attack', headerName: 'Attack', flex:0.1, sortable: true},
        { field: 'element', headerName: 'Element', flex:0.2, sortable: true,
        renderCell: (params) => {
            // console.log(params.row.element)
            const elementIconSrc = elementIcons[params.row.element];
            // console.log(elementIconSrc);
            return (
                elementIconSrc && (
                    <div>
                        <img
                            src={elementIconSrc}
                            alt={params.row.element}
                            style={{ width: '40px', height: '40px' }}
                        />
                    </div>
                )
            );
            
        },},
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
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster drops:', error);
            }
        };

        const fetchMonsterForgingWeapons = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/forging-weapons`);
                const data = await response.json();
                setMonsterForgingWeapons(data);
                console.log(data);
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

    return (
        <div>
            <div className="monster-details">
                <h1 style={{ textDecoration: 'underline' }}>{monster.name}</h1>
                <Grid container spacing={2} alignItems="stretch">
                    <Grid item xs={12} sm={9}>
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {getMonsterIntro(monster.name) ? (
                                <Box
                                    component="img"
                                    sx={{
                                        maxHeight: '100%',
                                        maxWidth: '100%',
                                        height: 'auto',
                                        border: '2px solid black',
                                        borderRadius: '5px',
                                    }}
                                    alt={monster.name}
                                    src={getMonsterIntro(monster.name)}
                                />
                            ) : (
                                <p style={{ fontSize: '30px', textAlign: 'center', padding: '10px' }}>
                                    {monster.description}
                                </p>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div>
                            <div style={{ flex: '1 0 50%', display: 'flex', alignItems: 'flex-end' }}>
                                {/* Empty space to move the second image down */}
                            </div>
                            <Box
                                component="img"
                                sx={{
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    height: 'auto',
                                    border: '2px solid black',
                                    borderRadius: '5px',
                                }}
                                alt={monster.name}
                                src={getMonsterIcon(monster.name)}
                            />
                        </div>
                    </Grid>
                </Grid>
                {getMonsterIntro(monster.name) && (
                    <p style={{ fontSize: '30px', textAlign: 'center', padding: '10px' }}>
                        {monster.description}
                    </p>
                )}
            </div>
            {
                /*
                might get rid of the buttons and just display everything
                */
            }
            <div className="monster-tables">
                <div className="monster-quests">
                    <h2>Quests</h2>
                    <div className="monster-section monster-quests">
                         <Box>
                                <DataGrid
                                    rows={monsterquests}
                                    columns={questcolumns}
                                    getRowId={(row) => row.id}
                                    autoHeight
                                    slots={{ toolbar: GridToolbar }}
                                    sx={datagridSx}
                                    // pageSize={5}
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
                </div>
                <div className="monster-hitzones" >
                    <h2>Hitzones</h2>
                    <div className="monster-section monster-hitzones">
                        <Box>
                            <DataGrid
                                rows={monsterhitzones}
                                columns={hitzonecolumns}
                                getRowId={(row) => `${row.hitzone}-${generateUniqueID()}`}
                                autoHeight
                                slots={{ toolbar: GridToolbar }}
                                sx={datagridSx}
                                // disableColumnMenu
                                pageSize={5}
                                // checkboxSelection
                                disableRowSelectionOnClick
                                initialState={{
                                    sorting: {
                                        sortModel: [{ field: 'hitzone', sort: 'asc' }],
                                    },
                                    pagination: { paginationModel: { pageSize: 5 } },
                                }}
                                pageSizeOptions={[5, 10, 25]}
                            
                            />
                        </Box>
                    </div>
                </div>
                {/* {need to fix the filter for drops table} */}
                <div className="monster-drops">
                    <h2>Drops</h2>
                    <div className="monster-section monster-drops">
                            <Box sx={{ height: 400, width: '100%'}}>
                                <DataGrid
                                    rows={monsterdrops}
                                    columns={dropscolumns}
                                    getRowId={(row) => `${row["Item id"]}-${generateUniqueID()}`}
                                    autoHeight
                                    sx={{ '.centered-cell': { justifyContent: 'center' } }} // Add this line to center the cell content
                                    slots={{ toolbar: GridToolbar }}
                                    sx={datagridSx}
                                    // disableColumnMenu
                                    pageSize={5}
                                    // checkboxSelection
                                    disableRowSelectionOnClick
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'Item name', sort: 'asc' }],
                                        },
                                        pagination: { paginationModel: { pageSize: 5 } },
                                    }}
                                    pageSizeOptions={[5, 10, 25]}
                                    
                                />
                            </Box>
                    </div>
                </div>
                {/* {might need to change heights of these tables since it looks weird
                when their heights are inconsistent} */}
                <div className="monster-weapon-forging">
                    <h2>Weapon Forging</h2>
                    <div className="monster-section monster-weapon-forging">
                            <Box>
                                <DataGrid
                                    rows={monsterforgingweapons}
                                    columns={weaponcolumns}
                                    getRowId={(row) => `${row.weapon_id}-${generateUniqueID()}`}
                                    autoHeight
                                    sx={{ '.centered-cell': { justifyContent: 'center' } }} // Add this line to center the cell content
                                    slots={{ toolbar: GridToolbar }}
                                    sx={datagridSx}
                                    // disableColumnMenu
                                    pageSize={5}
                                    // checkboxSelection
                                    disableRowSelectionOnClick
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'weapon_name', sort: 'asc' }],
                                        },
                                        pagination: { paginationModel: { pageSize: 5 } },
                                    }}
                                    pageSizeOptions={[5, 10, 25]}
                                    getRowHeight={() => 'auto'}
                                />
                            </Box>
                    </div>
                </div>
                <div className="monster-weapon-upgrade">
                    <h2>Weapon Upgrades</h2>
                    <div className="monster-section monster-weapon-upgrade">
                            <Box>
                                <DataGrid
                                    rows={monsterupgradeweapons}
                                    columns={weaponcolumns}
                                    getRowId={(row) => `${row.weapon_id}-${generateUniqueID()}`}
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
                                    getRowHeight={() => 'auto'}
                                />
                            </Box>
                    </div>
                </div>
                <div className="monster-armour">
                    <h2>Armour</h2>
                    <div className="monster-section monster-armour">
                            <Box>
                                <DataGrid
                                    rows={monsterarmour}
                                    columns={armourcolumns}
                                    getRowId={(row) => row.armour_id}
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
                                    getRowHeight={() => 'auto'}
                                />
                            </Box>
                    </div>
                </div>
            </div>
        </div>

    );
};