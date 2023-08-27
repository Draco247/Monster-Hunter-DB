import {Box, Grid} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setId } from '../../actions';
import Tooltip from '@mui/material/Tooltip';
import Quests from '../../assets/icons/Hunt.png'
import VillageQuests from '../../assets/icons/kamura.png'
import FollowerQuests from '../../assets/icons/follower.png'
import AnomalyQuests from '../../assets/icons/Anomaly.png'
import ArenaQuests from '../../assets/icons/Arena.png'
import { useState } from "react";
import Button from "@mui/material/Button";



function HomePage() {
    const getWeaponIcon = (weapon_type) => {
        // Replace underscores (_) with spaces in the image name
        const formattedImageName = `${weapon_type.toUpperCase()}.png`
    
        // console.log(formattedImageName);
    
        try {
            // Use require to dynamically import the image
            return require(`../../assets/icons/${formattedImageName}`);
        } catch (error) {
            // Handle the case when the image doesn't exist
            console.error(`Image ${formattedImageName} not found.`);
            return null;
        }
    };

    const [hovered, setHovered] = useState(null);
    const Weapons = [
        {
            title: "Great Sword",
            path: "/weapons/gs",
            id: 0,
            icon: getWeaponIcon("gs"),
            cName: "nav-text",
        },
        {
            title: "Sword and Shield",
            path: "/weapons/sns",
            id: 1,
            icon: getWeaponIcon("sns"),
            cName: "nav-text",
        },
        {
            title: "Dual Blades",
            path: "/weapons/dbs",
            id: 2,
            icon: getWeaponIcon("dbs"),
            cName: "nav-text",
        },
        {
            title: "Longsword",
            path: "/weapons/ls",
            id: 3,
            icon: getWeaponIcon("ls"),
            cName: "nav-text",
        },
        {
            title: "Hammer",
            path: "/weapons/hammer",
            id: 4,
            icon: getWeaponIcon("ham"),
            cName: "nav-text",
        },
        {
            title: "Hunting Horn",
            path: "/weapons/hunting-horn",
            id: 5,
            icon: getWeaponIcon("hh"),
            cName: "nav-text",
        },
        {
            title: "Lance",
            path: "/weapons/lance",
            id: 6,
            icon: getWeaponIcon("lance"),
            cName: "nav-text",
        },
        {
            title: "Gunlance",
            path: "/weapons/gunlance",
            id: 7,
            icon: getWeaponIcon("gl"),
            cName: "nav-text",
        },
        {
            title: "Switch Axe",
            path: "/weapons/switch-axe",
            id: 8,
            icon: getWeaponIcon("sa"),
            cName: "nav-text",
        },
        {
            title: "Charge Blade",
            path: "/weapons/charge-blade",
            id: 9,
            icon: getWeaponIcon("lance"),
            cName: "nav-text",
        },
        {
            title: "Insect Glaive",
            path: "/weapons/insect-glaive",
            id: 10,
            icon: getWeaponIcon("ig"),
            cName: "nav-text",
        },
        {
            title: "Bow",
            path: "/weapons/bow",
            id: 11,
            icon: getWeaponIcon("bow"),
            cName: "nav-text",
        },
        {
            title: "Light Bowgun",
            path: "/weapons/light-bowgun",
            id: 12,
            icon: getWeaponIcon("lbg"),
            cName: "nav-text",
        },
        {
            title: "Heavy Bowgun",
            path: "/weapons/heavy-bowgun",
            id: 13,
            icon: getWeaponIcon("hbg"),
            cName: "nav-text",
        },

    ]

    const QuestsList = [
        {
            title: "Village",
            path: "/quests/village",
            id: 6,
            icon: VillageQuests,
            cName: "nav-text",
        },
        {
            title: "Hub Low Rank",
            path: "/quests/hub-low-rank",
            id: 5,
            icon: Quests,
            cName: "nav-text",
        },
        {
            title: "Hub High Rank",
            path: "/quests/hub-high-rank",
            id: 4,
            icon: Quests,
            cName: "nav-text",
        },
        {
            title: "Hub Master Rank",
            path: "/quests/hub-master-rank",
            id: 3,
            icon: Quests,
            cName: "nav-text",
        },
        {
            title: "Follower",
            path: "/quests/follower",
            id: 2,
            icon: FollowerQuests,
            cName: "nav-text",
        },
        {
            title: "Arena",
            path: "/quests/arena",
            id: 7,
            icon: ArenaQuests,
            cName: "nav-text",
        },
        {
            title: "Anomaly",
            path: "/quests/anomaly",
            id: 1,
            icon: AnomalyQuests,
            cName: "nav-text",
        },
        {
            title: "Event",
            path: "/quests/event",
            id: 0,
            icon: Quests,
            cName: "nav-text",
        },
    ]

    const dispatch = useDispatch();


    const redirect = (id) => {
        // showSidebar()
        // console.log(id)
        dispatch(setId(id))
    }

    const hoverStyle = {
        boxShadow: '0 0 5px 2px #888', // Apply a box shadow when hovered
        background: '#03204d'
    };

    const handleMouseEnter = (selectedname) => {
        setHovered(selectedname);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };
      
    return (
        <div className="home">
            <h1>Home</h1>
            <Box m={10}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={12} lg={12} container justifyContent="center" alignItems="center">
                        <Button component={Link} to="/monsters" m={8} display="flex"
                         flexDirection="column" 
                         alignItems="center" 
                         justifyContent="center" 
                         sx={{ width: '50%', border: '2px solid black', borderRadius: '5px','&:hover': hoverStyle}}
                         onMouseEnter={() => handleMouseEnter("monsters")}
                         onMouseLeave={handleMouseLeave}
                         >
                            <h1>Monsters</h1>
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Box m={8} display="flex" flexDirection="column" alignItems="center" sx={{ maxWidth: '100%',width: '300px', border: '2px solid black', borderRadius: '5px' }}>
                            <h1>Quests</h1>
                                {QuestsList.map((item, index) => (
                                    <ul style={{ textDecoration: "none", listStyleType: "none", padding: 0 }}>
                                        <li key={item.id}>
                                            <Button component={Link} to={item.path} style={{...(hovered === item.title && hoverStyle)}} 
                                            onMouseEnter={() => handleMouseEnter(item.title)}
                                            onMouseLeave={handleMouseLeave} onClick={() => redirect(item.id)}
                                            >
                                                <img src={item.icon} style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px'}}/>
                                                {item.title}
                                            </Button>
                                        </li>
                                    </ul>
                                ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Box m={8} display="flex" flexDirection="column" alignItems="center" sx={{ maxWidth: '100%',width: '300px', border: '2px solid black', borderRadius: '5px' }}>
                            <h1>Weapons</h1>
                            <Grid container spacing={2} style={{ flexWrap: 'wrap', padding: '16px'}}>
                                {Weapons.map((item, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
                                        <Link to={item.path} onClick={() => redirect(item.id)}>
                                            <Tooltip title={item.title}>
                                                {/* <Box
                                                    component="img"
                                                    sx={{
                                                        maxHeight: '100%',
                                                        maxWidth: '100%',
                                                        height: '50px',
                                                        width: '50px',
                                                        border: '2px solid black',
                                                        borderRadius: '5px',
                                                    }}
                                                    alt={item.title}
                                                    src={item.icon}
                                                /> */}
                                                <Button component={Link} to={item.path} style={{...(hovered === item.title && hoverStyle),border: '2px solid black', borderRadius: '5px'}} 
                                                onMouseEnter={() => handleMouseEnter(item.title)}
                                                onMouseLeave={handleMouseLeave} onClick={() => redirect(item.id)}
                                                >
                                                    <img src={item.icon} style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px'}}/>
                                                </Button>
                                            </Tooltip>
                                        </Link>
                                        
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Box m={8} display="flex" flexDirection="column" alignItems="center" sx={{ maxWidth: '100%',width: '300px', border: '2px solid black', borderRadius: '5px' }}>
                            <h1>Weapons</h1>
                            <Grid container spacing={2} style={{ flexWrap: 'wrap', padding: '16px'}}>
                                {Weapons.map((item, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
                                        <Link to={item.path} onClick={() => redirect(item.id)}>
                                            <Tooltip title={item.title}>
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        maxHeight: '100%',
                                                        maxWidth: '100%',
                                                        height: '50px',
                                                        width: '50px',
                                                        border: '2px solid black',
                                                        borderRadius: '5px',
                                                    }}
                                                    alt={item.title}
                                                    src={item.icon}
                                                />
                                            </Tooltip>
                                        </Link>
                                        
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Box m={8} display="flex" flexDirection="column" alignItems="center" sx={{ maxWidth: '100%',width: '300px', border: '2px solid black', borderRadius: '5px' }}>
                            <h1>Weapons</h1>
                            <Grid container spacing={2} style={{ flexWrap: 'wrap', padding: '16px'}}>
                                {Weapons.map((item, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
                                        <Link to={item.path} onClick={() => redirect(item.id)}>
                                            <Tooltip title={item.title}>
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        maxHeight: '100%',
                                                        maxWidth: '100%',
                                                        height: '50px',
                                                        width: '50px',
                                                        border: '2px solid black',
                                                        borderRadius: '5px',
                                                    }}
                                                    alt={item.title}
                                                    src={item.icon}
                                                />
                                            </Tooltip>
                                        </Link>
                                        
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Box m={8} display="flex" flexDirection="column" alignItems="center" sx={{ maxWidth: '100%',width: '300px', border: '2px solid black', borderRadius: '5px' }}>
                            <h1>Quests</h1>
                            <Grid container spacing={2} style={{ flexWrap: 'wrap', padding: '16px'}}>
                                {QuestsList.map((item, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
                                        <Link to={item.path} onClick={() => redirect(item.id)}>
                                            <Tooltip title={item.title}>
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        maxHeight: '100%',
                                                        maxWidth: '100%',
                                                        height: '50px',
                                                        width: '50px',
                                                        border: '2px solid black',
                                                        borderRadius: '5px',
                                                    }}
                                                    alt={item.title}
                                                    src={item.icon}
                                                />
                                            </Tooltip>
                                        </Link>
                                        
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default HomePage;