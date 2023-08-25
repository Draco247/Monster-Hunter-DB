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

export const Sidebar = [
    {
        title: "Monsters",
        path: "/monsters",
        icon: <img src={Monsters} alt="monsters" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
        cName: "nav-text"
    },
    {
        title: "Quests",
        // path: "/quests",
        icon: <img src={Quests} alt="monsters" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
        cName: "nav-text",
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,

        subNav: [
            {
                title: "Village",
                path: "/quests/village",
                id: 6,
                icon: <img src={VillageQuests} alt="village-quests" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Hub Low Rank",
                path: "/quests/hub-low-rank",
                id: 5,
                icon: <img src={Quests} alt="monsters" style={{ marginRight: '5px', verticalAlign:'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Hub High Rank",
                path: "/quests/hub-high-rank",
                id: 4,
                icon: <img src={Quests} alt="monsters" style={{ marginRight: '5px', verticalAlign:'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Hub Master Rank",
                path: "/quests/hub-master-rank",
                id: 3,
                icon: <img src={Quests} alt="monsters" style={{ marginRight: '5px', verticalAlign:'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Follower",
                path: "/quests/follower",
                id: 2,
                icon: <img src={FollowerQuests} alt="monsters" style={{ marginRight: '5px', verticalAlign:'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Arena",
                path: "/quests/arena",
                id: 7,
                icon: <img src={ArenaQuests} alt="arena-quests" style={{ marginRight: '5px', verticalAlign:'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Anomaly",
                path: "/quests/anomaly",
                id: 1,
                icon: <img src={AnomalyQuests} alt="anomaly-quests" style={{ marginRight: '5px', verticalAlign:'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Event",
                path: "/quests/event",
                id: 0,
                icon: <img src={Quests} alt="monsters" style={{ marginRight: '5px', verticalAlign:'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },

        ]
    },
    {
        title: "Weapons",
        // path: "/weapons",
        icon: <img src={Weapons} alt="weapons" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
        cName: "nav-text",
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,

        subNav: [
            {
                title: "Great Sword",
                path: "/weapons/gs",
                id: 0,
                icon: <img src={getWeaponIcon("gs")} alt="great-sword" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Sword and Shield",
                path: "/weapons/sns",
                id: 1,
                icon: <img src={getWeaponIcon("sns")} alt="sns" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Dual Blades",
                path: "/weapons/dbs",
                id: 2,
                icon: <img src={getWeaponIcon("dbs")} alt="dbs" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Longsword",
                path: "/weapons/ls",
                id: 3,
                icon: <img src={getWeaponIcon("ls")} alt="ls" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Hammer",
                path: "/weapons/hammer",
                id: 4,
                icon: <img src={getWeaponIcon("ham")} alt="ham" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Hunting Horn",
                path: "/weapons/hunting-horn",
                id: 5,
                icon: <img src={getWeaponIcon("hh")} alt="hh" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Lance",
                path: "/weapons/lance",
                id: 6,
                icon: <img src={getWeaponIcon("lance")} alt="lance" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Gunlance",
                path: "/weapons/gunlance",
                id: 7,
                icon: <img src={getWeaponIcon("gl")} alt="gl" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Switch Axe",
                path: "/weapons/switch-axe",
                id: 8,
                icon: <img src={getWeaponIcon("sa")} alt="sa" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Charge Blade",
                path: "/weapons/charge-blade",
                id: 9,
                icon: <img src={getWeaponIcon("lance")} alt="cb" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Insect Glaive",
                path: "/weapons/insect-glaive",
                id: 10,
                icon: <img src={getWeaponIcon("ig")} alt="ig" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Bow",
                path: "/weapons/bow",
                id: 11,
                icon: <img src={getWeaponIcon("bow")} alt="bow" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Light Bowgun",
                path: "/weapons/light-bowgun",
                id: 12,
                icon: <img src={getWeaponIcon("lbg")} alt="lbg" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },
            {
                title: "Heavy Bowgun",
                path: "/weapons/heavy-bowgun",
                id: 13,
                icon: <img src={getWeaponIcon("hbg")} alt="hbg" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
                cName: "nav-text",
            },

        ]
    },
    {
        title: "Armour",
        path: "/armour",
        icon: <img src={Armour} alt="monsters" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
        cName: "nav-text"
    },
    {
        title: "Items",
        path: "/items",
        icon: <img src={Items} alt="monsters" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
        cName: "nav-text"
    },
    {
        title: "Skills",
        path: "/skills",
        icon: <img src={Skills} alt="monsters" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
        cName: "nav-text"
    },
    {
        title: "Decorations",
        path: "/decorations",
        icon: <img src={Decorations} alt="monsters" style={{ marginRight: '5px', verticalAlign: 'middle', height: '40px', width: '40px' }} />,
        cName: "nav-text"
    }
]