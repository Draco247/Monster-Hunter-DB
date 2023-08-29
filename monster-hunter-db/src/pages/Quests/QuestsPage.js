import React from 'react';
import Quests from "../../components/quests/quests";
import {Box} from "@mui/material";
import { useParams } from "react-router-dom";
import { Sidebar } from "../../components/navbar/sidebar";

function QuestsPage() {
    // const { id } = useParams();
    const { quest_type } = useParams();

    // Now you have the 'quest_type' value, you can determine the 'id' based on it
    // console.log(Sidebar[2].subNav)
    const questItem = Sidebar[2].subNav.find(item => item.path === `/quests/${quest_type}`);
    const id = questItem ? questItem.id : null;
    
    return (
        <div className="quests">
            <h1>Quests</h1>
            <Box m={10}>
                <Quests id={id}/>
            </Box>
        </div>
    )
}

export default QuestsPage;