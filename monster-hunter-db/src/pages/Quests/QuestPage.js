import React from "react";
import Quest from "../../components/quests/quest";
import { Box } from "@mui/material";

function QuestPage() {
    return (
        <div className="quest">
            <Box m={10}>
                <Quest />
            </Box>
        </div>
    );
}

export default QuestPage;
