import {Box} from "@mui/material";
import Monster from "../../components/monsters/monster";
import React from "react";

function MonsterPage() {
    return (
        <div className="monster">
            <Box m={10}>
                <Monster/>
            </Box>
        </div>
    )
}

export default MonsterPage;