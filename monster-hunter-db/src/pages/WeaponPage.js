import React from "react";
import Weapon from "../components/weapon";
import { Box } from "@mui/material";

function WeaponPage() {
    return (
        <div className="weapon">
            <h1>Weapon</h1>
            <Box m={10}>
                <Weapon />
            </Box>
        </div>
    );
}

export default WeaponPage;
