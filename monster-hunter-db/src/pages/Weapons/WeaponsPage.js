import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import Weapons from "../../components/weapons/weapons";
import {Box} from "@mui/material";
import Monsters from "../../components/monsters/monsters";
import { WeaponsNav } from '../../components/weapons/weaponnavdata';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import { navItems } from "../../components/navbar/NavItems";
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transition } from '@headlessui/react'
import { getWeaponIcon } from '../../components/weapons/getWeaponIcon';

function WeaponsPage() {
    // const weaponType = useLocation().state.weaponid;
    // console.log(weaponType);
    const { weapon_type } = useParams();
    const weaponItem = WeaponsNav.find(item => item.path === `/weapons/${weapon_type}`); 
    const id = weaponItem ? weaponItem.id : null;
    const [selectedButton, setSelectedButton] = useState(id);
    // const [fade, setFade] = useState(true);
    const [isNavVisible, setIsNavVisible] = useState(true);
   

    const handleButtonClick = (buttonValue) => {
        setSelectedButton(buttonValue); // Set the selected button value
        // setFade(true)
        // if (buttonValue === 'All') {
        // setTimeout(() => {
        //     setFade(false);
        //     }, 100);
    };

    const handleNavButtonClick = (buttonValue) => {
        // ... your existing code
    
        // Toggle the visibility of the navigation element
        setIsNavVisible(!isNavVisible);
    };

    const weaponmapping = {
        "Great Sword": "GS",
        "Sword and Shield": "SNS",
        "Dual Blades": "DBS",
        "Long Sword": "LS",
        "Hammer": "HAM",
        "Hunting Horn": "HH",
        "Lance": "LANCE",
        "Gunlance": "GL",
        "Switch Axe": "SA",
        "Charge Blade": "CB",
        "Insect Glaive": "IG",
        "Bow": "BOW",
        "Light Bowgun": "LBG",
        "Heavy Bowgun": "HBG"
    }

    return(
        <div className="weapons">
            {/* <h1>Weapons</h1> */}
            {/* <Box m={10}> */}
                {/* <Weapons weaponType={weaponType}/> */}
                <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-2 xl:px-8 ">
                {/* <MonsterTypeNav setDisplayMonsters={setDisplayMonsters} setSelectedButton={setSelectedButton}/> */}
                <div className={`lg:relative`}>           
                    <div className={`sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] py-16 pl-0.5 flex`}>
                        <Transition 
                            appear={true} 
                            show={isNavVisible}
                            enter="transition duration-200 ease-in-out transform"
                            enterFrom="-translate-x-full opacity-0"
                            enterTo="translate-x-0 opacity-100"
                            leave="transition duration-100 ease-in-out transform"
                            leaveFrom="translate-x-0 opacity-100"
                            leaveTo="-translate-x-full opacity-0"
                        >
                            <nav className={`text-base w-60 mr-2 h-full`}>
                                <ul className={`mt-2 space-y-2 border-l-2 border-slate-950 dark:border-white lg:mt-4 lg:space-y-4 w-full p-2 h-full overflow-y-auto`}>
                                {navItems[2].subnav.map((weapontype) => (
                                    <li className="relative w-full" key={weapontype.title}>
                                        {selectedButton === weapontype.id ? (
                                            <span>
                                                <p
                                                    className="text-blue-900 font-bold dark:text-slate-400 dark:before:bg-slate-700"
                                                    // onClick={() => handleButtonClick(monstertype.title)}
                                                >
                                                <div className="flex items-center">
                                                        <img className="w-10 h-10 mr-2" src={getWeaponIcon(weaponmapping[weapontype.title])} alt="" />
                                                        {weapontype.title}
                                                    </div>
                                                </p>
                                            </span>
                                        ) : (
                                            <Link to={weapontype.path}>
                                                <button
                                                    className="text-slate-950 hover:text-slate-600 font-bold dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                                                    onClick={() => {
                                                        handleButtonClick(weapontype.id);
                                                    }}
                                                >
                                                    <div className="flex items-center">
                                                        <img className="w-10 h-10 mr-2" src={getWeaponIcon(weaponmapping[weapontype.title])} alt="" />
                                                        {weapontype.title}
                                                    </div>
                                                </button>
                                            </Link>
                                        )}
                                    </li>
                                ))}

                                </ul>
                            </nav>
                        </Transition>
                        
                        <div className="flex items-center ml-auto"> {/* Flex container */}
                            {isNavVisible ? (
                                <FontAwesomeIcon icon={faChevronLeft} onClick={handleNavButtonClick} className="bg-slate-950 hover:bg-blue-800 p-4 text-white rounded-full cursor-pointer" />
                            ) : (
                                <FontAwesomeIcon icon={faChevronRight} onClick={handleNavButtonClick} className="bg-slate-950 hover:bg-blue-800 p-4 text-white rounded-full cursor-pointer" />
                            )}
                        </div>
                    </div>

                </div>
                
                <div className={` min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16`}>
                    {/* {id === 2 && <Followers/>} */}
                    <Weapons id={id}/>
                </div>
               
                
            </div>
                
            {/* </Box> */}
        </div>
    )
}

export default WeaponsPage;