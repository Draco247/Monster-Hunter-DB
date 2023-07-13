import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import Weapons from "../components/weapons";
import {Box} from "@mui/material";
import Monsters from "../components/monsters";
function WeaponsPage() {
    const weaponType = useLocation().state.weaponid;
    console.log(weaponType);
    return(
        <div className="weapons">
            <h1>Weapons</h1>
            <Box m={10}>
                <Weapons weaponType={weaponType}/>
            </Box>
        </div>
    )
}

export default WeaponsPage;