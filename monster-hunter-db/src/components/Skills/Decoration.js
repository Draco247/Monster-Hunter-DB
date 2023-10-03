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
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import MUIDataTable from "mui-datatables";


export default function Quest() {
    const { id } = useParams();
    console.log(id);
    const [decoration, setDecoration] = useState(null);
    // const [questrewards, setQuestrewards] = useState([]);
    // const [monsterquests, setMonsterQuests] = useState(null);
    // const [monsterhitzones, setMonsterHitzones] = useState(null);
    // const [monsterdrops, setMonsterDrops] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const columns = ["Item Name","Chance","Quantity"];
    // const craftingMats = decoration.map((deco) => {
    //     return JSON.parse(deco.crafting)
    // });
    //
    // console.log(craftingMats)

    const options = {
        search: searchBtn,
        viewColumns: viewColumnBtn,
        print: false,
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

    // const tableData = questrewards.map((reward) => [
    //     <a href={`/items/${reward["Item id"]}`}>{reward["Item"]}</a>,
    //     reward["Chance"],
    //     reward["Quantity"]
    // ]);

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
        const fetchDecoration = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/skills/skillDecorations/${id}`);
                const data = await response.json();
                setDecoration(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching decoration:', error);
            }
        };

        fetchDecoration();
    }, [id]);


    if (!decoration) {
        return <div>Loading...</div>;
    }

    const tableData = JSON.parse(decoration.crafting).map((deco) => [
        deco.Item_id,
        deco.Item_name,
        deco.Quantity
    ]);

    console.log(tableData);

    return (
        <div>
            <div className="decoration-details">
                <h1>{decoration.decoration_name}</h1>
                <a href={`/skills/${decoration.decoskillid}`}>{decoration.skill_name}</a>
                <p>{decoration.skill_description}</p>
                <p>{decoration.skill_lvl}</p>
                {/*<p>Failure Conditions: {quest.failure_conditions}</p>*/}
                {/*<p>Hunter Rank Points: {quest.hrp}</p>*/}
                {/*<p>Master Rank Points: {quest.mrp}</p>*/}
            </div>
        </div>

    );
};