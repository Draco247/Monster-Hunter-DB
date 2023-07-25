import * as React from 'react';
import './monster.css'
import {useState, useEffect} from "react";
import CardMedia from '@mui/material/CardMedia';
import { Grid,Box } from '@mui/material';
import {Link, useParams} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {DataGrid,GridToolbar} from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';
import Button from "@mui/material/Button";

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
    const [visible, setVisible] = useState(null);
    // const [visiblesection, setVisibleSection] = useState(null);

    const questcolumns = [
        { field: 'quest_name', headerName: 'Quest', width: 400, sortable: true, renderCell: (params) => <a href={`/quests/${params.row.id}`}>{params.row.quest_name}</a>},
        { field: 'objective', headerName: 'Objective', width: 150, flex: 1},
        { field: 'hrp', headerName: 'HRP', width: 100, sortable: true},
        { field: 'mrp', headerName: 'MRP', width: 100, sortable: true}
    ];

    const hitzonecolumns = [
        { field: 'hitzone', headerName: 'Hitzone', width: 150, sortable: true},
        { field: 'blade_hitzone', headerName: 'Blade', width: 150, sortable: true},
        { field: 'blunt_hitzone', headerName: 'Blunt', width: 150, sortable: true},
        { field: 'gunner_hitzone', headerName: 'Gunner', width: 150, sortable: true},
        { field: 'fire_hitzone', headerName: 'Fire', width: 150, sortable: true},
        { field: 'water_hitzone', headerName: 'Water', width: 150, sortable: true},
        { field: 'ice_hitzone', headerName: 'Ice', width: 150, sortable: true},
        { field: 'thunder_hitzone', headerName: 'Thunder', width: 150, sortable: true},
        { field: 'dragon_hitzone', headerName: 'Dragon', width: 150, sortable: true}
    ];

    const dropscolumns = [
        { field: 'Item', headerName: 'Item', width: 150, sortable: true, valueGetter: (params) => params.row['Item'], // Use 'Item' directly as the cell value
            renderCell: (params) => (
                <a href={`/items/${params.row['Item id']}`}>{params.row['Item']}</a>
            )},
        { field: 'Drop Area', headerName: 'Area', width: 150, sortable: true},
        { field: 'Drop Method', headerName: 'Method', width: 150, sortable: true},
        { field: 'Drop Rate', headerName: 'Rate', width: 150, sortable: true},
        { field: 'Item Rank', headerName: 'Rank', width: 150, sortable: true},
        { field: 'Quantity', headerName: 'Quantity', width: 150, sortable: true}
    ];

    const weaponcolumns = [
        { field: 'weapon_name', headerName: 'Name', width: 300, sortable: true, valueGetter: (params) => params.row['weapon_name'], // Use 'weapon_name' directly as the cell value
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
        },
        { field: 'attack', headerName: 'Attack', width: 150, sortable: true},
        { field: 'element', headerName: 'Element', width: 150, sortable: true},
        { field: 'element_val', headerName: 'Ele Val', width: 150, sortable: true},
        { field: 'deco_slots', headerName: 'Deco Slots', width: 150, sortable: true, renderCell: (params) => {
        const decoSlots = JSON.parse(params.value);

        return (
            <div>
                {decoSlots &&
                    decoSlots.map((decoration, index) => (
                        <span key={index}>
                          <img src={deco_imgs[decoration]} alt={decoration} />
                        </span>
                                    ))}
            </div>
                );
            },
        },
        { field: 'rampage_deco_slots', headerName: 'Rampage Deco Slots', width: 150, sortable: true, renderCell: (params) => {
                const rampagedecoSlots = JSON.parse(params.value);

                return (
                    <div>
                        {rampagedecoSlots &&
                            rampagedecoSlots.map((decoration, index) => (
                                <span key={index}>
                                  <img src={deco_imgs[decoration]} alt={decoration} />
                                </span>
                                    ))}
                    </div>
                );
            },
        },
        { field: 'rarity', headerName: 'Rarity', width: 150, sortable: true},
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
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster:', error);
            }
        };

        const fetchMonsterQuests = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/quests`);
                const data = await response.json();
                setMonsterQuests(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster quests:', error);
            }
        };

        const fetchMonsterHitzones = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/hitzones`);
                const data = await response.json();
                setMonsterHitzones(data);
                console.log(data);
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
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster upgrade weapons:', error);
            }
        };

        fetchMonster()
        fetchMonsterQuests()
        fetchMonsterHitzones()
        fetchMonsterDrops()
        fetchMonsterForgingWeapons()
        fetchMonsterUpgradeWeapons()
    }, [id]);

    if (!monster || !monsterquests || !monsterhitzones || !monsterdrops || !monsterupgradeweapons || !monsterforgingweapons) {
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


        console.log(visible)
        // console.log(visiblesection)
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
                                    image={monster.image_link}
                                    title={monster.name}
                                    style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }}
                                />
                            </Box>
                        </div>
                    </Grid>
                </Grid>

            </div>
            <div className="monster-quests">
                <Button onClick={() => handleVisibleChange("quests")}>
                    <h2>Monster Quests</h2>
                </Button>
                {visible === "quests" && (
                    <div className="monster-section monster-quests">
                        <Box sx={{ height: 400, width: '100%'}}>
                            <DataGrid
                                rows={monsterquests}
                                columns={questcolumns}
                                getRowId={(row) => row.id}
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
                                // getRowHeight={(params) => {
                                //     const defaultRowHeight = 100; // Set a default row height (adjust as needed)
                                //     const questNames = JSON.parse(params.model.quest_name);
                                //
                                //     // Calculate the height required for the list items in the cell
                                //     const listItemHeight = 30; // Assuming each list item has a height of 30px
                                //
                                //     // Calculate the total height needed for all list items
                                //     const totalHeight = questNames.length * listItemHeight;
                                //
                                //     // Return the greater of the total height or the default row height
                                //     return Math.max(defaultRowHeight, totalHeight);

                                // }}
                            />
                        </Box>
                    </div>
                )}
            </div>
            <div className="monster-hitzones" >
                <Button onClick={() => handleVisibleChange("hitzones")}>
                    <h2>Monster Hitzones</h2>
                </Button>
                {visible === "hitzones" && (
                    <div className="monster-section monster-hitzones">
                        <Box sx={{ height: 400, width: '100%'}}>
                            <DataGrid
                                rows={monsterhitzones}
                                columns={hitzonecolumns}
                                getRowId={(row) => row.hitzone}
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
                                // getRowHeight={(params) => {
                                //     const defaultRowHeight = 100; // Set a default row height (adjust as needed)
                                //     const questNames = JSON.parse(params.model.quest_name);
                                //
                                //     // Calculate the height required for the list items in the cell
                                //     const listItemHeight = 30; // Assuming each list item has a height of 30px
                                //
                                //     // Calculate the total height needed for all list items
                                //     const totalHeight = questNames.length * listItemHeight;
                                //
                                //     // Return the greater of the total height or the default row height
                                //     return Math.max(defaultRowHeight, totalHeight);

                                // }}
                            />
                        </Box>
                    </div>
                )}
            </div>
            <div className="monster-drops">
                <Button onClick={() => handleVisibleChange("drops")}>
                    <h2>Monster Drops</h2>
                </Button>
                {visible === "drops" && (
                    <div className="monster-section monster-drops">
                        <Box sx={{ height: 400, width: '100%'}}>
                            <DataGrid
                                rows={monsterdrops}
                                columns={dropscolumns}
                                getRowId={(row) => `${row["Item id"]}-${generateUniqueID()}`}
                                autoHeight
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
                                // getRowHeight={(params) => {
                                //     const defaultRowHeight = 100; // Set a default row height (adjust as needed)
                                //     const questNames = JSON.parse(params.model.quest_name);
                                //
                                //     // Calculate the height required for the list items in the cell
                                //     const listItemHeight = 30; // Assuming each list item has a height of 30px
                                //
                                //     // Calculate the total height needed for all list items
                                //     const totalHeight = questNames.length * listItemHeight;
                                //
                                //     // Return the greater of the total height or the default row height
                                //     return Math.max(defaultRowHeight, totalHeight);

                                // }}
                            />
                        </Box>
                    </div>
                    )}
            </div>
            <div className="monster-weapon-forging">
                <Button onClick={() => handleVisibleChange("forging")}>
                    <h2>Monster Forging Weapons</h2>
                </Button>
                {visible === "forging" && (
                    <div className="monster-section monster-weapon-forging">
                        <Box sx={{ height: 400, width: '100%'}}>
                            <DataGrid
                                rows={monsterforgingweapons}
                                columns={weaponcolumns}
                                getRowId={(row) => `${row.weapon_id}-${generateUniqueID()}`}
                                autoHeight
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
                                // getRowHeight={(params) => {
                                //     const defaultRowHeight = 100; // Set a default row height (adjust as needed)
                                //     const questNames = JSON.parse(params.model.quest_name);
                                //
                                //     // Calculate the height required for the list items in the cell
                                //     const listItemHeight = 30; // Assuming each list item has a height of 30px
                                //
                                //     // Calculate the total height needed for all list items
                                //     const totalHeight = questNames.length * listItemHeight;
                                //
                                //     // Return the greater of the total height or the default row height
                                //     return Math.max(defaultRowHeight, totalHeight);

                                // }}
                            />
                        </Box>
                    </div>
                    )}
            </div>
            <div className="monster-weapon-upgrade">
                <Button onClick={() => handleVisibleChange("upgrade")}>
                    <h2>Monster Upgrade Weapons</h2>
                </Button>
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
                                // getRowHeight={(params) => {
                                //     const defaultRowHeight = 100; // Set a default row height (adjust as needed)
                                //     const questNames = JSON.parse(params.model.quest_name);
                                //
                                //     // Calculate the height required for the list items in the cell
                                //     const listItemHeight = 30; // Assuming each list item has a height of 30px
                                //
                                //     // Calculate the total height needed for all list items
                                //     const totalHeight = questNames.length * listItemHeight;
                                //
                                //     // Return the greater of the total height or the default row height
                                //     return Math.max(defaultRowHeight, totalHeight);

                                // }}
                            />
                        </Box>
                    </div>
                    )}
            </div>
        </div>

    );
};