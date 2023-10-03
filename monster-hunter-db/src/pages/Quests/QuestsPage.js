import React from 'react';
import Quests from "../../components/quests/quests";
import {Box} from "@mui/material";
import { useParams } from "react-router-dom";
import { navItems } from "../../components/navbar/NavItems";

function QuestsPage() {
    // const { id } = useParams();
    const { quest_type } = useParams();

    // Now you have the 'quest_type' value, you can determine the 'id' based on it
    // console.log(Sidebar[2].subNav)
    const questItem = navItems[1].subnav.find(item => item.path === `/quests/${quest_type}`);
    const id = questItem ? questItem.id : null;
    
    return (
        <div className="quests">
            <Quests id={id}/>
            {/* <Box m={10}>
                <Quests id={id}/>
            </Box> */}
        </div>
    )
}

export default QuestsPage;