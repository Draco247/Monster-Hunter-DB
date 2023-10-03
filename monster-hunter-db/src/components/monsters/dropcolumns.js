import {useState, useEffect, useRef} from "react";
import { Box } from '@mui/material';
import { getQuestIcon } from '../quests/getQuestIcon';
import {DataGrid,GridToolbar} from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';



export function DropColumns({monsterdrops, screenWidth}) {
    const { palette } = useTheme();
    const [dropscolumns, setDropsColumns] = useState([
        { field: 'Item', headerName: 'Item', flex:1, sortable: true, valueGetter: (params) => params.row['Item'], // Use 'Item' directly as the cell value
            renderCell: (params) => (
                <a href={`/item/${params.row['Item id']}`}>{params.row['Item']}</a>
            )},
        { field: 'Drop Area', headerName: 'Area', flex:1, sortable: true},
        { field: 'Drop Method', headerName: 'Method', flex:1, sortable: true},
        { field: 'Drop Rate', headerName: 'Rate', flex:1, sortable: true},
        { field: 'Item Rank', headerName: 'Rank', flex:1, sortable: true},
        { field: 'Quantity', headerName: 'Quantity', flex:1, sortable: true}
    ]);
    const generateUniqueID = () => {
        return uuidv4(); // Generates a random UUID (unique identifier)
    };

     useEffect(() => {
       
        if (screenWidth < 960) {
            // If screen width is less than 960px, show only 'quest_name' and 'objective' columns
            setDropsColumns([
                { field: 'Item', headerName: 'Item', flex:1, sortable: true, valueGetter: (params) => params.row['Item'], // Use 'Item' directly as the cell value
                    renderCell: (params) => (
                        <a href={`/item/${params.row['Item id']}`}>{params.row['Item']}</a>
                    )},
                { field: 'Drop Area', headerName: 'Area', flex:1, sortable: true},
                { field: 'Drop Method', headerName: 'Method', flex:1, sortable: true},
                { field: 'Drop Rate', headerName: 'Rate', flex:1, sortable: true},
            ]);
        }
    
        if (screenWidth < 700) {
            // If screen width is less than 960px, show only 'quest_name' and 'objective' columns
            setDropsColumns([
                { field: 'Item', headerName: 'Item', flex:1, sortable: true, valueGetter: (params) => params.row['Item'], // Use 'Item' directly as the cell value
                    renderCell: (params) => (
                        <a href={`/item/${params.row['Item id']}`}>{params.row['Item']}</a>
                    )},
                { field: 'Drop Area', headerName: 'Area', flex:1, sortable: true},
                { field: 'Drop Method', headerName: 'Method', flex:1, sortable: true},
            ]);
        }
    
        else {
            // If screen width is 960px or more, show all columns
            setDropsColumns([
                { field: 'Item', headerName: 'Item', flex:1, sortable: true, valueGetter: (params) => params.row['Item'], // Use 'Item' directly as the cell value
                    renderCell: (params) => (
                        <a href={`/item/${params.row['Item id']}`}>{params.row['Item']}</a>
                    )},
                { field: 'Drop Area', headerName: 'Area', flex:1, sortable: true},
                { field: 'Drop Method', headerName: 'Method', flex:1, sortable: true},
                { field: 'Drop Rate', headerName: 'Rate', flex:1, sortable: true},
                { field: 'Item Rank', headerName: 'Rank', flex:1, sortable: true},
                { field: 'Quantity', headerName: 'Quantity', flex:1, sortable: true}
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
    
    return (
        // <p>egeg</p>
        // <Box>
            <DataGrid
                rows={monsterdrops}
                columns={dropscolumns}
                getRowId={(row) => `${row.hitzone}-${generateUniqueID()}`}
                autoHeight
                // slots={{ toolbar: GridToolbar }}
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
        // </Box>
    );
    }