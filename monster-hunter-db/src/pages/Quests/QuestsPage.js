import React, {useState} from 'react';
import Quests from "../../components/quests/quests";
import { Link } from 'react-router-dom'; 
import {Box} from "@mui/material";
import { useParams } from "react-router-dom";
import { navItems } from "../../components/navbar/NavItems";
import Followers from '../../components/followers/followers';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transition } from '@headlessui/react'

function QuestsPage() {
    // const { id } = useParams();
    const { quest_type } = useParams();

    // Now you have the 'quest_type' value, you can determine the 'id' based on it
    // console.log(Sidebar[2].subNav)
    const questItem = navItems[1].subnav.find(item => item.path === `/quests/${quest_type}`);
    const id = questItem ? questItem.id : null;
    const [selectedButton, setSelectedButton] = useState(id);
    // const [fade, setFade] = useState(true);
    const [isNavVisible, setIsNavVisible] = useState(true);

    // setTimeout(() => {
    //     setFade(false);
    //   }, 100);

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

    
    return (
        <div className="quests">
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
                            <nav className={`text-base w-48 mr-2`}>
                                <ul className={`mt-2 space-y-2 border-l-2 border-slate-950 dark:border-white lg:mt-4 lg:space-y-4 w-full p-2`}>
                                    {navItems[1].subnav.map((questtype) => (
                                        <li className="relative w-full" key={questtype.title}>
                                            {selectedButton === questtype.id ? (
                                                <span>
                                                    <p
                                                        className="text-blue-900 font-bold dark:text-slate-400 dark:before:bg-slate-700"
                                                        // onClick={() => handleButtonClick(monstertype.title)}
                                                    >
                                                        {questtype.title}
                                                    </p>
                                                </span>
                                            ) : (
                                                <Link to={questtype.path}>
                                                    <button
                                                        className="text-slate-950 hover:text-slate-600 font-bold dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                                                        onClick={() => handleButtonClick(questtype.id)}
                                                    >
                                                        {questtype.title}
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
                                <FontAwesomeIcon icon={faChevronRight} onClick={handleNavButtonClick} className="bg-slate-950 hover:bg-blue-800 p-4 text-white rounded-full cursor-pointer" />
                            ) : (
                                <FontAwesomeIcon icon={faChevronLeft} onClick={handleNavButtonClick} className="bg-slate-950 hover:bg-blue-800 p-4 text-white rounded-full cursor-pointer" />
                            )}
                        </div>
                    </div>

                </div>
                
                <div className={` min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16`}>
                    {/* {id === 2 && <Followers/>} */}
                    <Quests id={id}/>
                </div>
               
                
            </div>
            {/* {id === 2 && <Followers />}
            <Quests id={id}/> */}
            {/* <Box m={10}>
                <Quests id={id}/>
            </Box> */}
        </div>
    )
}

export default QuestsPage;