import React, {useState} from 'react';
// import Armours from "../../components/armour/armours";
import ArmourSets from "../../components/armour/armourSets";
import {Box, TextField} from "@mui/material";
import {useLocation} from "react-router-dom";
import ArmourSet from "../../components/armour/armourSet";


function ArmourSetPage() {
    // const location = useLocation()
    // // console.log(location)
    // let { armour_pieces } = location.state
    // const { armours } = location.state
    // console.log(armours)
    // armour_pieces = JSON.parse(armour_pieces)
    // console.log(armour_pieces)


    // const handleInputChange = (event) => {
    //     setSearchValue(event.target.value);
    // };
    //
    // const handleSearch = () => {
    //     // Perform search logic with the searchValue
    //     console.log('Search value:', searchValue);
    // };

    return (
        <div className="armour-set">
            <h1>Armour Set</h1>
            {/* <Box m={10}> */}
                <ArmourSet/>
            {/* </Box> */}

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
            {/*<Box m={10}>*/}
            {/*    <ArmourSets searchQuery={searchValue}/>*/}
            {/*</Box>*/}
        </div>
    )
}

export default ArmourSetPage;