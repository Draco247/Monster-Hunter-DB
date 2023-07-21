import React, {useState} from 'react';
import Decoration from "../../components/Skills/Decoration";
import {Box, TextField} from "@mui/material";

function DecorationsPage() {
    return (
        <div className="decoration">
            <h1>Decoration</h1>
            <Box m={10}>
                <Decoration/>
            </Box>
        </div>
    )
}

export default DecorationsPage;