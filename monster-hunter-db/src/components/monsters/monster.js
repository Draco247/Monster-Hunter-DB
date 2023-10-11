import * as React from 'react';
// import './monster.css'
import {useState, useEffect, useRef, useLayoutEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {DataGrid,GridToolbar} from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';
import Button from "@mui/material/Button";
import {GridColumnHeaderParams} from "@mui/x-data-grid";
import { getWeaponIcon } from '../weapons/getWeaponIcon';
import { getMonsterIcon } from './getMonsterIcon';
import { getMonsterIntro } from './getMonsterIntro';
import { getArmourIcon } from '../armour/getArmourIcon';
import { getQuestIcon } from '../quests/getQuestIcon';
import { useTheme } from "@mui/material";
import { useIsVisible } from '../isVisible';
import { QuestColumns } from './questcolumns';
import { DropColumns } from './dropcolumns';
import { WeaponColumns } from './weaponcolumns';
import { ArmourColumns } from './armourcolumns';
import { HitzoneColumns } from './hitzonecolumns';

export default function Monster() {
    const { id } = useParams();
    // console.log(id);
    const [monster, setMonster] = useState(null);
    const [monsterquests, setMonsterQuests] = useState(null);
    const [monsterhitzones, setMonsterHitzones] = useState(null);
    const [monsterdrops, setMonsterDrops] = useState(null);
    const [monsterforgingweapons, setMonsterForgingWeapons] = useState(null);
    const [monsterupgradeweapons, setMonsterUpgradeWeapons] = useState(null);
    const [monsterarmour, setMonsterArmour] = useState(null);
    // const [visible, setVisible] = useState(null);
    const { palette } = useTheme();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [loaded, setLoaded] = useState(false);
    const [fade, setFade] = useState(true);
    // setTimeout(() => {
    //     setFade(false);
    //   }, 100);
    
    // Update screenWidth state when the window is resized
    useEffect(() => {
        function handleResize() {
        setScreenWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', handleResize);
    
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    
    useEffect(() => {
        setLoaded(false);
        setFade(true);
        const fetchMonster = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/monsters/${id}`);
                const data = await response.json();
                setMonster(data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching monster:', error);
            }
        };

        const fetchMonsterQuests = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/monsters/${id}/quests`);
                const data = await response.json();
                setMonsterQuests(data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching monster quests:', error);
            }
        };

        const fetchMonsterHitzones = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/monsters/${id}/hitzones`);
                const data = await response.json();
                setMonsterHitzones(data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching monster hitzones:', error);
            }
        };

        const fetchMonsterDrops = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/monsters/${id}/drops`);
                const data = await response.json();
                setMonsterDrops(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster drops:', error);
            }
        };

        const fetchMonsterForgingWeapons = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/monsters/${id}/forging-weapons`);
                const data = await response.json();
                setMonsterForgingWeapons(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster forging weapons:', error);
            }
        };

        const fetchMonsterUpgradeWeapons = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/monsters/${id}/upgrade-weapons`);
                const data = await response.json();
                setMonsterUpgradeWeapons(data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching monster upgrade weapons:', error);
            }
        };

        const fetchMonsterArmour = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/monsters/${id}/armour`);
                const data = await response.json();
                setMonsterArmour(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching monster armour:', error);
            }
        };

        fetchMonster()
        fetchMonsterQuests()
        fetchMonsterHitzones()
        fetchMonsterDrops()
        fetchMonsterForgingWeapons()
        fetchMonsterUpgradeWeapons()
        fetchMonsterArmour()
    }, [id]);
 
    const generateUniqueID = () => { 
        return uuidv4(); // Generates a random UUID (unique identifier)
    };

    useEffect(() => {
        // Check if all required data objects are available
        if (monster && monsterquests && monsterhitzones && monsterdrops && monsterupgradeweapons && monsterforgingweapons && monsterarmour) {
            // If all data is available, set loaded to true
            setLoaded(true);
        }
    }, [monster, monsterquests, monsterhitzones, monsterdrops, monsterupgradeweapons, monsterforgingweapons, monsterarmour]);

    useLayoutEffect(() => {
        console.log(loaded)
        if (loaded) {
            setTimeout(() => {
                setFade(false);
              }, 500);
        }
    }, [loaded]);

   
    if (!loaded) {
        // Render a loading message or return null
        return <div className="h-screen flex justify-center items-center" role="status">
                <svg aria-hidden="true" class="inline w-64 h-64 mr-2 text-slate-950 animate-spin dark:text-slate-50 fill-violet-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>;
    }
    // console.log(fade)
    return (
        <div className={`${fade === false ? "transition duration-150 ease-in opacity-100" : "opacity-0"}`}>
            <div className="flex justify-center">
                <h1 className="text-4xl pt-5 font-bold mb-4 border-b-4 border-slate-950 text-center text-slate-950 dark:text-slate-50 dark:border-slate-50 w-64">
                    {monster.name}
                </h1>
            </div>
            <div className={`flex justify-center`}>
                <div className="mx-auto p-5">
                    {/* <h2>Large Monsters</h2> */}
                    <br/>
                    <div className="grid grid-cols-4 gap-4">
                        <div className={`col-span-3`}>
                        {getMonsterIntro(monster.name) ? (
                                <img src={getMonsterIntro(monster.name)} class="mx-auto border-3 border-black rounded-lg" />
                            ) : (
                                <p clasNames="text-center text-xl font-bold text-slate-950 dark:text-slate-50" >
                                    {monster.description}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center justify-center">
                            <img src={getMonsterIcon(monster.name)} class="mx-auto border-3 border-black rounded-lg" />
                        </div>
                    </div>
                    <br/>
                    {getMonsterIntro(monster.name) && (
                        <p className="text-center text-xl font-bold text-slate-950 dark:text-slate-50">
                            {monster.description}
                        </p>
                    )}
                </div>
            </div>
            {
                /*
                might get rid of the buttons and just display everything
                */
            }
            <div className="monster-tables">
                <div className={`p-10`}>
                    <h2 className="text-4xl font-bold text-center text-slate-950 dark:text-slate-50 dark:border-slate-50 text-decoration-line: underline">Quests</h2>
                    <div>
                         <QuestColumns monsterquests={monsterquests} screenWidth={screenWidth}/>
                    </div>
                </div>
                <div className={`p-10 `}>
                    <h2 className="text-4xl font-bold text-center text-slate-950 dark:text-slate-50 dark:border-slate-50 text-decoration-line: underline">Hitzones</h2>
                    <div>
                        <HitzoneColumns monsterhitzones={monsterhitzones} screenWidth={screenWidth}/>
                    </div>
                </div>
                {/* {need to fix the filter for drops table} */}
                <div className={`p-10 `}>
                    <h2 className="text-4xl font-bold text-center text-slate-950 dark:text-slate-50 dark:border-slate-50 text-decoration-line: underline">Drops</h2>
                    <div>
                        <DropColumns monsterdrops={monsterdrops} screenWidth={screenWidth}/>
                    </div>
                </div>
                {/* {might need to change heights of these tables since it looks weird
                when their heights are inconsistent} */}
               <div className={`p-10 `}>
                    <h2 className="text-4xl font-bold text-center text-slate-950 dark:text-slate-50 dark:border-slate-50 text-decoration-line: underline">Weapon Forging</h2>
                    <div>
                        <WeaponColumns monsterweapons={monsterforgingweapons} screenWidth={screenWidth}/>
                    </div>
                </div>
                <div className={`p-10 `}>
                    <h2 className="text-4xl font-bold text-center text-slate-950 dark:text-slate-50 dark:border-slate-50 text-decoration-line: underline">Weapon Upgrades</h2>
                    <div>
                        <WeaponColumns monsterweapons={monsterupgradeweapons} screenWidth={screenWidth}/>
                    </div>
                </div>
                <div className={`p-10 `}>
                    <h2 className="text-4xl font-bold text-center text-slate-950 dark:text-slate-50 dark:border-slate-50 text-decoration-line: underline">Armour</h2>
                    <div>
                        <ArmourColumns monsterarmour={monsterarmour} screenWidth={screenWidth}/>
                    </div>
                </div>
            </div>
        </div>

    );
};