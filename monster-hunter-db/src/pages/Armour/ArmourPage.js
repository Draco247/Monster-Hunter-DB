import {Box} from "@mui/material";
import Armour from "../../components/armour/armour";
import React from "react";

function ArmourPage() {
    return (
        <div className="armour">
            <h1>Armour</h1>
            <Box m={10}>
                <Armour/>
            </Box>
        </div>
    )
}

export default ArmourPage;