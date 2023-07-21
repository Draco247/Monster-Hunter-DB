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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    centerCell: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
});

export default function Monster() {
    const { id } = useParams();
    console.log(id);
    const [monster, setMonster] = useState(null);
    const [monsterquests, setMonsterQuests] = useState(null);
    const [monsterhitzones, setMonsterHitzones] = useState(null);
    const [monsterdrops, setMonsterDrops] = useState(null);
    const [monsterforgingweapons, setMonsterForgingWeapons] = useState(null);
    const [monsterupgradeweapons, setMonsterUpgradeWeapons] = useState(null);
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const questcolumns = [{
        name: "Locale",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Quest",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Objective",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "HRP",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "MRP",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    }];

    const hitzonecolumns = [{
        name: "Hitzone",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Blade",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Blunt",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Gunner",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Fire",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Water",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Ice",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Thunder",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Dragon",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    }];

    const dropscolumns = [{
        name: "Item Name",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Area",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Method",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Drop Rate",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
        },
    },{
        name: "Item Rank",
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

    const weaponcolumns = [{
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

    useEffect(() => {
        const fetchMonster = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}`);
                const data = await response.json();
                setMonster(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster:', error);
            }
        };

        const fetchMonsterQuests = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/quests`);
                const data = await response.json();
                setMonsterQuests(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster quests:', error);
            }
        };

        const fetchMonsterHitzones = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/hitzones`);
                const data = await response.json();
                setMonsterHitzones(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster hitzones:', error);
            }
        };

        const fetchMonsterDrops = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/drops`);
                const data = await response.json();
                setMonsterDrops(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster drops:', error);
            }
        };

        const fetchMonsterForgingWeapons = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/forging-weapons`);
                const data = await response.json();
                setMonsterForgingWeapons(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster forging weapons:', error);
            }
        };

        const fetchMonsterUpgradeWeapons = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_react_url}/monsters/${id}/upgrade-weapons`);
                const data = await response.json();
                setMonsterUpgradeWeapons(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster upgrade weapons:', error);
            }
        };

        fetchMonster()
        fetchMonsterQuests()
        fetchMonsterHitzones()
        fetchMonsterDrops()
        fetchMonsterForgingWeapons()
        fetchMonsterUpgradeWeapons()
    }, [id]);

    if (!monster) {
        return <div>Loading...</div>;
    }

    if (!monsterquests) {
        return <div>Loading...</div>;
    }

    if (!monsterhitzones) {
        return <div>Loading...</div>;
    }

    if (!monsterdrops){
        return <div>Loading...</div>;
    }

    if (!monsterforgingweapons) {
        return <div>Loading...</div>;
    }
    if (!monsterupgradeweapons) {
        return <div>Loading...</div>;
    }

    const questtableData = monsterquests.map((quest) => [
        "......",
        <a href={`/quests/${quest.id}`}>{quest.quest_name}</a>,
        quest.objective,
        quest.hrp,
        quest.mrp
    ]);

    const hitzonetableData = monsterhitzones.map((hitzone) => [
        hitzone.hitzone,
        hitzone["blade hitzone"],
        hitzone["blunt hitzone"],
        hitzone["gunner hitzone"],
        hitzone["fire hitzone"],
        hitzone["water hitzone"],
        hitzone["ice hitzone"],
        hitzone["thunder hitzone"],
        hitzone["dragon hitzone"]
    ]);

    const dropstableData = monsterdrops.map((drop) => [
        <a href={`/items/${drop["Item id"]}`}>{drop["Item"]}</a>,
        drop["Drop Area"],
        drop["Drop Method"],
        drop["Drop Rate"],
        drop["Item Rank"],
        drop["Quantity"]
    ]);

    const weaponsforgingtableData = monsterforgingweapons.map((weapon) => [
        <Box
            component="img"
            sx={{
                height: 100,
                width: 100,
                border: '2px solid black',
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
            }}
            alt=""
            src={weapon.weapon_img_url}
        />,
        <a href={`/weapons/${weapon.weapon_id}/weapons`}>{weapon.weapon_name}</a>,
        weapon.attack,
        weapon.element,
        weapon.element_val,
        <div>
            {weapon.deco_slots &&
                JSON.parse(weapon.deco_slots).map((decoration, index) => (
                    <span key={index}>
          <img src={deco_imgs[decoration]} alt={decoration} />
        </span>
                ))}
        </div>,
        <div>
            {weapon.rampage_deco_slots &&
                JSON.parse(weapon.rampage_deco_slots).map((decoration, index) => (
                    <span key={index}>
          <img src={deco_imgs[decoration]} alt={decoration} />
        </span>
                ))}
        </div>,
        weapon.rarity,
    ]);

    const weaponsupgradetableData = monsterupgradeweapons.map((weapon) => [
        <Box
            component="img"
            sx={{
                height: 100,
                width: 100,
                border: '2px solid black',
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
            }}
            alt=""
            src={weapon.weapon_img_url}
        />,
        <a href={`/weapons/${weapon.weapon_id}/weapons`}>{weapon.weapon_name}</a>,
        weapon.attack,
        weapon.element,
        weapon.element_val,
        <div>
            {weapon.deco_slots &&
                JSON.parse(weapon.deco_slots).map((decoration, index) => (
                    <span key={index}>
          <img src={deco_imgs[decoration]} alt={decoration} />
        </span>
                ))}
        </div>,
        <div>
            {weapon.rampage_deco_slots &&
                JSON.parse(weapon.rampage_deco_slots).map((decoration, index) => (
                    <span key={index}>
          <img src={deco_imgs[decoration]} alt={decoration} />
        </span>
                ))}
        </div>,
        weapon.rarity,
    ]);



    return (
        <div>
            <div className="monster-details">
                <h1>{monster.name}</h1>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <div style={{ border: '1px solid black', borderRadius:'5px', padding: '10px'}}>
                            <p style={{ fontSize: '32px' }}>{monster.description}</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div style={{ border: '1px solid black', borderRadius:'5px', padding: '10px' }}>
                            <Box m={4}>
                                <CardMedia
                                    component="img"
                                    image={monster.image_link}
                                    title={monster.name}
                                    style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }}
                                    // style={imageStyle}
                                />
                            </Box>
                        </div>
                    </Grid>
                </Grid>



            </div>
            <div className="monster-quests">
                <h2>Monster Quests</h2>
                <MUIDataTable title={"Monster Quests"} data={questtableData} columns={questcolumns} options={options} />
            </div>
            <div className="monster-hitzones">
                <h2>Monster Hitzones</h2>
                <MUIDataTable title={"Monster Hitzones"} data={hitzonetableData} columns={hitzonecolumns} options={options} />
            </div>
            <div className="monster-drops">
                <h2>Monster Drops</h2>
                <MUIDataTable title={"Monster Drops"} data={dropstableData} columns={dropscolumns} options={options}/>
            </div>
            <div className="monster-forging-weapons">
                <h2>Monster Forging Weapons</h2>
                <MUIDataTable title={"Monster Forging Weapons"} data={weaponsforgingtableData} columns={weaponcolumns} options={options}/>
            </div>
            <div className="monster-upgrade-weapons">
                <h2>Monster Upgrade Weapons</h2>
                <MUIDataTable title={"Monster Upgrade Weapons"} data={weaponsupgradetableData} columns={weaponcolumns} options={options}/>
            </div>
        </div>

    );
};