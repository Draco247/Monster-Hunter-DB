import React, {useState} from 'react';
import Monsters from "../../components/monsters/monsters";
import {Box, TextField} from "@mui/material";
import { Link } from 'react-router-dom'; 
import MonsterTypes from '../../components/monsters/monstertypes';
import { Monstertypesinfo } from '../../components/monsters/monstertypesinfo';
import { Transition } from '@headlessui/react'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function MonstersPage() {
    const [searchValue, setSearchValue] = useState('');
    const [displayMonsters, setDisplayMonsters] = useState(true);
    const [selectedButton, setSelectedButton] = useState('All');
    const [isNavVisible, setIsNavVisible] = useState(true);

    // const [isShowing, setIsShowing] = useState(true)
    const [fade, setFade] = useState(true);
    setTimeout(() => {
        setFade(false);
      }, 100);

    const handleButtonClick = (buttonValue) => {
        setSelectedButton(buttonValue); // Set the selected button value
        setFade(true)
        if (buttonValue === 'All') {
            setTimeout(() => {
                setFade(false);
              }, 100);
            setDisplayMonsters(true); // Show Monsters component
        } else {
            setTimeout(() => {
                setFade(false);
              }, 100);
            //   setFade(!fade);
            setDisplayMonsters(false); // Hide Monsters component
        }

         // Toggle the fade state
    };

    const handleNavButtonClick = (buttonValue) => {
        // ... your existing code
    
        // Toggle the visibility of the navigation element
        setIsNavVisible(!isNavVisible);
    };
    

    // const toggleFade = () => {
    //     setFade(!fade); // Toggle the fade state
    // }

      
      const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        // Perform search logic with the searchValue
        console.log('Search value:', searchValue);
    };

   
    // console.log(isShowing)
    console.log(fade)
    return (
        <div className="monsters">
            <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-2 xl:px-8 ">
                {/* <MonsterTypeNav setDisplayMonsters={setDisplayMonsters} setSelectedButton={setSelectedButton}/> */}
                <div className={`lg:relative`}>
                    
                    <div className={`sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] py-16 pl-0.5 flex`}>
                        <nav className={`text-base w-36 ${isNavVisible ? 'mr-2 transition-all duration-500 -left-36' : 'hidden transition duration-150 ease-out'}`}>
                            <ul className={`mt-2 space-y-2 border-l-2 border-slate-950 dark:border-white lg:mt-4 lg:space-y-4 w-full p-2`}>
                                {Monstertypesinfo.map((monstertype) => (
                                    <li className="relative w-full" key={monstertype.title}>
                                        {selectedButton === monstertype.title ? (
                                            <span>
                                                <p
                                                    className="text-blue-900 font-bold dark:text-slate-400 dark:before:bg-slate-700"
                                                    // onClick={() => handleButtonClick(monstertype.title)}
                                                >
                                                    {monstertype.title}
                                                </p>
                                            </span>
                                        ) : (
                                            <Link to={monstertype.path}>
                                                <button
                                                    className="text-slate-950 hover:text-slate-600 font-bold dark:text-slate-400 dark:before:bg-slate-700"
                                                    onClick={() => handleButtonClick(monstertype.title)}
                                                >
                                                    {monstertype.title}
                                                </button>
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="flex items-center ml-auto"> {/* Flex container */}
                            <FontAwesomeIcon icon={faChevronRight} onClick={handleNavButtonClick} className="bg-slate-950 hover:bg-slate-800 p-4 text-white rounded-full cursor-pointer" />
                        </div>
                    </div>

                </div>
                
                <div className={` min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16`}>
                    {displayMonsters ? (
                        <Monsters searchQuery={searchValue} fade={fade}/>
                    ) : (
                        <MonsterTypes selectedButton={selectedButton} searchQuery={searchValue} fade={fade}/> // Replace with your new component
                    )}
                </div>
               
                
            </div>
            
        </div>
    )
}

export default MonstersPage;