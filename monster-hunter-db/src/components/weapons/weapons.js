import * as React from 'react';
import {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid,Box } from '@mui/material';
import {Link, useLocation} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import MUIDataTable from "mui-datatables";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    centerCell: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
});

export default function Weapons(weaponType) {
    const [weapons, setWeapons] = useState([])
    console.log(weaponType)
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const columns = [{
        name: "Img",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Weapon Name",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Attack",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Element",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Element Val",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Deco Slots",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Rampage Deco Slots",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Rarity",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    }];

    const deco_imgs = {
        "deco1": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco1.png",
        "deco2": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco2.png",
        "deco3": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco3.png",
        "deco4": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco4.png"
    }

    const classes = useStyles();

    const options = {
        search: searchBtn,
        viewColumns: viewColumnBtn,
        print: false,
        selectableRows: false,
        // filter: filterBtn,
        // filterType: "dropdown",
        // responsive,
        // tableBodyHeight,
        // tableBodyMaxHeight,
        onTableChange: (event, state) => {
            console.log(event);
            console.dir(state);
        }
    };

    const tableData = weapons.map((weapon) => [
        <Box
            component="img"
            sx={{
                height: 100,
                width: 100,
                border: '2px solid black'
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
            }}
            alt=""
            src={weapon.weapon_img_url}
        />,
        <a href = {`/weapons/${weapon.id}/weapons`}>{weapon.weapon_name}</a>,
        weapon.attack,
        weapon.element,
        weapon.elementval,
        <div>
            {JSON.parse(weapon.decoSlots).map((decoration, index) => (
                <span key={index}>
                    <img
                        src={deco_imgs[decoration]}
                        alt={decoration}
                        // className={classes.decorationImage}
                    />
                  </span>
                            ))}

        </div>,
        <div>
            {JSON.parse(weapon.rampagedecoSlots).map((decoration, index) => (
                <span key={index}>
                    <img
                        src={deco_imgs[decoration]}
                        alt={decoration}
                        // className={classes.decorationImage}
                    />
                  </span>
            ))}

        </div>, weapon.rarity
    ]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_react_url}/weapons/${weaponType.weaponType}/weapons`)
            .then(res => res.json())
            .then((result)=> {
                setWeapons(result);
            })}, []);
    console.log(weapons);
    return (
        <MUIDataTable title={"Weapons"} data={tableData} columns={columns} options={options} />
    );
}