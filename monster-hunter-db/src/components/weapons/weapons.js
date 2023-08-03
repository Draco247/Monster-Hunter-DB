import * as React from 'react';
import {useState, useEffect} from "react";
import { Grid,Box } from '@mui/material';
import {DataGrid} from "@mui/x-data-grid";
import ProgressBar from "react-bootstrap/ProgressBar";
import LinearProgress from '@mui/material/LinearProgress';
import SharpnessBar from "../SharpnessBar";


export default function Weapons(weaponType) {
    const [weapons, setWeapons] = useState([])
    console.log(weaponType)

    const deco_imgs = {
        "deco1": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco1.png",
        "deco2": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco2.png",
        "deco3": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco3.png",
        "deco4": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco4.png"
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_react_url}/weapons/${weaponType.weaponType}/weapons`)
            .then(res => res.json())
            .then((result)=> {
                setWeapons(result);
                console.log(result);
            })}, []);
    console.log(weapons);

    const columns = [
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
                    <a href={`/weapons/${params.row.id}/weapons`}>{params.row.weapon_name}</a>
                </Box>
            ),
            cellClassName: 'centered-cell',
        },
        { field: 'attack', headerName: 'Attack', flex:0.1, sortable: true},
        { field: 'element', headerName: 'Element', flex:0.3, sortable: true},
        { field: 'elementval', headerName: 'Ele Val', flex:0.5, sortable: true},
        { field: 'base_sharpness', headerName: 'Sharpness', flex:0.5, sortable: true,
            renderCell: (params) => {
                const sharpness = JSON.parse(params.row.base_sharpness);

                return (
                    <Box
                        sx={{
                            width: '100%',
                            border: '2px solid black',
                        }}
                    >
                        <SharpnessBar sharpness={sharpness} />
                    </Box>

                );
            },
        },
        { field: 'deco_slots', headerName: 'Deco Slots', flex:0.5, sortable: true, renderCell: (params) => {
                console.log(params);
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
                                    {/*<img src={deco_imgs[decoration]} alt={decoration} />*/}
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
                                    {/*<img src={deco_imgs[decoration]} alt={decoration} />*/}
                                </span>
                            ))}
                    </div>
                );
            },
        },
        { field: 'rarity', headerName: 'Rarity', flex:0.3, sortable: true},
    ];
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