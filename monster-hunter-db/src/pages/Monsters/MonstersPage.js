import React, {useState} from 'react';
import Monsters from "../../components/monsters/monsters";
import {Box, TextField} from "@mui/material";

function MonstersPage() {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        // Perform search logic with the searchValue
        console.log('Search value:', searchValue);
    };

    return (
        <div className="monsters">
            <h1>Monsters</h1>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: 500, maxWidth: '100%' }}>
                    <TextField
                        value={searchValue}
                        onChange={handleInputChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        fullWidth
                        label="Search...."
                        id="fullWidth"
                    />
                </Box>
            </Box>
            <Box m={10}>
                <Monsters searchQuery={searchValue} />
            </Box>
        </div>
    )
}

export default MonstersPage;