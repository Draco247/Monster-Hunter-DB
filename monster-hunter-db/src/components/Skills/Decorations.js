import * as React from 'react';
import {useState, useEffect} from "react";
import { Box } from '@mui/material';
import './decorations.css'
import Deco1 from '../../assets/icons/deco1.png';
import Deco2 from '../../assets/icons/deco2.png';
import Deco3 from '../../assets/icons/deco3.png';
import Deco4 from '../../assets/icons/deco4.png';
import {Link} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";

export default function Decorations() {
    const [decorations, setDecorations] = useState([]);

    const decorationImages = {
        1: Deco1,
        2: Deco2,
        3: Deco3,
        4: Deco4,
    };

    const columns = [
        { field: 'decoration_name', headerName: 'Decoration', flex: 1, sortable: true,
            renderCell: (params) => {
                const decorationName = params.row.decoration_name;
                const lastSpaceIndex = decorationName.lastIndexOf(' ');
                const decoNumber = lastSpaceIndex !== -1 ? decorationName.slice(lastSpaceIndex + 1) : null;

                const decorationImage = decoNumber && decorationImages[parseInt(decoNumber, 10)] ? (
                    <Box
                        component="img"
                        sx={{
                            height: 40,
                            width: 40,
                            border: '2px solid black',
                            marginRight: '8px',
                        }}
                        alt={decorationName}
                        src={decorationImages[parseInt(decoNumber, 10)]}
                    />
                ) : null;

                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {decorationImage}
                        <Link to={`/decorations/${params.row.id}`}>{decorationName}</Link>
                    </div>
                );
            },},
        { field: 'skill_name', headerName: 'Skill', flex: 1, sortable: true,
            renderCell: (params) => {
                return (
                    <Link to={`/skills/${params.row.id}`}>{params.row.skill_name}</Link>
                );
            },},
        { field: 'skill_lvl', headerName: 'Lvl', flex: 1, sortable: true}
    ];

    useEffect(() => {
        fetch(`${process.env.REACT_APP_react_url}/skills/skillDecorations/getAll`)
            .then(res => res.json())
            .then((result)=> {
                setDecorations(result);
            })}, []);
    console.log(decorations);
    return (
        <div className="decorations-table">
            <Box sx={{ height: 400, width: '100%'}}>
                <DataGrid
                    rows={decorations}
                    columns={columns}
                    autoHeight
                    // disableColumnMenu
                    pageSize={5}
                    checkboxSelection
                    disableRowSelectionOnClick
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'decoration_name', sort: 'asc' }],
                        },
                    }}
                />
            </Box>
        </div>

    );
}