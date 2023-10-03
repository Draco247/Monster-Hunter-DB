import {Box} from "@mui/material";
import Monster from "../../components/monsters/monster";
import React from "react";

function MonsterPage() {
    return (
        <div className="monster">
            {/* <Box m={10}> */}
            <div className="h-full">
                <Monster/>
            </div>
                
            {/* </Box> */}
        </div>
    )
}

export default MonsterPage;