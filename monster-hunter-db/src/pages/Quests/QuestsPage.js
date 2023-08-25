import React from 'react';
import Quests from "../../components/quests/quests";
import {Box} from "@mui/material";
import { useParams } from "react-router-dom";

function QuestsPage() {
    // const { id } = useParams();
    
    return (
        <div className="quests">
            <h1>Quests</h1>
            <Box m={10}>
                <Quests/>
            </Box>
        </div>
    )
}

export default QuestsPage;