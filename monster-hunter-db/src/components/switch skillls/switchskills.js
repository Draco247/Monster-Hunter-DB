import * as React from 'react';
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import {Box} from "@mui/material";

export default function SwitchSkills({weapon_type_id}) {
    const [switchskills, setswitchskills] = useState([]);

    useEffect(() => {
        
        fetch(`https://localhost:443/api/v1/switch-skills/${weapon_type_id}/switch-skills`)
            .then(res => res.json())
            .then((result)=> {
                setswitchskills(result);
                console.log(result);
            })
    }, [weapon_type_id]);


    return (
        <div>
            {/* <Box sx={{ height: 400, width: '100%'}}>
                <DataGrid
                    rows={skills}
                    columns={columns}
                    autoHeight
                    // disableColumnMenu
                    pageSize={5}
                    // checkboxSelection
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
            </Box> */}
        </div>

    );
}

