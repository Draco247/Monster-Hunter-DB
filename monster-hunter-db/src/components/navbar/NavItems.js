import React from 'react';
import Monsters from '../../assets/icons/Unknown_Monster.png'
import Quests from '../../assets/icons/Hunt.png'
import VillageQuests from '../../assets/icons/kamura.png'
import FollowerQuests from '../../assets/icons/follower.png'
import AnomalyQuests from '../../assets/icons/Anomaly.png'
import ArenaQuests from '../../assets/icons/Arena.png'
import Weapons from '../../assets/icons/GS.png'
import Armour from '../../assets/icons/Chest.png'
import Items from '../../assets/icons/Potion.png'
import Skills from '../../assets/icons/Attack.png'
import Decorations from '../../assets/icons/deco4.png'
import * as RiIcons from 'react-icons/ri'
import * as FaIcons from 'react-icons/fa';
import { getWeaponIcon } from '../weapons/getWeaponIcon';

// const getWeaponIcon = (weapon_type) => {
//     // Replace underscores (_) with spaces in the image name
//     const formattedImageName = `${weapon_type.toUpperCase()}.png`

//     // console.log(formattedImageName);

//     try {
//         // Use require to dynamically import the image
//         return require(`../../assets/icons/${formattedImageName}`);
//     } catch (error) {
//         // Handle the case when the image doesn't exist
//         console.error(`Image ${formattedImageName} not found.`);
//         return null;
//     }
// };

export const navItems = [
    // {
    //     title: "Home",
    //     path: "/",
    //     icon: <FaIcons.FaHome alt="home" style={{color: '#34c6e3',  verticalAlign: 'middle', height: '30px', width: '30px'}} />,
    //     cName: "nav-item"
    // },
    {
        title: "Monsters",
        path: "/monsters",
        icon: <img id="navbar-button-img" src={Monsters} alt="monsters" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
        cName: "nav-item"
    },
    {
        title: "Quests",
        // path: "/quests",
        icon: <img id="navbar-button-img" src={Quests} alt="quests" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
        cName: "nav-item",
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subnav: [
            {
                title: "Village",
                path: "/quests/village",
                id: 6,
                icon: <img src={VillageQuests} alt="village-quests" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Hub Low Rank",
                path: "/quests/hub-low-rank",
                id: 5,
                icon: <img src={Quests} alt="monsters" style={{ verticalAlign:'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Hub High Rank",
                path: "/quests/hub-high-rank",
                id: 4,
                icon: <img src={Quests} alt="monsters" style={{ verticalAlign:'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Hub Master Rank",
                path: "/quests/hub-master-rank",
                id: 3,
                icon: <img src={Quests} alt="monsters" style={{ verticalAlign:'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Follower",
                path: "/quests/follower",
                id: 2,
                icon: <img src={FollowerQuests} alt="monsters" style={{ verticalAlign:'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Arena",
                path: "/quests/arena",
                id: 7,
                icon: <img src={ArenaQuests} alt="arena-quests" style={{ verticalAlign:'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Anomaly",
                path: "/quests/anomaly",
                id: 1,
                icon: <img src={AnomalyQuests} alt="anomaly-quests" style={{ verticalAlign:'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Event",
                path: "/quests/event",
                id: 0,
                icon: <img src={Quests} alt="monsters" style={{ verticalAlign:'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
        
        ]

    },
    {
        title: "Weapons",
        // path: "/weapons",
        icon: <img id="navbar-button-img" src={Weapons} alt="weapons" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
        cName: "nav-item",
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subnav: [
            {
                title: "Great Sword",
                path: "/weapons/gs",
                id: 0,
                icon: <img src={getWeaponIcon("gs")} alt="great-sword" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Sword and Shield",
                path: "/weapons/sns",
                id: 1,
                icon: <img src={getWeaponIcon("sns")} alt="sns" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Dual Blades",
                path: "/weapons/dbs",
                id: 2,
                icon: <img src={getWeaponIcon("dbs")} alt="dbs" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Longsword",
                path: "/weapons/ls",
                id: 3,
                icon: <img src={getWeaponIcon("ls")} alt="ls" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Hammer",
                path: "/weapons/hammer",
                id: 4,
                icon: <img src={getWeaponIcon("ham")} alt="ham" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Hunting Horn",
                path: "/weapons/hunting-horn",
                id: 5,
                icon: <img src={getWeaponIcon("hh")} alt="hh" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Lance",
                path: "/weapons/lance",
                id: 6,
                icon: <img src={getWeaponIcon("lance")} alt="lance" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Gunlance",
                path: "/weapons/gunlance",
                id: 7,
                icon: <img src={getWeaponIcon("gl")} alt="gl" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Switch Axe",
                path: "/weapons/switch-axe",
                id: 8,
                icon: <img src={getWeaponIcon("sa")} alt="sa" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Charge Blade",
                path: "/weapons/charge-blade",
                id: 9,
                icon: <img src={getWeaponIcon("lance")} alt="cb" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Insect Glaive",
                path: "/weapons/insect-glaive",
                id: 10,
                icon: <img src={getWeaponIcon("ig")} alt="ig" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Bow",
                path: "/weapons/bow",
                id: 11,
                icon: <img src={getWeaponIcon("bow")} alt="bow" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Light Bowgun",
                path: "/weapons/light-bowgun",
                id: 12,
                icon: <img src={getWeaponIcon("lbg")} alt="lbg" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Heavy Bowgun",
                path: "/weapons/heavy-bowgun",
                id: 13,
                icon: <img src={getWeaponIcon("hbg")} alt="hbg" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
        
        ]
    },
    {
        title: "Armour",
        path: "/armour",
        icon: <img id="navbar-button-img" src={Armour} alt="monsters" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
        cName: "nav-item"
    },
    {
        title: "Items",
        // path: "/items",
        icon: <img id="navbar-button-img" src={Items} alt="monsters" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
        cName: "nav-item",
        subnav: [
            {
                title: "Account Items",
                path: "/items/Account Items",
                // id: 6,
                icon: <img src={VillageQuests} alt="account-items" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Materials",
                path: "/items/Materials",
                // id: 5,
                icon: <img src={Quests} alt="materials" style={{ verticalAlign:'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Room Items",
                path: "/items/Room Items",
                // id: 4,
                icon: <img src={Quests} alt="room-items" style={{ verticalAlign:'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Scraps",
                path: "/items/Scraps",
                // id: 3,
                icon: <img src={Quests} alt="scraps" style={{ verticalAlign:'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Consumables",
                path: "/items/Consumables",
                // id: 2,
                icon: <img src={FollowerQuests} alt="consumables" style={{ verticalAlign:'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            },
            {
                title: "Ammo",
                path: "/items/Ammo",
                // id: 7,
                icon: <img src={ArenaQuests} alt="ammo" style={{ verticalAlign:'middle', height: '30px', width: '30px' }} />,
                cName: "submenu-item",
            }
        ]
    },
    {
        title: "Skills",
        path: "/skills",
        icon: <img id="navbar-button-img" src={Skills} alt="monsters" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
        cName: "nav-item"
    },
    {
        title: "Decorations",
        path: "/decorations",
        icon: <img id="navbar-button-img" src={Decorations} alt="monsters" style={{ verticalAlign: 'middle', height: '30px', width: '30px' }} />,
        cName: "nav-item"
    }
]


