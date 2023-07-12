import React from "react";
import Quest from "../components/quest";
import { Box } from "@mui/material";

function QuestPage() {
    return (
        <div className="quest">
            <h1>Quest</h1>
            <Box m={10}>
                <Quest />
            </Box>
        </div>
    );
}

export default QuestPage;
