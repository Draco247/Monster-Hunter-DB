import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { getMonsterIcon } from '../monsters/getMonsterIcon'
import { getQuestIcon } from './getQuestIcon';





const QuestBox = ({quests, quest_lvl}) => {
    console.log(quests)
    console.log(quest_lvl)
    const [hovered, setHovered] = useState(null);
    const { palette } = useTheme();


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
            <div class="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
                {quests.filter(quest => quest.quest_lvl === quest_lvl).map(quest => (
                        <div key={quest.id} className="text-center">
                            <Link to={`/quest/${quest.id}`}>
                                <div class="max-w-sm bg-gray-300 border-3 border-black rounded-lg shadow dark:bg-slate-900 dark:border-gray-700 h-full flex flex-col group hover:bg-slate-700 dark:hover:bg-slate-600">
                                    <img class="mx-auto" src={getQuestIcon(getQuestType(quest))} alt="" />
                                    <div class="px-5 flex-grow">
                                        <h5 class="mb-3 text-slate-950 font-bold dark:text-gray-400">{quest.quest_name}</h5>
                                    </div>
                                    
                                    <div className={`grid gap-4 m-4 ${
                                        quest.monsters.length === 1
                                        ? 'grid-cols-1'
                                        : quest.monsters.length === 2
                                        ? 'grid-cols-2'
                                        : 'grid-cols-3'
                                    }`} >
                                        {quest.monsters.map(monster => (
                                            <img className="mx-auto border-2 border-black rounded-lg h-16 w-16" src={getMonsterIcon(monster.name)} alt="" />
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </div>
                        ))}
            </div>
        
            
    )

}

export default QuestBox;