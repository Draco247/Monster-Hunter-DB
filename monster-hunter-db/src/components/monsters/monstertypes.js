import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { getMonsterIcon } from './getMonsterIcon';
import { Monstertypesinfo } from "./monstertypesinfo";
import { MonsterCard } from "./monstercard";


export default function MonsterTypes({selectedButton, searchQuery, fade}){
    const [monsters, setMonsters] = useState([]);
    console.log(selectedButton)
    const filteredMonsters = monsters.filter((monster) =>
        monster.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    useEffect(() => {
        // fetch(`${process.env.REACT_APP_react_url}/monsters/getAll`, {mode:'cors'})
        //     .then(res => res.json())
        //     .then((result)=> {
        //     setMonsters(result);
        //     console.log(result);
        setMonsters([]);
        fetch(`https://localhost:443/api/v1/monsters/getAll/${selectedButton}`, {mode:'cors'})
            .then(res => res.json())
            .then((result)=> {
            setMonsters(result);
            console.log(result);

            })}, [selectedButton]);
    console.log(filteredMonsters)

    return (
        // need to fix the monster cards so that they always fill their box
        <div className={`flex flex-col items-center justify-center  ${fade === false ? "transition duration-200 ease-in opacity-100" : "opacity-0"}`}>
            <p className="bg-gray-300 dark:bg-slate-900 p-5 border-4 border-black rounded-lg font-bold text-slate-950 dark:text-slate-50">{Monstertypesinfo.find((monstertype) => monstertype.title === selectedButton).description}</p>
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
            <div className="mx-auto w-full">
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