import * as React from 'react';
import {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid,Box } from '@mui/material';
import {Link, useParams} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@mui/material/LinearProgress";
import SharpnessBar from "../SharpnessBar";
import ProgressBar from "react-bootstrap/ProgressBar";

const useStyles = makeStyles({
    centerCell: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
});

export default function Weapon() {
    const { id } = useParams();
    console.log(id);
    const [weapon, setWeapon] = useState(null);
    const [forgingitems, setForgingItems] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const columns = [{
        name: "Item Name",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Quantity",
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


    const handleCardMouseEnter = (id) => {
        setHoveredCard(id);
    };

    const handleCardMouseLeave = () => {
        setHoveredCard(null);
    };

    const cardStyle = {
        height: '100%',
        maxWidth: 345,
        // transition: 'box-shadow 0.9s', // Add a smooth transition effect
    };

    const hoverStyle = {
        boxShadow: '0 0 5px 2px #888', // Apply a box shadow when hovered
    };

    const imageStyle = {
        border: '2px solid black',
        borderRadius: '10%', // Make the border curved
        backgroundColor: 'black'
    };

    useEffect(() => {
        const fetchWeapon = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/weapons/${id}/weapon`);
                const data = await response.json();
                setWeapon(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching weapon:', error);
            }
        };

        const fetchWeaponForging = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/weapons/${id}/items`);
                const data = await response.json();
                setForgingItems(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching forging items:', error);
            }
        };
        fetchWeapon();
        fetchWeaponForging();
    }, [id]);


    if (!weapon) {
        return <div>Loading...</div>;
    }

    // if (!questrewards) {
    //     return <div>Loading...</div>;
    // }

    const forge = JSON.parse(weapon.forging_mats);
    console.log(forge);
    const forgetableData = forge.map((item) => [
        <a href = {`/items/${item["Item ID"]}`}>{item["Item Name"]}</a>,
        item.Quantity
    ]);

    const upgrades = JSON.parse(weapon.upgrade_mats);
    console.log(upgrades);
    const upgradetableData = upgrades.map((item) => [
        <a href = {`/items/${item["Item ID"]}`}>{item["Item Name"]}</a>,
        item.Quantity
    ]);

    const sharpness = JSON.parse(weapon.base_sharpness);
    console.log(sharpness);
    const totalValue = sharpness.reduce((acc, val) => acc + val, 0);
    const progressWidth = (totalValue / (sharpness.length * 100)) * 100;
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'white', 'purple'];
    console.log(sharpness);
    return (
        <div>
            <div className="weapon-details">
                <h1>{weapon.weapon_name}</h1>
                <Box ml={2}>
                    <CardMedia
                        component="img"
                        image={weapon.detailed_img}
                        title={weapon.weapon_name}
                        // style={itemimageStyle}
                    />
                </Box>
                <p>{weapon.weapon_description}</p>
                <SharpnessBar sharpness={sharpness}/>
            </div>
            <div>
                <MUIDataTable title={"Forging Items"} data={forgetableData} columns={columns} options={options} />
            </div>
            <div>
                <MUIDataTable title={"Upgrade Items"} data={upgradetableData} columns={columns} options={options} />
            </div>
        </div>

    );
};