import React, {useState} from 'react';
import Skills from "../../components/Skills/Skills";
import {Box, TextField} from "@mui/material";

function SkillsPage() {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        // Perform search logic with the searchValue
        console.log('Search value:', searchValue);
    };

    return (
        <div className="armour-skills">
            <h1>Skills</h1>
            {/*<Box sx={{ display: 'flex', justifyContent: 'center' }}>*/}
            {/*    <Box sx={{ width: 500, maxWidth: '100%' }}>*/}
            {/*        <TextField*/}
            {/*            value={searchValue}*/}
            {/*            onChange={handleInputChange}*/}
            {/*            onKeyDown={(event) => {*/}
            {/*                if (event.key === 'Enter') {*/}
            {/*                    handleSearch();*/}
            {/*                }*/}
            {/*            }}*/}
            {/*            fullWidth*/}
            {/*            label="Search...."*/}
            {/*            id="fullWidth"*/}
            {/*        />*/}
            {/*    </Box>*/}
            {/*</Box>*/}
            <Box m={10}>
                <Skills searchQuery={searchValue}/>
            </Box>
        </div>
    )
}

export default SkillsPage;