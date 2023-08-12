import * as React from 'react';
import './weapon.css'
import {useState, useEffect} from "react";
import CardMedia from '@mui/material/CardMedia';
import { Grid,Box } from '@mui/material';
import {Link, useParams} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SharpnessBar from "../SharpnessBar";
import {DataGrid} from "@mui/x-data-grid";
import {v4 as uuidv4} from "uuid";
import {useLocation} from "react-router-dom";


export default function Weapon() {
    const { id } = useParams();
    console.log(id);
    const [weapon, setWeapon] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);

    const deco_imgs = {
        "deco1": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco1.png",
        "deco2": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco2.png",
        "deco3": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco3.png",
        "deco4": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco4.png"
    }


    const imageStyle = {
        border: '2px solid black',
        borderRadius: '10%', // Make the border curved
        backgroundColor: 'black',
        height: '50%',
        width: '50%'
    };

    useEffect(() => {
        const fetchWeapon = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/weapons/${id}/weapon`);
                const data = await response.json();
                setWeapon(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching weapon:', error);
            }
        };

        fetchWeapon();
    }, [id]);


    if (!weapon) {
        return <div>Loading...</div>;
    }

    const forge = JSON.parse(weapon.forging_mats);
    console.log(forge);

    const upgrades = JSON.parse(weapon.upgrade_mats);
    console.log(upgrades);

    const itemcolumns = [
        { field: 'Item Name', headerName: 'Item', flex: 0.6, sortable: true,
            renderCell: (params) => {
                return (
                    <Link to={`/items/${params.row["Item ID"]}`}>{params.value}</Link>
                );
            },},
        { field: 'Quantity', headerName: 'Quantity', flex: 1 },
    ];

    const generateUniqueID = () => {
        return uuidv4(); // Generates a random UUID (unique identifier)
    };

    const sharpness = JSON.parse(weapon.base_sharpness);
    const max_sharpness = JSON.parse(weapon.max_sharpness);


    let weaponcolumns = [
        { field: 'weapon_name', headerName: 'Name', flex:0.5, sortable: true, valueGetter: (params) => params.row['weapon_name'], // Use 'weapon_name' directly as the cell value
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
                    <Link to={`/weapons/${params.row.id}/weapons`}>
                        {params.row.weapon_name}
                    </Link>
                </Box>
            ),
            cellClassName: 'centered-cell',
        },
        { field: 'attack', headerName: 'Attack', flex:0.1, sortable: true},
        { field: 'additional_property', headerName: 'Additional', flex:0.5, sortable: true},
        { field: 'deco_slots', headerName: 'Deco Slots', flex:0.5, sortable: true, renderCell: (params) => {
                // console.log(params);
                const decoSlots = JSON.parse(params.row.decoSlots);

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
                        </span>
                            ))}
                    </div>
                );
            },
        },
        { field: 'rampage_deco_slots', headerName: 'Rampage Deco Slots', flex:0.5, sortable: true, renderCell: (params) => {
                const rampagedecoSlots = JSON.parse(params.row.rampagedecoSlots);

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
                                </span>
                            ))}
                    </div>
                );
            },
        },
        { field: 'rarity', headerName: 'Rarity', flex:0.3, sortable: true},
    ];


    if (weapon.weapontypeid !== 12 && weapon.weapontypeid !== 13) {
        const elementColumn = {
            field: 'element', headerName: 'Element', flex:0.3, sortable: true
        };

        const elementvalColumn = {
            field: 'elementval', headerName: 'Ele Val', flex:0.3, sortable: true
        }
        // Insert the "Songs" column at index 2 (before the last column)
        weaponcolumns.splice(3, 0, elementColumn);
        weaponcolumns.splice(4, 0, elementvalColumn);
    }

    if (weapon.weapontypeid !== 11 && weapon.weapontypeid !== 12 && weapon.weapontypeid !== 13){
        const sharpnessColumn = {
            field: 'base_sharpness', headerName: 'Sharpness', flex:0.5, sortable: true,
            renderCell: (params) => {
                const sharpness = JSON.parse(params.row.base_sharpness);
                const max_sharpness = JSON.parse(params.row.max_sharpness);

                return (
                    <Box
                        sx={{
                            width: '100%',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <SharpnessBar sharpness={sharpness} />
                            </Grid>
                            <Grid item xs={12}>
                                <SharpnessBar sharpness={max_sharpness} />
                            </Grid>
                        </Grid>
                    </Box>

                );
            },
        };
        weaponcolumns.splice(5, 0, sharpnessColumn);
    }

    if (weapon.weapontypeid === 5) {
        const songsColumn = {
            field: 'songs',
            headerName: 'Songs',
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                const songlist = JSON.parse(params.value);

                return (
                    <div style={{ maxHeight: 100, overflowY: 'auto' }}>
                        <ul style={{ margin: 0, paddingInlineStart: 20, whiteSpace: 'normal', listStyle: 'none' }}>
                            {songlist.map((level, index) => (
                                <li key={index}>{level}</li>
                            ))}
                        </ul>
                    </div>
                );
            },
        };
        // Insert the "Songs" column at index 2 (before the last column)
        weaponcolumns.splice(8, 0, songsColumn);
    }

    if (weapon.weapontypeid === 7) {
        const shellingColumn = {
            field: 'shelling_type',
            headerName: 'Shelling',
            flex: 0.5,
            sortable: false,
        };
        // Insert the "Songs" column at index 2 (before the last column)
        weaponcolumns.splice(8, 0, shellingColumn);
    }

    if (weapon.weapontypeid === 8 || weapon.weapontypeid === 9) {
        const phialColumn = {
            field: 'phial_type',
            headerName: 'Phial',
            flex: 1,
            sortable: false,
        };
        // Insert the "Songs" column at index 2 (before the last column)
        weaponcolumns.splice(8, 0, phialColumn);
    }

    if (weapon.weapontypeid === 10) {
        const kinsectColumn = {
            field: 'kinsect_lvl',
            headerName: 'Kinsect Lvl',
            flex: 1,
            sortable: false,
        };
        // Insert the "Songs" column at index 2 (before the last column)
        weaponcolumns.splice(8, 0, kinsectColumn);
    }

    if (weapon.weapontypeid === 11) {
        const arcshottypeColumn = {
            field: 'arc_shot_type',
            headerName: 'Arc Shot Type',
            flex: 0.5,
            sortable: true,
        }

        const chargeshotlevelsColumn = {
            field: 'charge_shot_levels',
            headerName: 'Charge Shot Levels',
            flex: 0.5,
            sortable: true,
            renderCell: (params) => {
                const chargeshotlist = JSON.parse(params.value);

                return (
                    <div style={{ maxHeight: 100, overflowY: 'auto' }}>
                        <ul style={{ margin: 0, paddingInlineStart: 20, whiteSpace: 'normal', listStyle: 'none' }}>
                            {chargeshotlist.map((level, index) => (
                                <li key={index}>{level}</li>
                            ))}
                        </ul>
                    </div>
                );
            },
        }

        const coatingsColumn = {
            field: 'coatings',
            headerName: 'Coatings',
            flex: 0.5,
            sortable: true,
            renderCell: (params) => {
                const coatingslist = JSON.parse(params.value);

                return (
                    <div style={{ maxHeight: 100, overflowY: 'auto' }}>
                        <ul style={{ margin: 0, paddingInlineStart: 20, whiteSpace: 'normal', listStyle: 'none' }}>
                            {coatingslist.map((level, index) => (
                                <li key={index}>{level}</li>
                            ))}
                        </ul>
                    </div>
                );
            },
        }

        // Insert the "Songs" column at index 2 (before the last column)
        weaponcolumns.splice(7, 0, arcshottypeColumn);
        weaponcolumns.splice(8, 0, chargeshotlevelsColumn);
        weaponcolumns.splice(9, 0, coatingsColumn);
    }

    if (weapon.weapontypeid === 12 && weapon.weapontypeid !== 13) {
        const bowgunstatsColumn = {
            field: 'bowgun_stats',
            headerName: 'Stats',
            flex: 0.5,
            sortable: true,
            renderCell: (params) => {
                const statslist = JSON.parse(params.value);
                console.log(statslist);

                return (
                    <div style={{ maxHeight: 100, overflowY: 'auto' }}>
                        <ul style={{ margin: 0, paddingInlineStart: 20, whiteSpace: 'normal', listStyle: 'none' }}>
                            {statslist.map((stat, index) => (
                                <li key={index}>{Object.entries(stat)[0].join(': ')}</li>
                            ))}
                        </ul>
                    </div>
                );
            },
        }

        const ammoColumn = {
            field: 'ammo',
            headerName: 'Ammo',
            flex: 1,
            sortable: true,
            renderCell: (params) => {
                console.log(params.value);
                const ammolist = JSON.parse(params.value);
                console.log(ammolist);

                const chunkArray = (array, chunkSize) => {
                    const chunks = [];
                    for (let i = 0; i < array.length; i += chunkSize) {
                        chunks.push(array.slice(i, i + chunkSize));
                    }
                    return chunks;
                };

                // Split the ammolist into chunks of 5 entries each
                const ammoChunks = chunkArray(ammolist, 4);

                return (
                    <div style={{ display: 'flex', overflowX: 'auto' }}>
                        {ammoChunks.map((chunk, chunkIndex) => (
                            <div
                                key={chunkIndex}
                                style={{
                                    width: '200px', // Set a fixed width for each list container
                                    marginRight: '10px', // Adjust the margin-right to set the desired spacing between lists
                                }}
                            >
                                <ul style={{ margin: 0, paddingInlineStart: 20, whiteSpace: 'normal', listStyle: 'none' }}>
                                    {chunk.map((ammo, index) => (
                                        <li key={index}>{Object.entries(ammo)[0].join(': ')}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
            },
        }

        // Insert the "Songs" column at index 2 (before the last column)
        weaponcolumns.splice(5, 0, bowgunstatsColumn);
        weaponcolumns.splice(6, 0, ammoColumn);
    }


    console.log(weaponcolumns);

    return (
        <div>
            <div className="weapon-details" style={{textAlign: 'center'}}>
                <h1>{weapon.weapon_name}</h1>
                <Box m={2} display="flex" justifyContent="center" alignItems="center">
                    <CardMedia
                        component="img"
                        image={weapon.detailed_img}
                        title={weapon.weapon_name}
                        style={imageStyle}
                    />
                </Box>
                <p>{weapon.weapon_description}</p>
            <div className="weapon-stats" style={{ marginTop: '100px' }}>
                <Box sx={{ height: 400, width: '100%'}}>
                    <DataGrid
                        rows={[weapon]}
                        columns={weaponcolumns}
                        getRowId={(row) => row.id}
                        autoHeight
                        sx={{ '.centered-cell': { justifyContent: 'center' } }} // Add this line to center the cell content
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

            </div>
            <div>
                <Box sx={{ height: 400, width: '100%'}}>
                    <DataGrid
                        rows={forge}
                        columns={itemcolumns}
                        autoHeight
                        getRowId={(row) => `${row.id}-${generateUniqueID()}`}
                        // disableColumnMenu
                        pageSize={5}
                        checkboxSelection
                        disableRowSelectionOnClick
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'skill_name', sort: 'asc' }],
                            },
                        }}
                        getRowHeight={() => 'auto'}
                    />
                </Box>
                {/*<MUIDataTable title={"Forging Items"} data={forgetableData} columns={columns} options={options} />*/}
            </div>
            <div>
                <Box sx={{ height: 400, width: '100%'}}>
                    <DataGrid
                        rows={upgrades}
                        columns={itemcolumns}
                        autoHeight
                        getRowId={(row) => `${row.id}-${generateUniqueID()}`}
                        // disableColumnMenu
                        pageSize={5}
                        checkboxSelection
                        disableRowSelectionOnClick
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'skill_name', sort: 'asc' }],
                            },
                        }}
                        getRowHeight={() => 'auto'}
                    />
                </Box>
                {/*<MUIDataTable title={"Upgrade Items"} data={upgradetableData} columns={columns} options={options} />*/}
            </div>
        </div>

    );
};