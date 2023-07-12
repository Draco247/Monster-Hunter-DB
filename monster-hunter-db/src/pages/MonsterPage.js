import {Box} from "@mui/material";
import Monster from "../components/monster";
import React from "react";

function MonsterPage() {
    return (
        <div className="monster">
            <h1>Monster</h1>
            <Box m={10}>
                <Monster/>
            </Box>
        </div>
    )
}

export default MonsterPage;