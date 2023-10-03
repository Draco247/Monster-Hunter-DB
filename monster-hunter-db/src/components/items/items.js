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
        fetch(`https://localhost:443/api/v1/items/item_type/${item_type}`)
            .then(res => res.json())
            .then((result)=> {
                setItems(result);
            })}, [item_type]);
    console.log(items);

    return (
        <div className="rounded-lg border-3 border-black overflow-hidden mb-3">
  <table className="border-collapse table-auto w-full text-sm">
    <tbody className="bg-slate-800">
      {items.map((item, index) => (
        // Start a new row for every third item (index % 3 === 0)
        index % 3 === 0 && (
            <tr key={index} className="border-b border-slate-100 dark:border-slate-700">
                {items.slice(index, index + 3).map((subItem, subIndex) => (
                    <td
                    key={subIndex}
                    className="border-r border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 w-1/3 text-center last:border-r-0"
                    >
                    <Link to={`/item/${subItem.id}`} className="block no-underline text-slate-500 dark:text-slate-400 focus:text-slate-500 dark:focus:text-slate-400 hover:text-slate-500 dark:hover:text-slate-400
                    hover:bg-slate-700">
                        <div className="flex items-center justify-center">
                        <img className="w-8 h-8 mr-2" src={getItemIcon(subItem.item_name)} alt={subItem.item_name} />
                        {subItem.item_name}
                        </div>
                    </Link>
                    </td>
                ))}
                </tr>
        )
      ))}
    </tbody>
  </table>
</div>




        // <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        //     {filteredItems.sort((a, b) => a.item_name.localeCompare(b.item_name)).map(item => (
        //         <Grid alignItems="center" justifyContent="center" item xs={2} sm={4} md={4} key={item.id}>
        //             <Link to={`/item/${item.id}`}>
        //                 <Item sx={{
        //                     display: 'flex',
        //                     alignItems: 'center',
        //                     justifyContent: 'center',
        //                     flexDirection: 'column',
        //                 }}>
        //                     <Box
        //                         component="img"
        //                         sx={{
        //                             height: 50,
        //                             width: 50,
        //                         }}
        //                         alt=""
        //                         src={getItemIcon(item.item_name)}
        //                     />
        //                     {item.item_name}
        //                 </Item>
        //             </Link>
        //         </Grid>
        //     ))}
        // </Grid>
    );
}