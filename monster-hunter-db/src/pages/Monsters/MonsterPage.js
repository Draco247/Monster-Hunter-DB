import {Box} from "@mui/material";
import Monster from "../../components/monsters/monster";
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import { Transition } from '@headlessui/react'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MonsterList } from "../../components/monsters/monsterlist";
import { getMonsterIcon } from "../../components/monsters/getMonsterIcon";



function MonsterPage() {
    const [selectedButton, setSelectedButton] = useState('');
    const [isNavVisible, setIsNavVisible] = useState(true);

    // const [isShowing, setIsShowing] = useState(true)
    const getMonsterNameById = (id) => {
        const monster = MonsterList.find((monster) => monster.id === id);
        return monster ? monster.name : null;
      };

    useEffect(() => {
        setSelectedButton(getMonsterNameById(parseInt(window.location.pathname.split("/").pop())))
    },[]);

    const handleButtonClick = (buttonValue) => {
        setSelectedButton(buttonValue); // Set the selected button value
    };

    const handleNavButtonClick = () => {
        // Toggle the visibility of the navigation element
        setIsNavVisible(!isNavVisible);
    };


    return (
        // <div className="monster">
            <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-2 xl:px-8 ">
                <div className={`lg:relative`}>
                    <div className={`sticky top-[4.5rem] -ml-0.5 h-screen py-16 pl-0.5 flex`}>
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
                                   <nav className={`text-base w-80 mr-2 h-full`}>
                                        <ul className={`mt-2 space-y-2 border-l-2 border-slate-950 dark:border-white lg:mt-4 lg:space-y-4 w-full p-2 h-full overflow-y-auto`}>
                                            {MonsterList.map((monster) => (
                                                <li className="relative w-full" key={monster.id}>
                                                    {selectedButton === monster.name ? (
                                                        <span>
                                                            <div className="flex items-center">
                                                                <img className="w-16 h-16 mr-2" src={getMonsterIcon(monster.name)} alt="" />
                                                                <p className="text-blue-900 font-bold dark:text-slate-200 dark:before:bg-slate-700 text-decoration-line: underline">
                                                                    {monster.name}
                                                                </p>
                                                            </div>
                                                        </span>
                                                    ) : (
                                                        <Link to={`/monsters/${monster.id}`}>
                                                            <button
                                                                className="text-slate-950 hover:text-slate-600 dark:hover:text-slate-50 font-bold dark:text-slate-400 dark:before:bg-slate-700"
                                                                onClick={() => handleButtonClick(monster.name)}
                                                            >
                                                                <div className="flex items-center">
                                                                    <img className="w-16 h-16 mr-2" src={getMonsterIcon(monster.name)} alt="" />
                                                                    {monster.name}
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
                                        <FontAwesomeIcon icon={faChevronRight} onClick={handleNavButtonClick} className="bg-slate-950 hover:bg-blue-800 p-4 text-white rounded-full cursor-pointer" />
                                    ) : (
                                        <FontAwesomeIcon icon={faChevronLeft} onClick={handleNavButtonClick} className="bg-slate-950 hover:bg-blue-800 p-4 text-white rounded-full cursor-pointer" />
                                    )}
                                </div>

                    </div>
                </div>
                <div className={` min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16`}>
                    <Monster/>
                </div>
            </div>
            
    )
}

export default MonsterPage;