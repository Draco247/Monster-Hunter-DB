import * as React from 'react';
// import './monsters.css'
import {useState, useEffect} from "react";
import { Link } from "react-router-dom"
import { getMonsterIcon } from './getMonsterIcon';
import { MonsterCard } from './monstercard';

export default function Monsters({ searchQuery, fade }) {
    const [monsters, setMonsters] = useState([]);
    // const [hoveredCard, setHoveredCard] = useState(null);
    const filteredMonsters = monsters.filter((monster) =>
        monster.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
    // const apipath = process.env
    // console.log(apipath)

    useEffect(() => {
        // fetch(`${process.env.REACT_APP_react_url}/monsters/getAll`, {mode:'cors'})
        //     .then(res => res.json())
        //     .then((result)=> {
        //     setMonsters(result);
        //     console.log(result);
        fetch(`https://localhost:443/api/v1/monsters/getAll`, {mode:'cors'})
            .then(res => res.json())
            .then((result)=> {
            setMonsters(result);
            console.log(result);
            // setIsShowing(true);
            })}, []);

    return (
        // need to fix the monster cards so that they always fill their box
        <div className={`flex flex-col items-center justify-center  ${fade === false ? "transition duration-200 ease-in opacity-100" : "opacity-0"}`}>
            <div className="mx-auto w-full">
            {filteredMonsters
                .filter((monster) => monster.monster_size === "large")
                .length > 0 && (
                <>
                <h2 className="text-2xl text-center font-bold mb-4 border-b-4 border-slate-950 text-slate-950 dark:text-slate-50 dark:border-slate-50">Large Monsters</h2>

                <br />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {filteredMonsters
                    .filter((monster) => monster.monster_size === "large")
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((monster) => (
                        <MonsterCard monster={monster}/>
                    ))}
                </div>
                </>
            )}
            </div>
            <div className="mx-auto mt-4 w-full">
                {filteredMonsters
                    .filter((monster) => monster.monster_size === "small")
                    .length > 0 && (
                    <>
                    <h2 className="text-2xl text-center font-bold mb-4 border-b-4 border-slate-950 text-slate-950 dark:text-slate-50 dark:border-slate-50">Small Monsters</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {filteredMonsters
                        .filter((monster) => monster.monster_size === "small")
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((monster) => (
                            <MonsterCard monster={monster}/>
                            
                        ))}
                    </div>
                    </>
                )}
                </div>
        </div>
    );
}