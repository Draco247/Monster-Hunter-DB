import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import Weapons from "../../components/weapons/weapons";
import {Box} from "@mui/material";
import Monsters from "../../components/monsters/monsters";
import { WeaponsNav } from '../../components/weapons/weaponnavdata';
import { useParams } from 'react-router-dom';

function WeaponsPage() {
    // const weaponType = useLocation().state.weaponid;
    // console.log(weaponType);
    const { weapon_type } = useParams();
    const weaponItem = WeaponsNav.find(item => item.path === `/weapons/${weapon_type}`);
    const id = weaponItem ? weaponItem.id : null;
    console.log(id);
    return(
        <div className="weapons">
            <h1>Weapons</h1>
            <Box m={10}>
                {/* <Weapons weaponType={weaponType}/> */}
                <Weapons id={id}/>
            </Box>
        </div>
    )
}

export default WeaponsPage;