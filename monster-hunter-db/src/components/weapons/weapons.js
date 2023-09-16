import * as React from 'react';
import {useState, useEffect} from "react";
import { Grid,Box } from '@mui/material';
import {DataGrid} from "@mui/x-data-grid";
import ProgressBar from "react-bootstrap/ProgressBar";
import LinearProgress from '@mui/material/LinearProgress';
import SharpnessBar from "./SharpnessBar";
import {Link, useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import Fire from '../../assets/icons/Element_Fire_Icon.webp'
import Water from '../../assets/icons/Element_Water_Icon.webp'
import Ice from '../../assets/icons/Element_Ice_Icon.webp'
import Thunder from '../../assets/icons/Element_Thunder_Icon.webp'
import Dragon from '../../assets/icons/Element_Dragon_Icon.webp'
import Blast from '../../assets/icons/Element_Icon_Blast.png'
import Paralysis from '../../assets/icons/Element_Paralysis_Icon.png'
import Sleep from '../../assets/icons/Element_Icon_Sleep.png'
import Poison from '../../assets/icons/Element_Poison_Icon.png'
import { getWeaponArt } from './getWeaponArt';
import { useTheme } from "@mui/material";
import SwitchSkills from '../switch skillls/switchskills';
import { getControllerIcon } from '../getControllerIcon';
import reactStringReplace from 'react-string-replace';




export default function Weapons({id}) {
    const [weapons, setWeapons] = useState([])
    const [switchskills, setswitchskills] = useState([]);
    const { palette } = useTheme();
    console.log(id)
    
    const datagridSx = {
        '.centered-cell': { justifyContent: 'center' },
        "& .MuiDataGrid-main": { borderRadius: 2 },
        "& .MuiDataGrid-columnHeaders": {
        backgroundColor: palette.background.MuiDataGridcolumnHeaders,
        fontSize: 16
        },
        "& .MuiDataGrid-row": {
            backgroundColor: palette.background.MuiDataGridrow
        }
    };


    const deco_imgs = {
        "deco1": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco1.png",
        "deco2": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco2.png",
        "deco3": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco3.png",
        "deco4": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco4.png"
    }

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

    useEffect(() => {
        const fetchWeapons = async () => {
            try {
                setWeapons([])
                const response = await fetch(`${process.env.REACT_APP_react_url}/weapons/${id}/weapons`);
                const data = await response.json();
                setWeapons(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching weapons:', error);
            }
        };

        const fetchSwitckSkills = async (id) => {
            try {
                // setWeapons([])
                const response = await fetch(`${process.env.REACT_APP_react_url}/switch-skills/${id}/switch-skills`);
                const data = await response.json();
                setswitchskills(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching switch skills:', error);
            }
        };
        
        fetchWeapons();
        fetchSwitckSkills(id);
    }, [id]);
    // console.log(weapons);

    let columns = [
        { field: 'weapon_name', headerName: 'Name', flex:0.5, sortable: true, valueGetter: (params) => params.row['weapon_name'], // Use 'weapon_name' directly as the cell value
            renderCell: (params) => (
                <Link to={`/weapon/${params.row.id}`} style={{ textDecoration: 'none' }}>
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
                        {params.row.weapon_name}
                    </Box>
                </Link>
            ),
            cellClassName: 'centered-cell',
        },
        { field: 'attack', headerName: 'Attack', flex:0.4, sortable: true},
        { field: 'additional_property', headerName: 'Additional', flex:0.4, sortable: true, renderCell: (params) => {
            const text = params.row.additional_property;
            if (text === null) {
                return <div>{text}</div>; // Render null as is
            }
            const isPositive = text.includes('+');
            const isNegative = text.includes('-');
    
            const textStyle = {
                color: isPositive ? '#07fa3c' : isNegative ? '#f72f2f' : 'black',
                fontWeight: 'bold'
            };
    
            return (
                <div style={textStyle}>
                    {text}
                </div>
            );
        },
        },
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
        { field: 'rarity', headerName: 'Rarity', flex:0.3, sortable: true, type: "singleSelect",
        valueOptions: ["Rare 1", "Rare 2", "Rare 3", "Rare 4", "Rare 5", "Rare 6", "Rare 7", "Rare 8", "Rare 9", "Rare 10"]},
    ];

   
    // exclude element columns for lbg and hbg
    if (id !== 12 && id !== 13) {
        const elementColumn = {
            field: 'element', headerName: 'Element', flex:0.3, sortable: true, type: "singleSelect",
            valueOptions: ["Fire", "Water", "Ice", "Thunder", "Dragon", "Poison", "Paralysis", "Blast", "Sleep"],
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
                
            },
        };

        const elementvalColumn = {
            field: 'elementval', headerName: 'Ele Val', flex:0.3, sortable: true
        }
        // Insert the "Songs" column at index 2 (before the last column)
        columns.splice(3, 0, elementColumn);
        columns.splice(4, 0, elementvalColumn);
    }

    // exclude sharpness column for bow, lbg and hbg
    if (id !== 11 && id !== 12 && id !== 13){
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
        columns.splice(5, 0, sharpnessColumn);
    }

    // song column for hunting horn
    if (id === 5) {
        const songsColumn = {
            field: 'songs',
            headerName: 'Songs',
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                console.log(params)
                const songlist = JSON.parse(params.row.songs);
                console.log(songlist);

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
        columns.splice(8, 0, songsColumn);
    }

    // shelling column for gunlance
    if (id === 7) {
        const shellingColumn = {
            field: 'shelling_type',
            headerName: 'Shelling',
            flex: 0.5,
            sortable: false,
        };
        // Insert the "Songs" column at index 2 (before the last column)
        columns.splice(8, 0, shellingColumn);
    }

    // phial column for switch axe and charge blade
    if (id === 8 || id === 9) {
        const phialColumn = {
            field: 'phial_type',
            headerName: 'Phial',
            flex: 1,
            sortable: false,
        };
        // Insert the "Songs" column at index 2 (before the last column)
        columns.splice(8, 0, phialColumn);
    }

    // kinsect level column for insect glaive
    if (id === 10) {
        const kinsectColumn = {
            field: 'kinsect_lvl',
            headerName: 'Kinsect Lvl',
            flex: 1,
            sortable: false,
        };
        // Insert the "Songs" column at index 2 (before the last column)
        columns.splice(8, 0, kinsectColumn);
    }

    // bow arc shot type, coatings
    if (id === 11) {
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
                    const chargeshotlist = JSON.parse(params.row.charge_shot_levels);

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
                const coatingslist = JSON.parse(params.row.coatings);

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
        columns.splice(7, 0, arcshottypeColumn);
        columns.splice(8, 0, chargeshotlevelsColumn);
        columns.splice(9, 0, coatingsColumn);
    }

    // ammo details, etc for bowguns
    if (id === 12 || id == 13) {
        const bowgunstatsColumn = {
            field: 'bowgun_stats',
            headerName: 'Stats',
            flex: 0.5,
            sortable: true,
            renderCell: (params) => {
                const statslist = JSON.parse(params.row.bowgun_stats);
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
                const ammolist = JSON.parse(params.row.ammo);
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
        columns.splice(5, 0, bowgunstatsColumn);
        columns.splice(6, 0, ammoColumn);
    }

    

  
    return (
        <div>
            <div className="weapon_art" style={{marginBottom: 20}}>
                <Grid container spacing={2} alignItems="stretch">
                        <Grid item xs={12} sm={6}>
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
                                    alt=""
                                    src={getWeaponArt(id)[0]}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
                                        alt=""
                                        src={getWeaponArt(id)[1]}
                                    />
                            </div>
                        </Grid>
                </Grid>
            </div>
            {switchskills.length > 0 ? (
                <div className="switch-skills">
                    <h2 style={{textAlign: 'center', textDecoration: 'underline' ,fontSize: 30}}>Switch Skills</h2>
                    <ul style={{listStyle: 'none'}}>
                        {switchskills.map((skills) => (
                        <li key={skills.id}>
                            <span style={{textDecoration: 'underline'}}>{skills.switch_skill_name}</span>
                            
                            <br />
                            {reactStringReplace(skills.switch_skill_description, /<([^>]+)>/g, (match, i) => (
                            // Use group (the text inside the angle brackets) to create an image element
                            <img
                                src={getControllerIcon(match)} // Use match to determine the image path
                                alt={`${match}`}
                                // Add any other attributes you need for the image
                                key={i} // Add a unique key for each image element
                                style={{width: 30, height: 30}}
                            />
                            ))}
                        </li>
                        ))}
                    </ul>
                </div>) : (
                    <div>Loading switch skill data...</div>
            )}

            {weapons.length > 0 ? (
                <div>
                    <Box sx={{ height: 400, width: '100%'}}>
                        <DataGrid
                            rows={weapons}
                            columns={columns}
                            getRowId={(row) => row.id}
                            autoHeight
                            sx={datagridSx}
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
            ) : (
                <div>Loading weapons data...</div>
            )}
        </div>
    );
}