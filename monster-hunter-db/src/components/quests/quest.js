import * as React from 'react';
import './quest.css';
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import { getLocationImage } from './getLocationImage';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from "@mui/material";
import { QuestRewardColumns } from './questrewardscolumns';
import { QuestMonsterCard } from './questmonstercard';





export default function Quest() {
    const { id } = useParams();
    console.log(id);
    const [quest, setQuest] = useState(null);
    const [questrewards, setQuestrewards] = useState([]);
    const [questminicrowns, setQuestminicrowns] = useState([]);
    const [questkingcrowns, setQuestkingcrowns] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const { palette } = useTheme();

    
    const datagridSx = {
        border: palette.borderColour.MUIDataGrid,
        borderRadius: '5px',
        '.centered-cell': { justifyContent: 'center' },
        "& .MuiDataGrid-columnHeaders": {
        backgroundColor: palette.background.MuiDataGridcolumnHeaders,
        fontSize: 16
        },
        "& .MuiDataGrid-row": {
            backgroundColor: palette.background.MuiDataGridrow,
            transition: 'background-color 0.3s ease',
        },
        '& .MuiDataGrid-row:hover': {
            backgroundColor: palette.background.MuiDataGridrow
          },
    };

    useEffect(() => {
        const fetchQuest = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/quests/${id}`);
                const data = await response.json();
                setQuest(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching quest:', error);
            }
        };

        const fetchQuestRewards = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/quests/${id}/rewards`);
                const data = await response.json();
                setQuestrewards(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching quest rewards:', error);
            }
        };

        const fetchQuestMiniCrowns = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/quests/${id}/mini_crown`);
                const data = await response.json();
                setQuestminicrowns(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching quest mini crowns:', error);
            }
        };

        const fetchQuestKingCrowns = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/quests/${id}/king_crown`);
                const data = await response.json();
                setQuestkingcrowns(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching quest king crowns:', error);
            }
        };
        fetchQuest();
        fetchQuestRewards();
        fetchQuestMiniCrowns();
        fetchQuestKingCrowns();
    }, [id]);


    if (!quest) {
        return <div>Loading...</div>;
    }

    if (!questrewards) {
        return <div>Loading...</div>;
    }


    const generateUniqueID = () => {
        return uuidv4(); // Generates a random UUID (unique identifier)
    };

    return (
        <div>
            <div className="flex justify-center">
                <h1 className="text-4xl pt-5 font-bold mb-4 border-b-4 border-slate-950 text-center text-slate-950 dark:text-slate-50 dark:border-slate-50 w-128">{quest.quest_name}</h1>
                <br/>
            </div>
            <div className={`flex justify-center`}>
                <div className="mx-auto p-5">
                    {/* <h2>Large Monsters</h2> */}
                    <br/>
                    <div className="grid grid-cols-4 gap-4">
                        <div className={`col-span-3`}>
                            <img src={getLocationImage(quest.quest_location)} class="mx-auto border-3 border-black rounded-lg" /> 
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="text-center font-bold text-slate-950 dark:text-slate-50">
                                <p>Quest Objective: {quest.objective}</p>
                                <p>Failure Conditions: {quest.failure_conditions}</p>
                                <p>Hunter Rank Points: {quest.hrp}</p>
                                <p>Master Rank Points: {quest.mrp}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
            </div>
            <div className="quest-rewards">
                <h2>Quest Rewards</h2>
                <div className='p-10'>
                    <QuestRewardColumns questrewards={questrewards}/>
                </div>
                {/* <MUIDataTable title={"Quests"} data={tableData} columns={columns} options={options} /> */}
            </div>
            <div className="quest-monsters">
                <h2>Monsters</h2>
                <div className='p-10'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {quest.monsters.map(monster => (
                            <QuestMonsterCard questminicrowns={questminicrowns} questkingcrowns={questkingcrowns} monster={monster}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};