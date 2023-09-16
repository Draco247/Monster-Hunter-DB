import * as React from 'react';
import './quests.css';
import {useState, useEffect} from "react";
import { Grid,Box } from '@mui/material';
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import QuestBox from './questbox'
import { getQuestIcon } from './getQuestIcon';



export default function Quests({id}) {
    // const id = useSelector(state => state.id); 
    console.log(id)
    const [quests, setQuests] = useState([]);

    // const columns = ["Locale", "Quest","Objective", "HRP", "MRP"];
    const columns = [
        { field: 'quest_name', headerName: 'Quest', flex:1, sortable: true,
        renderCell: (params) => {
            const questTypeKeywords = ['hunt', 'capture', 'slay','deliver']; 
            const questTypeMatches = questTypeKeywords.filter(keyword =>
                params.row.objective.toLowerCase().includes(keyword)
            );

            const isArena = /^arena \d+★/.test(params.row.quest_name.toLowerCase()) // check if quest name starts with arena *star to display arena icon

            const questType =
                isArena
                    ? 'Arena'
                    : questTypeMatches.length > 1
                    ? 'Endurance'
                    : 'Deliver'
                    ? 'Gathering'
                    : questTypeMatches.length === 1
                    ? questTypeMatches[0]
                    : 'Other';

            const questIcon = getQuestIcon(questType);

            return (
                <div>
                    {questIcon && (
                        <img src={questIcon} alt={questType} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    )}
                    <Link to={`/quest/${params.row.id}`}>
                        {params.row.quest_name}
                    </Link>
                </div>
                );
            },
        },
        { field: 'objective', headerName: 'Objective', flex: 1},
        { field: 'hrp', headerName: 'HRP', flex:0.3, sortable: true},
        { field: 'mrp', headerName: 'MRP', flex:0.3, sortable: true}
    ];


    useEffect(() => {
        setQuests([])
        fetch(`${process.env.REACT_APP_react_url}/quests/quest_type/${id}`)
            .then(res => res.json())
            .then((result)=> {
                setQuests(result);
            })}, [id]);
    console.log(quests);

    
    return (
        <div>
            {id === 6 && (
                <div className="quests">
                    <h1>Village</h1>
                    <div className="★1 Quests">
                        <h2>★1 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★1"/>
                    </div>
                    <div className="★2 Quests">
                        <h2>★2 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★2"/>
                    </div>
                    <div className="★3 Quests">
                        <h2>★3 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★3"/>
                    </div>
                    <div className="★4 Quests">
                        <h2>★4 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★4"/>
                    </div>
                    <div className="★5 Quests">
                        <h2>★5 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★5"/>
                    </div>
                    <div className="★6 Quests">
                        <h2>★6 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★6"/>
                    </div>
                </div>
               
            )}
            {id === 5 && (
                <div className="quests">
                    <h1>Hub Low Rank</h1>
                    <div className="★1 Quests">
                        <h2>★1 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★1"/>
                    </div>
                    <div className="★2 Quests">
                        <h2>★2 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★2"/>
                    </div>
                    <div className="★3 Quests">
                        <h2>★3 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★3"/>
                    </div>
                </div>
               
            )}
            {id === 4 && (
                <div className="quests">
                    <h1>Hub High Rank</h1>
                    <div className="★4 Quests">
                        <h2>★4 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★4"/>
                    </div>
                    <div className="★5 Quests">
                        <h2>★5 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★5"/>
                    </div>
                    <div className="★6 Quests">
                        <h2>★6 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★6"/>
                    </div>
                    <div className="★7 Quests">
                        <h2>★7 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★7"/>
                    </div>
                </div>
               
            )}
            {id === 3 && (
                <div className="quests">
                    <h1>Hub Master Rank</h1>
                    <div className="M★1 Quests">
                        <h2>M★1 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★1"/>
                    </div>
                    <div className="M★2 Quests">
                        <h2>M★2 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★2"/>
                    </div>
                    <div className="M★3 Quests">
                        <h2>M★3 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★3"/>
                    </div>
                    <div className="M★4 Quests">
                        <h2>M★4 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★4"/>
                    </div>
                    <div className="M★5 Quests">
                        <h2>M★5 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★5"/>
                    </div>
                    <div className="M★6 Quests">
                        <h2>M★6 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★6"/>
                    </div>
                </div>
               
            )}
            {id === 2 && (
                <div className="quests">
                    <h1>Follower Quests</h1>
                    <div className="M★2 Quests">
                        <h2>M★2 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★2"/>
                    </div>
                    <div className="M★3 Quests">
                        <h2>M★3 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★3"/>
                    </div>
                    <div className="M★4 Quests">
                        <h2>M★4 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★4"/>
                    </div>
                    <div className="M★5 Quests">
                        <h2>M★5 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★5"/>
                    </div>
                    <div className="M★6 Quests">
                        <h2>M★6 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★6"/>
                    </div>
                </div>
               
            )}
            {id === 1 && (
                <div className="quests">
                    <h1>Anomaly Quests</h1>
                    <div className="A★1 Quests">
                        <h2>A★1 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="A★1"/>
                    </div>
                    <div className="A★2 Quests">
                        <h2>A★2 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="A★2"/>
                    </div>
                    <div className="A★3 Quests">
                        <h2>A★3 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="A★3"/>
                    </div>
                    <div className="A★4 Quests">
                        <h2>A★4 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="A★4"/>
                    </div>
                    <div className="A★5 Quests">
                        <h2>A★5 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="A★5"/>
                    </div>
                    <div className="A★6 Quests">
                        <h2>A★6 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="A★6"/>
                    </div>
                    <div className="A★7 Quests">
                        <h2>A★7 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="A★7"/>
                    </div>
                    <div className="A★8 Quests">
                        <h2>A★8 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="A★8"/>
                    </div>
                    <div className="A★9 Quests">
                        <h2>A★9 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="A★9"/>
                    </div>
                </div>
               
            )}
            {id === 0 && (
                <div className="quests">
                    <h1>Event Quests</h1>
                    <div className="★1 Quests">
                        <h2>★1 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★1"/>
                    </div>
                    <div className="★2 Quests">
                        <h2>★2 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★2"/>
                    </div>
                    <div className="★3 Quests">
                        <h2>★3 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★3"/>
                    </div>
                    <div className="★4 Quests">
                        <h2>★4 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★4"/>
                    </div>
                    <div className="★5 Quests">
                        <h2>★5 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★5"/>
                    </div>
                    <div className="★6 Quests">
                        <h2>★6 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★6"/>
                    </div>
                    <div className="★7 Quests">
                        <h2>★7 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="★7"/>
                    </div>
                    <div className="M★1 Quests">
                        <h2>M★1 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★1"/>
                    </div>
                    <div className="M★2 Quests">
                        <h2>M★2 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★2"/>
                    </div>
                    <div className="M★3 Quests">
                        <h2>M★3 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★3"/>
                    </div>
                    <div className="M★4 Quests">
                        <h2>M★4 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★4"/>
                    </div>
                    <div className="M★5 Quests">
                        <h2>M★5 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★5"/>
                    </div>
                    <div className="M★6 Quests">
                        <h2>M★6 Quests</h2>
                        <QuestBox quests={quests} quest_lvl="M★6"/>
                    </div>
                </div>
               
            )}
        </div>

    );
}