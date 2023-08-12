import React from "react";
import Weapon from "../../components/weapons/weapon";
import { Box } from "@mui/material";

function WeaponPage() {
    return (
        <div className="weapon">
            <Box m={10}>
                <Weapon />
            </Box>
        </div>
    );
}

export default WeaponPage;
