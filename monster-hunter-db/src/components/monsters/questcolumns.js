import {useState, useEffect, useRef} from "react";
import { Box } from '@mui/material';
import { getQuestIcon } from '../quests/getQuestIcon';
import {DataGrid,GridToolbar} from "@mui/x-data-grid";
import { useTheme } from "@mui/material";


export function QuestColumns({monsterquests, screenWidth}) {
    const { palette } = useTheme();
    const [questcolumns, setQuestColumns] = useState([
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
    ]); 

     useEffect(() => {
       
        if (screenWidth < 960) {
            // If screen width is less than 960px, show only 'quest_name' and 'objective' columns
            setQuestColumns([
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
              { field: 'objective', headerName: 'Objective', flex: 1 },
            ]);
        }
    
        if (screenWidth < 700) {
            // If screen width is less than 960px, show only 'quest_name' and 'objective' columns
            setQuestColumns([
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
            ]);
        }
    
        else {
            // If screen width is 960px or more, show all columns
            setQuestColumns([
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
                        <div class="flex items-center">
                            {questIcon && (
                                <img src={questIcon} alt={questType} class="mr-2" />
                            )}
                            <a href={`/quest/${params.row.id}`}>{params.row.quest_name}</a>
                        </div>
                        );
                    },
                    },
                    { field: 'objective', headerName: 'Objective', flex: 1 },
                    { field: 'hrp', headerName: 'HRP', flex: 0.2, sortable: true },
                    { field: 'mrp', headerName: 'MRP', flex: 0.2, sortable: true },
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
                rows={monsterquests}
                columns={questcolumns}
                getRowId={(row) => row.id}
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