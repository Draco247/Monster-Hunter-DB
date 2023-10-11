import React, {useState} from 'react';
import Items from "../../components/items/items";
import {Box, TextField} from "@mui/material";
import { useParams } from "react-router-dom";

function ItemsPage() {
    const { item_type } = useParams();
    console.log(item_type)

    // stupid name but couldn't think of better one
    // const itemItem = Sidebar[2].subNav.find(item => item.path === `/items/${item_type}`);
    // const id = itemItem ? itemItem.id : null;

    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        // Perform search logic with the searchValue
        console.log('Search value:', searchValue);
    };

    return (
        <div className="items">
            <h1>Items</h1>
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
            {/* <Box m={10}> */}
            <div className="p-10">
                <Items searchQuery={searchValue} item_type={item_type}/>
            </div>
                
            {/* </Box> */}
        </div>
    )
}

export default ItemsPage;