import * as React from 'react';
import {useState, useEffect} from "react";
import { Box } from '@mui/material';
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function Quests() {
    const id = useSelector(state => state.id); 
    console.log(id)
    const [quests, setQuests] = useState([]);

    // const columns = ["Locale", "Quest","Objective", "HRP", "MRP"];
    const columns = [
        { field: 'quest_name', headerName: 'Quest', flex:1, sortable: true,
        renderCell: (params) => {
            const questTypeKeywords = ['hunt', 'capture', 'slay']; // Add more keywords as needed
            const questTypeMatches = questTypeKeywords.filter(keyword =>
                params.row.objective.toLowerCase().includes(keyword)
            );

            const isArena = /^arena \d+★/.test(params.row.quest_name.toLowerCase()) // check if quest name starts with arena *star to display arena icon

            const questType =
                isArena
                    ? 'Arena'
                    : questTypeMatches.length > 1
                    ? 'Endurance'
                    : questTypeMatches.length === 1
                    ? questTypeMatches[0]
                    : 'Other';

            const questIcon = getQuestIcon(questType);

            return (
                <div>
                    {questIcon && (
                        <img src={questIcon} alt={questType} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    )}
                    <Link to={`/quest/${params.row.id}`}>
                        {params.row.quest_name}
                    </Link>
                </div>
                );
            },
        },
        { field: 'objective', headerName: 'Objective', flex: 1},
        { field: 'hrp', headerName: 'HRP', flex:0.3, sortable: true},
        { field: 'mrp', headerName: 'MRP', flex:0.3, sortable: true}
    ];

    const getQuestIcon = (quest_type) => {
        // Replace underscores (_) with spaces in the image name
        const formattedImageName = `${quest_type
            .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}.png`
            .replace(/ /g, '_') // First, replace underscores with spaces

        // console.log(formattedImageName);

        try {
            // Use require to dynamically import the image
            return require(`../../assets/icons/${formattedImageName}`);
        } catch (error) {
            // Handle the case when the image doesn't exist
            // console.error(`Image ${formattedImageName} not found.`);
            return null;
        }
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_react_url}/quests/quest_type/${id}`)
            .then(res => res.json())
            .then((result)=> {
                setQuests(result);
            })}, [id]);
    console.log(quests);

    return (
        <div>
            <Box sx={{ height: 400, width: '100%'}}>
                <DataGrid
                    rows={quests}
                    columns={columns}
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
                />
            </Box>
        </div>

    );
}