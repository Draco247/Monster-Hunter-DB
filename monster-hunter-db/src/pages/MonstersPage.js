import React from 'react';
import Monsters from "../components/monsters";
import {Box} from "@mui/material";

function MonstersPage() {
    return (
        <div className="monsters">
            <h1>Monsters</h1>
            <Box m={10}>
                <Monsters/>
            </Box>
        </div>
    )
}

export default MonstersPage;