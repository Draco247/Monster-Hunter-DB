import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { getMonsterIcon } from '../monsters/getMonsterIcon'
import { getQuestIcon } from './getQuestIcon';
import { getWeaponIcon } from '../weapons/getWeaponIcon';
import { getItemIcon } from '../items/getItemIcon';





const QuestBox = ({quests, quest_lvl, id}) => {
    console.log(quests)
    console.log(quest_lvl)
    // const [hovered, setHovered] = useState(null);
    // const { palette } = useTheme();
    console.log(id)

    const weaponmapping = {
        "Great Sword": "GS",
        "Sword and Shield": "SNS",
        "Dual Blades": "DBS",
        "Long Sword": "LS",
        "Hammer": "HAM",
        "Hunting Horn": "HH",
        "Lance": "LANCE",
        "Gunlance": "GL",
        "Switch Axe": "SA",
        "Charge Blade": "CB",
        "Insect Glaive": "IG",
        "Bow": "BOW",
        "Light Bowgun": "LBG",
        "Heavy Bowgun": "HBG"
    }

    const getQuestType = (quest) => {
        // will add rampage once i can find the icon
        const questTypeKeywords = ['hunt all', 'slay all', 'hunt', 'capture', 'slay','deliver']; 
        
        const questTypeMatches = questTypeKeywords.filter(keyword =>
            quest.objective.toLowerCase().includes(keyword)
        );
        // console.log(questTypeMatches[0]);

        const isArena = /^arena \d+★/.test(quest.quest_name.toLowerCase()) // check if quest name starts with arena *star to display arena icon

        const questType =
            isArena
                ? 'Arena'
                : questTypeMatches.includes('hunt all')  || questTypeMatches.includes('slay all')
                ? 'Endurance'
                : questTypeMatches.includes('deliver')
                ? 'Gathering'
                : questTypeMatches.includes('deliver')
                ? 'Gathering'
                : questTypeMatches.length === 1
                ? questTypeMatches[0]
                : 'Hunt';
    
    //    console.log(questType);
       return questType;
    };

    const questIcon = (quest) => getQuestIcon(getQuestType(quest));

    return (
        <div>
            {quests.length > 0 && id === 7 && (
                <div className="">
                    {quests.map(quest => (
                        <div className="bg-slate-50 dark:bg-slate-950 my-10 border-2 border-slate-950 dark:border-slate-50 rounded-md">
                            <div className="flex items-center justify-center border-b-2 border-slate-950 dark:border-slate-50">
                                <h2 className="text-center pt-2 font-bold">{quest.quest_name}</h2>
                            </div>
                           
                            <div className="flex">
                                <div className="w-1/3">
                                    <p className="text-center font-bold pt-2">{quest.objective}</p>
                                    {quests.weapons && (
                                        <div className={`grid gap-4 p-4 ${
                                            JSON.parse(quest.weapons.length) === 1
                                            ? 'grid-cols-1'
                                            : JSON.parse(quest.weapons.length) === 2
                                            ? 'grid-cols-2'
                                            : 'grid-cols-3'
                                        }`}>
                                            {JSON.parse(quest.weapons).map((weapon, index) => (
                                                <img className="mx-auto border-2 border-slate-950 dark:border-slate-50 rounded-lg h-16 w-16" src={getWeaponIcon(weaponmapping[weapon])} alt="" key={index} />
                                            ))}
                                        </div>
                                    )}
                                    
                                    
                                </div>
                                
                                <div className={`w-2/3 grid gap-0 m-4 ${
                                    quest.monsters.length === 1
                                    ? 'grid-cols-1'
                                    : quest.monsters.length === 2
                                    ? 'grid-cols-2'
                                    : 'grid-cols-3'
                                }`}>
                                    {quest.monsters.map(monster => (
                                        <img className="mx-auto border-2 border-slate-950 dark:border-slate-50 rounded-lg h-64 w-64" src={getMonsterIcon(monster.name)} alt="" key={monster.id} />
                                    ))}
                                </div>
                            </div>
                            {quest.rewards && (
                                <div className="border-t-2 border-slate-950 dark:border-slate-50">
                                        <div>
                                            {/* <img src={getItemIcon(reward.Item)}/>
                                            <p key={index}>{reward.Item}</p>
                                            <p>{reward.Quantity}</p>
                                            <p>{reward.Chance}</p> */}
                                            <table className="border-collapse table-auto w-full text-sm ">
                                                <thead className="bg-slate-400 dark:bg-slate-900"> 
                                                    <tr>
                                                        <th className="border-b border-slate-950 dark:border-slate-600 font-bold p-4 text-slate-950 dark:text-slate-200 text-left">Item</th>
                                                        <th className="border-b border-slate-950 dark:border-slate-600 font-bold p-4 text-slate-950 dark:text-slate-200 text-left">Quantity</th>
                                                        <th className="border-b border-slate-950 dark:border-slate-600 font-bold p-4 text-slate-950 dark:text-slate-200 text-left">Chance</th>
                                                    </tr>
                                                </thead>

                                                <tbody className=" bg-slate-200 dark:bg-slate-800">
                                                    {JSON.parse(quest.rewards).map((reward, index) => (
                                                        <tr>
                                                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-800 dark:text-slate-500 dark:text-slate-400 flex items-center">
                                                                <img src={getItemIcon(reward.Item)} alt={reward.Item} className="mr-2" />
                                                                {reward.Item}
                                                            </td>

                                                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-800 dark:text-slate-500 dark:text-slate-400">{reward.Quantity}</td>
                                                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-800 dark:text-slate-500 dark:text-slate-400">{reward.Chance}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                </div> 
                            )}
                            

                            
                        </div>
                    ))}
                </div>
            )}
            {quests.length > 0 && id !== 7 && (
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
                    {quests.filter(quest => quest.quest_lvl === quest_lvl).map(quest => (
                        <div key={quest.id} className="text-center">
                            <Link to={`/quest/${quest.id}`}>
                                <div className="max-w-sm bg-gray-300 border-3 border-black rounded-lg shadow dark:bg-slate-900 dark:border-gray-700 h-full flex flex-col group hover:bg-slate-700 dark:hover:bg-slate-600">
                                    <img className="mx-auto" src={getQuestIcon(getQuestType(quest))} alt="" />
                                    <div className="p-5 flex-grow items-center flex flex-col justify-center">
                                        <h5 className="mb-3 font-bold text-gray-950 dark:text-gray-400 text-center">
                                            {quest.quest_name}
                                        </h5>
                                    </div>
    
                                    <div className={`grid gap-4 m-4 ${
                                        quest.monsters.length === 1
                                        ? 'grid-cols-1'
                                        : quest.monsters.length === 2
                                        ? 'grid-cols-2'
                                        : 'grid-cols-3'
                                    }`} >
                                        {quest.monsters.map(monster => (
                                            <img className="mx-auto border-2 border-black rounded-lg h-16 w-16" src={getMonsterIcon(monster.name)} alt="" key={monster.id} />
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
    

}

export default QuestBox;