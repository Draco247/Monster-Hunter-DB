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

export default function BasicTable({ searchQuery }) {
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
        fetch("http://localhost:8080/api/v1/items/getAll")
            .then(res => res.json())
            .then((result)=> {
                setItems(result);
            })}, []);
    console.log(items);
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {filteredItems.map(item => (
                <Grid alignItems="center" justifyContent="center" item xs={2} sm={4} md={4} key={item.id}>
                    <Link to={`/items/${item.id}`}>
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
                                src={item.item_img}
                            />
                            {item.item_name}
                        </Item>
                    </Link>
                </Grid>
            ))}
        </Grid>
        // <TableContainer component={Paper}>
        //     <Table sx={{ minWidth: 650 }} aria-label="simple table">
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell>Item Name</TableCell>
        //                 {/*<TableCell align="right">Quest</TableCell>*/}
        //                 {/*<TableCell align="right">Objective</TableCell>*/}
        //                 {/*<TableCell align="right">HRP</TableCell>*/}
        //                 {/*<TableCell align="right">MRP</TableCell>*/}
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {items.map(item => (
        //                 <TableRow
        //                     key={item.item_id}
        //                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //                 >
        //                     <TableCell align="right">
        //                         <Box
        //                             component="img"
        //                             sx={{
        //                                 height: 50,
        //                                 width: 50,
        //                             }}
        //                             alt=""
        //                             src={item.item_img}
        //                         />
        //                         {item.item_name}
        //                     </TableCell>
        //                 </TableRow>
        //             ))}
        //         </TableBody>
        //     </Table>
        // </TableContainer>
    );
}