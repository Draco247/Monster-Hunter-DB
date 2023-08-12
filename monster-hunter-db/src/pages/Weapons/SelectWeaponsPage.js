import {Box} from "@mui/material";
import Weapons from "../../components/weapons/weapons";
import React from "react";
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';



function SelectWeaponsPage(props) {
    const [weapontype, setWeapontype] = useState(null)
    const navigate = useNavigate();

    const weapons = {
        "0": "Great Sword",
        "1": "Sword and Shield",
        "2": "Dual Blades",
        "3": "Long Sword",
        "4": "Hammer",
        "5": "Hunting horn",
        "6": "Lance",
        "7": "Gunlance",
        "8": "Switch Axe",
        "9": "Charge Blade",
        "10": "Insect Glaive",
        "11": "Bow",
        "12": "Light Bowgun",
        "13": "Heavy Bowgun",
    }

    const weaponsIcons = {
        "0": "https://i.imgur.com/v7LAKBx.png",
        "1": "https://i.imgur.com/pwEwovP.png",
        "2": "https://i.imgur.com/MejhBHe.png",
        "3": "https://i.imgur.com/E75NW6c.png",
        "4": "https://i.imgur.com/3xbUPuV.png",
        "5": "https://i.imgur.com/DaThhYu.png",
        "6": "https://i.imgur.com/qWEBjo8.png",
        "7": "https://i.imgur.com/fwjewam.png",
        "8": "https://i.imgur.com/wmnbvT1.png",
        "9": "https://i.imgur.com/7Hnkvrf.png",
        "10": "https://i.imgur.com/Yb5jw1J.png",
        "11": "https://i.imgur.com/ZBn2Lfc.png",
        "12": "https://i.imgur.com/BhHAGA6.png",
        "13": "https://i.imgur.com/loXyOgZ.png",
    }

    const selectWeapon = (weapon)=>{
        setWeapontype(weapon)
        navigate(`/weapons/${weapon}`,{state:{weaponid:weapon}})
        console.log(weapon)
    }

    return (
        <div className="select-weapon">
            <h1>Weapons</h1>
            <Box m={4}>
                <Grid container spacing={2}>
                    {Object.keys(weapons).map(key => (
                        <Grid item xs={2} key={key}>
                            <Button
                                variant="outlined"
                                onClick={() => selectWeapon(key)}
                                sx={{
                                    width: '100%',
                                    textAlign: 'left',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 50,
                                            width: 50,
                                        }}
                                        alt=""
                                        src={weaponsIcons[key]}
                                    />
                                    {weapons[key]}
                                </Box>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export default SelectWeaponsPage;