import * as React from 'react';
import {useState, useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Grid} from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import {Link} from "react-router-dom";
import { getItemIcon } from './getItemIcon';

export default function Items({ searchQuery, item_type }) {
    const [items, setItems] = useState([]);
    const filteredItems = items.filter((item) =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    useEffect(() => {
        // console.log("fwfwff")
        setItems([]);
        fetch(`${process.env.REACT_APP_react_url}/items/item_type/${item_type}`)
            .then(res => res.json())
            .then((result)=> {
                setItems(result);
            })}, [item_type]);
    console.log(items);

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {filteredItems.sort((a, b) => a.item_name.localeCompare(b.item_name)).map(item => (
                <Grid alignItems="center" justifyContent="center" item xs={2} sm={4} md={4} key={item.id}>
                    <Link to={`/item/${item.id}`}>
                        <Item sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}>
                            <Box
                                component="img"
                                sx={{
                                    height: 50,
                                    width: 50,
                                }}
                                alt=""
                                src={getItemIcon(item.item_name)}
                            />
                            {item.item_name}
                        </Item>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}