import * as React from 'react';
import {useState, useEffect} from "react";
import { Box } from '@mui/material';
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MUIDataTable from "mui-datatables";
import {ThemeProvider} from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    centerCell: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
});

export default function ArmourSet({armour_pieces, armours}) {
    // const [armoursets, setArmourSets] = useState([]);
    // console.log(Object.keys(armour_pieces))
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    // const forgingMats = JSON.parse(armours.forgingmats);

    const forgingMats = armours.map((piece) => {
        return JSON.parse(piece.forgingmats)
    });
    const armourSkills = armours.map((piece) => {
        return JSON.parse(piece.armourskills)
    })
    console.log(armourSkills);

    const columns = [{
        name: "Armour",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
            headerStyle: {
                // Add your custom header styles here
                width: "200px", // Set the desired width for the header cell
            },
            setCellProps: () => ({
                // Add your custom body cell styles here
                style: {
                    width: "200px", // Set the desired width for the body cell
                },
            }),
        },
    },{
        name: "Defense",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
            setCellProps: () => ({
                // Add your custom body cell styles here
                style: {
                    width: "100px", // Set the desired width for the body cell
                },
            }),
        },
    },{
        name: "Fire Res",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
            setCellProps: () => ({
                // Add your custom body cell styles here
                style: {
                    width: "100px", // Set the desired width for the body cell
                },
            }),
        },
    },{
        name: "Water Res",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
            setCellProps: () => ({
                // Add your custom body cell styles here
                style: {
                    width: "100px", // Set the desired width for the body cell
                },
            }),
        },
    },{
        name: "Ice Res",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
            setCellProps: () => ({
                // Add your custom body cell styles here
                style: {
                    width: "100px", // Set the desired width for the body cell
                },
            }),
        },
    },{
        name: "Thunder Res",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
            setCellProps: () => ({
                // Add your custom body cell styles here
                style: {
                    width: "100px", // Set the desired width for the body cell
                },
            }),
        },
    },{
        name: "Dragon Res",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
            setCellProps: () => ({
                // Add your custom body cell styles here
                style: {
                    width: "100px", // Set the desired width for the body cell
                },
            }),
        },
    },{
        name: "Rarity",
        options: {
            customBodyRender: (value) => (
                <div className={classes.centerCell}>{value}</div>
            ),
            setCellProps: () => ({
                // Add your custom body cell styles here
                style: {
                    width: "100px", // Set the desired width for the body cell
                },
            }),
        },
    },{
        name: "Skills",
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
        expandableRows: true,
        renderExpandableRow: (rowData, rowMeta) => {
            const rowIndex = rowMeta.dataIndex;
            const currentRowForgingMats = forgingMats[rowIndex];
            console.log(forgingMats);
            return (
                <React.Fragment>
                    <tr>
                            <TableContainer component={Paper}>
                                <Table style={{ minWidth: "650" }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Item</TableCell>
                                            <TableCell>Quantity</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {currentRowForgingMats.map((row, index) => (
                                            <TableRow key={index}>
                                                <Link to={`/items/${row["Item ID"]}`}>
                                                    <TableCell component="th" scope="row">
                                                        {row["Item Name"]}
                                                    </TableCell>
                                                </Link>
                                                <TableCell>{row.Quantity}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </tr>
                </React.Fragment>
            );
        },
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

    const tableData = armours.map((piece, index) => [
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    component="img"
                    sx={{
                        height: 100,
                        width: 100,
                        border: '2px solid black',
                        marginRight: '10px', // Add some space between the images
                    }}
                    alt={piece.armour_name}
                    src={piece.m_armour_img_url}
                />
                <Box
                    component="img"
                    sx={{
                        height: 100,
                        width: 100,
                        border: '2px solid black',
                    }}
                    alt={piece.armour_name}
                    src={piece.f_armour_img_url}
                />
            </Box>
            <span>{piece.armour_name}</span>
        </Box>,
        piece.defense,
        piece.fire_res,
        piece.water_res,
        piece.ice_res,
        piece.thunder_res,
        piece.dragon_res,
        piece.rarity,
        <ul key={`skill-list-${index}`} style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
            {armourSkills[index].map((skill, skillIndex) => (
                <li key={`skill-${index}-${skillIndex}`}>
                    <Link to={`/skills/${skill["skill_id"]}`}>{skill.skill_name}</Link>: {skill.lvl}
                </li>
            ))}
        </ul>
    ]);

    // const tableData = armour_pieces.map((piece) => [
    //     <Box
    //         component="img"
    //         sx={{
    //             height: 100,
    //             width: 100,
    //             border: '2px solid black'
    //             // maxHeight: { xs: 233, md: 167 },
    //             // maxWidth: { xs: 350, md: 250 },
    //         }}
    //         alt=""
    //         src={Object.values(piece)[0]}
    //     />,
    //     // ".....",
    //     // <a href={`/quests/${quest.id}`}>{quest.quest_name}</a>,
    //     // quest.objective,
    //     // parseInt(quest.hrp.replace(/,/g, ""), 10),
    //     // parseInt(quest.mrp.replace(/,/g, ""), 10),
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
        backgroundColor: 'black',
        maxWidth: '50%',
        maxHeight: '50%',
        height: 'auto',
        display: 'block',
        margin: '0 auto'
    };

    // useEffect(() => {
    //     console.log(process.env.REACT_APP_react_url)
    //     fetch(`${process.env.REACT_APP_react_url}/armour/getAllSets`)
    //         .then(res => res.json())
    //         .then((result)=> {
    //             setArmourSets(result);
    //
    //
    //         })}, []);
    // console.log(armoursets);
    return (
        <ThemeProvider>
            <MUIDataTable title={"Armour"} data={tableData} columns={columns} options={options} />
        </ThemeProvider>
    );
}