import {useState, useEffect, useRef} from "react";
import { Box } from '@mui/material';
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



export function WeaponColumns({monsterweapons, screenWidth}) {
    const { palette } = useTheme();
    const [weaponcolumns, setWeaponColumns] = useState([
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
    ]);

    const generateUniqueID = () => {
        return uuidv4(); // Generates a random UUID (unique identifier)
    };

     useEffect(() => {
       
        if (screenWidth < 960) {
            // If screen width is less than 960px, show only 'quest_name' and 'objective' columns
                setWeaponColumns([
                { field: 'weapon_name', headerName: 'Name', flex:0.2, sortable: true, valueGetter: (params) => params.row['weapon_name'], // Use 'weapon_name' directly as the cell value
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
                { field: 'element', headerName: 'Element', flex:0.1, sortable: true,
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
            ]);
        }
    
        
    }, [screenWidth]);
    
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
                rows={monsterweapons}
                columns={weaponcolumns}
                getRowId={(row) => `${row.weapon_id}-${generateUniqueID()}`}
                autoHeight
                // slots={{ toolbar: GridToolbar }}
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
        // </Box>
    );
    }