import * as React from 'react';
import {useState, useEffect} from "react";
import { Grid,Box } from '@mui/material';
import {DataGrid} from "@mui/x-data-grid";
import ProgressBar from "react-bootstrap/ProgressBar";
import LinearProgress from '@mui/material/LinearProgress';
import SharpnessBar from "../SharpnessBar";
import {Link, useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';


export default function Weapons(weaponType) {
    const [weapons, setWeapons] = useState([])
    const navigate = useNavigate();
    console.log(weaponType)
    const id = useSelector(state => state.id);

    const deco_imgs = {
        "deco1": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco1.png",
        "deco2": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco2.png",
        "deco3": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco3.png",
        "deco4": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco4.png"
    }

    useEffect(() => {
        // fetch(`${process.env.REACT_APP_react_url}/weapons/${weaponType.weaponType}/weapons`)
        //     .then(res => res.json())
        //     .then((result)=> {
        //         setWeapons(result);
        //         console.log(result);
        //     })}, []);
        setWeapons([])
        fetch(`${process.env.REACT_APP_react_url}/weapons/${id}/weapons`)
            .then(res => res.json())
            .then((result)=> {
                setWeapons(result);
                console.log(result);
            })}, [id]);
    console.log(weapons);

    let columns = [
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
                    <Link to={`/weapon/${params.row.id}`}>
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
        { field: 'rarity', headerName: 'Rarity', flex:0.3, sortable: true, type: "singleSelect",
        valueOptions: ["Rare 1", "Rare 2", "Rare 3", "Rare 4", "Rare 5", "Rare 6", "Rare 7", "Rare 8", "Rare 9", "Rare 10"]},
    ];


    // if (weaponType.weaponType !== "12" && weaponType.weaponType !== "13") {
    //     const elementColumn = {
    //         field: 'element', headerName: 'Element', flex:0.3, sortable: true
    //     };

    //     const elementvalColumn = {
    //         field: 'elementval', headerName: 'Ele Val', flex:0.3, sortable: true
    //     }
    //     // Insert the "Songs" column at index 2 (before the last column)
    //     columns.splice(3, 0, elementColumn);
    //     columns.splice(4, 0, elementvalColumn);
    // }
    if (id !== "12" && id !== "13") {
        const elementColumn = {
            field: 'element', headerName: 'Element', flex:0.3, sortable: true, type: "singleSelect",
            valueOptions: ["Fire", "Water", "Ice", "Thunder", "Dragon", "Poison", "Paralysis", "Blast", "Sleep"]
        };

        const elementvalColumn = {
            field: 'elementval', headerName: 'Ele Val', flex:0.3, sortable: true
        }
        // Insert the "Songs" column at index 2 (before the last column)
        columns.splice(3, 0, elementColumn);
        columns.splice(4, 0, elementvalColumn);
    }

    if (id !== "11" && id !== "12" && id !== "13"){
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

    if (id === "5") {
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
        columns.splice(8, 0, songsColumn);
    }

    if (id === "7") {
        const shellingColumn = {
            field: 'shelling_type',
            headerName: 'Shelling',
            flex: 0.5,
            sortable: false,
        };
        // Insert the "Songs" column at index 2 (before the last column)
        columns.splice(8, 0, shellingColumn);
    }

    if (id === "8" || id === "9") {
        const phialColumn = {
            field: 'phial_type',
            headerName: 'Phial',
            flex: 1,
            sortable: false,
        };
        // Insert the "Songs" column at index 2 (before the last column)
        columns.splice(8, 0, phialColumn);
    }

    if (id === "10") {
        const kinsectColumn = {
            field: 'kinsect_lvl',
            headerName: 'Kinsect Lvl',
            flex: 1,
            sortable: false,
        };
        // Insert the "Songs" column at index 2 (before the last column)
        columns.splice(8, 0, kinsectColumn);
    }

    if (id === "11") {
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
        columns.splice(7, 0, arcshottypeColumn);
        columns.splice(8, 0, chargeshotlevelsColumn);
        columns.splice(9, 0, coatingsColumn);
    }

    if (id === "12" && id !== "13") {
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
        columns.splice(5, 0, bowgunstatsColumn);
        columns.splice(6, 0, ammoColumn);
    }

    // if (weaponType.weaponType !== "11" && weaponType.weaponType !== "12" && weaponType.weaponType !== "13"){
    //     const sharpnessColumn = {
    //         field: 'base_sharpness', headerName: 'Sharpness', flex:0.5, sortable: true,
    //         renderCell: (params) => {
    //             const sharpness = JSON.parse(params.row.base_sharpness);
    //             const max_sharpness = JSON.parse(params.row.max_sharpness);

    //             return (
    //                 <Box
    //                     sx={{
    //                         width: '100%',
    //                     }}
    //                 >
    //                     <Grid container spacing={2}>
    //                         <Grid item xs={12}>
    //                             <SharpnessBar sharpness={sharpness} />
    //                         </Grid>
    //                         <Grid item xs={12}>
    //                             <SharpnessBar sharpness={max_sharpness} />
    //                         </Grid>
    //                     </Grid>
    //                 </Box>

    //             );
    //         },
    //     };
    //     columns.splice(5, 0, sharpnessColumn);
    // }

    // if (weaponType.weaponType === "5") {
    //     const songsColumn = {
    //         field: 'songs',
    //         headerName: 'Songs',
    //         flex: 1,
    //         sortable: false,
    //         renderCell: (params) => {
    //             const songlist = JSON.parse(params.value);

    //             return (
    //                 <div style={{ maxHeight: 100, overflowY: 'auto' }}>
    //                     <ul style={{ margin: 0, paddingInlineStart: 20, whiteSpace: 'normal', listStyle: 'none' }}>
    //                         {songlist.map((level, index) => (
    //                             <li key={index}>{level}</li>
    //                         ))}
    //                     </ul>
    //                 </div>
    //             );
    //         },
    //     };
    //     // Insert the "Songs" column at index 2 (before the last column)
    //     columns.splice(8, 0, songsColumn);
    // }

    // if (weaponType.weaponType === "7") {
    //     const shellingColumn = {
    //         field: 'shelling_type',
    //         headerName: 'Shelling',
    //         flex: 0.5,
    //         sortable: false,
    //     };
    //     // Insert the "Songs" column at index 2 (before the last column)
    //     columns.splice(8, 0, shellingColumn);
    // }

    // if (weaponType.weaponType === "8" || weaponType.weaponType === "9") {
    //     const phialColumn = {
    //         field: 'phial_type',
    //         headerName: 'Phial',
    //         flex: 1,
    //         sortable: false,
    //     };
    //     // Insert the "Songs" column at index 2 (before the last column)
    //     columns.splice(8, 0, phialColumn);
    // }

    // if (weaponType.weaponType === "10") {
    //     const kinsectColumn = {
    //         field: 'kinsect_lvl',
    //         headerName: 'Kinsect Lvl',
    //         flex: 1,
    //         sortable: false,
    //     };
    //     // Insert the "Songs" column at index 2 (before the last column)
    //     columns.splice(8, 0, kinsectColumn);
    // }

    // if (weaponType.weaponType === "11") {
    //     const arcshottypeColumn = {
    //         field: 'arc_shot_type',
    //         headerName: 'Arc Shot Type',
    //         flex: 0.5,
    //         sortable: true,
    //     }

    //     const chargeshotlevelsColumn = {
    //             field: 'charge_shot_levels',
    //             headerName: 'Charge Shot Levels',
    //             flex: 0.5,
    //             sortable: true,
    //             renderCell: (params) => {
    //                 const chargeshotlist = JSON.parse(params.value);

    //                 return (
    //                     <div style={{ maxHeight: 100, overflowY: 'auto' }}>
    //                         <ul style={{ margin: 0, paddingInlineStart: 20, whiteSpace: 'normal', listStyle: 'none' }}>
    //                             {chargeshotlist.map((level, index) => (
    //                                 <li key={index}>{level}</li>
    //                             ))}
    //                         </ul>
    //                     </div>
    //                 );
    //             },
    //         }

    //     const coatingsColumn = {
    //         field: 'coatings',
    //         headerName: 'Coatings',
    //         flex: 0.5,
    //         sortable: true,
    //         renderCell: (params) => {
    //             const coatingslist = JSON.parse(params.value);

    //             return (
    //                 <div style={{ maxHeight: 100, overflowY: 'auto' }}>
    //                     <ul style={{ margin: 0, paddingInlineStart: 20, whiteSpace: 'normal', listStyle: 'none' }}>
    //                         {coatingslist.map((level, index) => (
    //                             <li key={index}>{level}</li>
    //                         ))}
    //                     </ul>
    //                 </div>
    //             );
    //         },
    //     }

    //     // Insert the "Songs" column at index 2 (before the last column)
    //     columns.splice(7, 0, arcshottypeColumn);
    //     columns.splice(8, 0, chargeshotlevelsColumn);
    //     columns.splice(9, 0, coatingsColumn);
    // }

    // if (weaponType.weaponType === "12" && weaponType.weaponType!== "13") {
    //     const bowgunstatsColumn = {
    //         field: 'bowgun_stats',
    //         headerName: 'Stats',
    //         flex: 0.5,
    //         sortable: true,
    //         renderCell: (params) => {
    //             const statslist = JSON.parse(params.value);
    //             console.log(statslist);

    //             return (
    //                 <div style={{ maxHeight: 100, overflowY: 'auto' }}>
    //                     <ul style={{ margin: 0, paddingInlineStart: 20, whiteSpace: 'normal', listStyle: 'none' }}>
    //                         {statslist.map((stat, index) => (
    //                             <li key={index}>{Object.entries(stat)[0].join(': ')}</li>
    //                         ))}
    //                     </ul>
    //                 </div>
    //             );
    //         },
    //     }

    //     const ammoColumn = {
    //         field: 'ammo',
    //         headerName: 'Ammo',
    //         flex: 1,
    //         sortable: true,
    //         renderCell: (params) => {
    //             console.log(params.value);
    //             const ammolist = JSON.parse(params.value);
    //             console.log(ammolist);

    //             const chunkArray = (array, chunkSize) => {
    //                 const chunks = [];
    //                 for (let i = 0; i < array.length; i += chunkSize) {
    //                     chunks.push(array.slice(i, i + chunkSize));
    //                 }
    //                 return chunks;
    //             };

    //             // Split the ammolist into chunks of 5 entries each
    //             const ammoChunks = chunkArray(ammolist, 4);

    //             return (
    //                 <div style={{ display: 'flex', overflowX: 'auto' }}>
    //                     {ammoChunks.map((chunk, chunkIndex) => (
    //                         <div
    //                             key={chunkIndex}
    //                             style={{
    //                                 width: '200px', // Set a fixed width for each list container
    //                                 marginRight: '10px', // Adjust the margin-right to set the desired spacing between lists
    //                             }}
    //                         >
    //                             <ul style={{ margin: 0, paddingInlineStart: 20, whiteSpace: 'normal', listStyle: 'none' }}>
    //                                 {chunk.map((ammo, index) => (
    //                                     <li key={index}>{Object.entries(ammo)[0].join(': ')}</li>
    //                                 ))}
    //                             </ul>
    //                         </div>
    //                     ))}
    //                 </div>
    //             );
    //         },
    //     }

    //     // Insert the "Songs" column at index 2 (before the last column)
    //     columns.splice(5, 0, bowgunstatsColumn);
    //     columns.splice(6, 0, ammoColumn);
    // }


    return (
        <Box sx={{ height: 400, width: '100%'}}>
            <DataGrid
                rows={weapons}
                columns={columns}
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
    );
}