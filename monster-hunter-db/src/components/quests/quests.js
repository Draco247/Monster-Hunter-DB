import * as React from 'react';
import './quests.css';
import {useState, useEffect, useLayoutEffect} from "react";
import QuestBox from './questbox'
import { getQuestIcon } from './getQuestIcon';
import Followers from '../followers/followers';



export default function Quests({id}) {
    console.log(id)
    // const id = useSelector(state => state.id); 
    const [quests, setQuests] = useState([]);
    const [fade, setFade] = useState(true);
    const [loaded, setLoaded] = useState(false);
    // setTimeout(() => {
    //     setFade(false);
    //   }, 100);



    useEffect(() => {
        console.log(id)
        // setQuests([])
        setLoaded(false);
        setFade(true);
        if (id === 7) {
            fetch(`https://localhost:443/api/v1/quests/arena-quests`)
                .then(res => res.json())
                .then(result => {
                    setQuests(result);
                    setFade(false); // You can set fade to false here after fetching data
                })
                .catch(error => {
                    console.error("Error fetching arena quests:", error);
                    setFade(false); // Make sure to set fade to false in case of an error
                });
        } else {
            fetch(`https://localhost:443/api/v1/quests/quest_type/${id}`)
                .then(res => res.json())
                .then(result => {
                    setQuests(result);
                    setFade(false); // You can set fade to false here after fetching data
                })
                .catch(error => {
                    console.error(`Error fetching quests for id ${id}:`, error);
                    setFade(false); // Make sure to set fade to false in case of an error
                });
        }
    }, [id]);

    useEffect(() => {
        // Check if all required data objects are available
        if (quests) {
            // If all data is available, set loaded to true
            // console.log(quests)
            setTimeout(() => {
                setLoaded(true);
              }, 500);
        }
        console.log(loaded)
    }, [quests]);

    useLayoutEffect(() => {
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

    
    return (
        <div className={`p-10 ${fade === false ? "transition duration-200 ease-in opacity-100" : "opacity-0"}`}>
            {id === 7 && (
                <div className="quests">
                    <h1 className="text-4xl font-bold text-center">Arena</h1>
                    <QuestBox quests={quests} quest_lvl="" id={id}/>
                </div>
               
            )}
            {id === 6 && (
                <div className="quests">
                    <h1 className="text-4xl font-bold text-center">Village</h1>
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
                    <h1 className="text-4xl font-bold text-center">Hub Low Rank</h1>
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
                    <h1 className="text-4xl font-bold text-center">Hub High Rank</h1>
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
                    <h1 className="text-4xl font-bold text-center">Hub Master Rank</h1>
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
                <div>
                    <Followers fade={fade}/>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-center">Follower Quests</h1>
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
                </div>
                
               
            )}
            {id === 1 && (
                <div className="quests">
                    <h1 className="text-4xl font-bold text-center">Anomaly Quests</h1>
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
                    <h1 className="text-4xl font-bold text-center">Event Quests</h1>
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