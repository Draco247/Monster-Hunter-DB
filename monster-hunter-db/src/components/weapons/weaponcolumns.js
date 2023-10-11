import {useState, useEffect, useRef} from "react";
import { Grid,Box } from '@mui/material';
import { getQuestIcon } from '../quests/getQuestIcon';
import {DataGrid,GridToolbar} from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import { getWeaponIcon } from '../weapons/getWeaponIcon';
import Fire from '../../assets/icons/Element_Fire_Icon.webp'
import Water from '../../assets/icons/Element_Water_Icon.webp'
import Ice from '../../assets/icons/Element_Ice_Icon.webp'
import Thunder from '../../assets/icons/Element_Thunder_Icon.webp'
import Dragon from '../../assets/icons/Element_Dragon_Icon.webp'
import Blast from '../../assets/icons/Element_Icon_Blast.png'
import Paralysis from '../../assets/icons/Element_Paralysis_Icon.png'
import Sleep from '../../assets/icons/Element_Icon_Sleep.png'
import Poison from '../../assets/icons/Element_Poison_Icon.png'
import SharpnessBar from "./SharpnessBar";
import {Link, useNavigate} from "react-router-dom";



export function WeaponColumns({weapons, id}) {
    const { palette } = useTheme();
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


    const generateUniqueID = () => {
        return uuidv4(); // Generates a random UUID (unique identifier)
    };

    //  useEffect(() => {
       
    //     if (screenWidth < 960) {
    //         // If screen width is less than 960px, show only 'quest_name' and 'objective' columns
    //             setWeaponColumns([
    //             { field: 'weapon_name', headerName: 'Name', flex:0.2, sortable: true, valueGetter: (params) => params.row['weapon_name'], // Use 'weapon_name' directly as the cell value
    //                 renderCell: (params) => (
    //                     <Box
    //                         sx={{
    //                             display: 'flex',
    //                             flexDirection: 'column',
    //                             alignItems: 'center',
    //                             gap: '5px',
    //                         }}
    //                     >
    //                         <Box
    //                             component="img"
    //                             sx={{
    //                                 height: 100,
    //                                 width: 100,
    //                                 border: '2px solid black',
    //                             }}
    //                             alt=""
    //                             src={params.row['weapon_img_url']}
    //                         />
    //                         <a href={`/weapon/${params.row.weapon_id}`}>{params.row.weapon_name}</a>
    //                     </Box>
    //                 ),
    //                 cellClassName: 'centered-cell',
    //             },
    //             {
    //                 field: 'weapon_type_name',
    //                 headerName: '',
    //                 flex: 0.1,
    //                 sortable: true,
    //                 // type: "singleSelect",
    //                 // valueOptions: ["sns"],
    //                 renderCell: (params) =>
    //                     <Box
    //                         component="img"
    //                         sx={{
    //                             height: 40,
    //                             width: 40,
    //                             marginRight: '8px',
    //                         }}
    //                         alt={params.row['weapon_type_name']}
    //                         src={getWeaponIcon(params.row['weapon_type_name'])}
    //                     />
    //             },
    //             { field: 'attack', headerName: 'Attack', flex:0.1, sortable: true},
    //             { field: 'element', headerName: 'Element', flex:0.1, sortable: true,
    //             renderCell: (params) => {
    //                 // console.log(params.row.element)
    //                 const elementIconSrc = elementIcons[params.row.element];
    //                 // console.log(elementIconSrc);
    //                 return (
    //                     elementIconSrc && (
    //                         <div>
    //                             <img
    //                                 src={elementIconSrc}
    //                                 alt={params.row.element}
    //                                 style={{ width: '40px', height: '40px' }}
    //                             />
    //                         </div>
    //                     )
    //                 );
                    
    //             },},
    //             { field: 'element_val', headerName: 'Ele Val', flex:0.1, sortable: true},
    //         ]);
    //     }
    
        
    // }, [screenWidth]);
    
    const datagridSx = {
        border: palette.borderColour.MUIDataGrid,
        borderRadius: '5px',
        '.centered-cell': { justifyContent: 'center' },
        "& .MuiDataGrid-columnHeaders": {
        backgroundColor: palette.background.MuiDataGridcolumnHeaders,
        fontSize: 16
        },
        "& .MuiDataGrid-row": {
            backgroundColor: palette.background.MuiDataGridrow,
            transition: 'background-color 0.3s ease',
        },
        '& .MuiDataGrid-row:hover': {
            backgroundColor: palette.background.MuiDataGridrow
        },
        
    };

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

    const deco_imgs = {
        "deco1": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco1.png",
        "deco2": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco2.png",
        "deco3": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco3.png",
        "deco4": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco4.png"
    }
    
    return (
        // <p>egeg</p>
        // <Box>
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
        // </Box>
    );
    }