import {Box} from "@mui/material";
import Item from "../components/item";
import React from "react";

function ItemPage() {
    return (
        <div className="item">
            <h1>Item</h1>
            <Box m={10}>
                <Item/>
            </Box>
        </div>
    )
}

export default ItemPage;