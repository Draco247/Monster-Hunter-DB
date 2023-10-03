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
import Blade from '../../assets/icons/GS.png'
import Blunt from '../../assets/icons/HAM.png'
import Gunner from '../../assets/icons/LBG.png'
import { getArmourIcon } from '../armour/getArmourIcon';



export function HitzoneColumns({monsterhitzones, screenWidth}) {
    const { palette } = useTheme();
    const [hitzonecolumns, setHitzoneColumns] = useState([
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
    ]);

    const generateUniqueID = () => {
        return uuidv4(); // Generates a random UUID (unique identifier)
    };

     useEffect(() => {
       
        if (screenWidth < 960) {
            // If screen width is less than 960px, show only 'quest_name' and 'objective' columns
                setHitzoneColumns([
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
                rows={monsterhitzones}
                columns={hitzonecolumns}
                getRowId={(row) => `${row.hitzone}-${generateUniqueID()}`}
                autoHeight
                // slots={{ toolbar: GridToolbar }}
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
        // </Box>
        );
    }