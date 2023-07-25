import * as React from 'react';
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import {Box} from "@mui/material";

export default function Skills() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_react_url}/skills/getAll`)
            .then(res => res.json())
            .then((result)=> {
                setSkills(result);
                console.log(skills)
            })}, []);

    const columns = [
        { field: 'skill_name', headerName: 'Skill', width: 150, sortable: true},
        { field: 'skill_description', headerName: 'Description', flex: 1, renderCell: (params) => <div style={{ whiteSpace: 'pre-wrap' }}>{params.value}</div> },
        {
            field: 'skill_levels',
            headerName: 'Skill Lvls',
            flex: 1,
            renderCell: (params) => {
                const skillLevels = JSON.parse(params.value);

                return (
                    <div style={{ maxHeight: 100, overflowY: 'auto' }}>
                        <ul style={{ margin: 0, paddingInlineStart: 20, whiteSpace: 'normal', listStyle: 'none' }}>
                            {skillLevels.map((level, index) => (
                                <li key={index}>{level}</li>
                            ))}
                        </ul>
                    </div>
                );
            },
        },
        { field: 'skillDecorations', headerName: 'Decorations', width: 200,renderCell: (params) => {
                // "params" contains the current row data, including the "skillDecorations" property
                const decorations = params.value; // Assuming "skillDecorations" is an array of dictionaries

                // Render an unordered list with list items for each decoration
                return (
                    <ul>
                        {decorations.map((decoration) => (
                            <li key={decoration.id}>
                                <Link to={`/decorations/${decoration.id}`}>{decoration.decoration_name}</Link>
                            </li>
                        ))}
                    </ul>
                );
            },
        }
    ];


    return (
        <div>
            <Box sx={{ height: 400, width: '100%'}}>
                <DataGrid
                    rows={skills}
                    columns={columns}
                    autoHeight
                    // disableColumnMenu
                    pageSize={5}
                    checkboxSelection
                    disableRowSelectionOnClick
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'skill_name', sort: 'asc' }],
                        },
                    }}
                    getRowHeight={(params) => {
                        const defaultRowHeight = 100; // Set a default row height (adjust as needed)
                        const skillLevels = JSON.parse(params.model.skill_levels);

                        // Calculate the height required for the list items in the cell
                        const listItemHeight = 30; // Assuming each list item has a height of 30px

                        // Calculate the total height needed for all list items
                        const totalHeight = skillLevels.length * listItemHeight;

                        // Return the greater of the total height or the default row height
                        return Math.max(defaultRowHeight, totalHeight);
                    }}
                />
            </Box>
        </div>

    );
}

