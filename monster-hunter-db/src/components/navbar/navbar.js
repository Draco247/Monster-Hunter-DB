import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { navItems } from "./NavItems";
import Dropdownmenu from "./Dropdownmenu";
import "./navbar.css";
import { IconContext } from 'react-icons';
import Typography from '@mui/material/Typography';
// import styled from'styled-components';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import Logo from '../../assets/icons/rise_logo.png';
import SunbreakLogo from '../../assets/icons/sunbreak_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faX, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@mui/material/IconButton';



export default function Navbar({mode, toggleColorMode, setDarkMode, darkMode}) {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [fade, setFade] = useState(true);

  const handleClick = (navitem) => {
    // Toggle the 'click' state to control the opening and closing of the dropdown menu
    setClick(!click);
    // console.log(click)
    setFade(true)
    // If the clicked button has subnav, set it as the open submenu
    if (navitem.subnav) {
      // If the clicked button is already open, close it
      if (openSubmenu === navitem.title) {
        // console.log("yo")
        setTimeout(() => {
          setFade(false);
        }, 50);
        setOpenSubmenu(null);
      } else {
        setTimeout(() => {
          setFade(false);
        }, 50);
        setOpenSubmenu(navitem.title);
      }
    } 
    else {
      // If the clicked button doesn't have subnav, close any open submenu
      setTimeout(() => {
        setFade(false);
      }, 50);
      setOpenSubmenu(null);
    }
  };
  
  // const closeMobileMenu = () => setClick(false);

  // const onMouseEnter = (item) => {
  //   if (window.innerWidth <= 1244) {
  //     setDropdown(false);
  //   } else {
  //     if (item.subnav) {
  //           setOpenSubmenu(item.title); // Set the open submenu
  //         }
  //     setDropdown(true);
  //   }
  // };

  // const onMouseLeave = () => {
  //   if (window.innerWidth <= 1244) {
  //     setDropdown(false);
  //   } else {
  //     setOpenSubmenu(null);
  //     setDropdown(false);
  //   }
  // };

  // console.log(click);
  // console.log(navItems)
  // const [toggleMenu, setToggleMenu] = useState(false);
  console.log(darkMode)

  return (
    <>
      <nav className="bg-slate-400/95 dark:bg-slate-950/95 sticky top-0 z-10 backdrop-filter backdrop-blur-sm ">
        <div className="max-w-7xl mx-40 h-20">
          <div className="flex mx-auto justify-between ">
            {/* Primary menu and logo */}
              <div className="flex items-center gap-8 my-3">
                {/* logo */}
                  <div>
                    <Link 
                    to="/" className="flex gap-1 font-bold text-2xl text-slate-950 dark:text-slate-50 items-center">
                      <span>MHRDB</span>
                    </Link>
                  </div>
                  {/* primary */}
                <div className="hidden lg:flex gap-8 items-center text-slate-950 dark:text-slate-50 font-bold">
                    {navItems.map((navitem, index) => (
                      <div key={index}>
                        {navitem.subnav ? (
                          <button
                            id="navbar-button"
                            className={"hover:bg-gray-200 dark:hover:bg-blue-700 p-2 rounded-full flex items-center justify-center w-40 cursor-pointer"}
                            onClick={() => handleClick(navitem)}
                          >
                            {navitem.icon}
                            {navitem.title}
                            <FaIcons.FaCaretDown className="ml-2" />
                          </button>
                        ) : (
                          <Link to={navitem.path} className="no-underline  text-current">
                            <button id="navbar-button" className="hover:bg-gray-200 dark:hover:bg-blue-700 p-2 rounded-full flex items-center justify-center w-40 cursor-pointer">
                              {navitem.icon}
                              {navitem.title}
                            </button>
                          </Link>
                        )}

                        {navitem.subnav && navitem.title === openSubmenu && (
                          <Dropdownmenu navitem={navitem} handleClick={handleClick} fade={fade}/>
                        )}
                      </div>
                    ))}

                    <IconButton onClick={() => setDarkMode(!darkMode)} className="w-12 h-12">
                      {darkMode ? (
                        <FontAwesomeIcon icon={faMoon} className="text-blue-500" />
                      ) : (
                        <FontAwesomeIcon icon={faSun} className="text-orange-500" />
                      )}
                    </IconButton>
                  </div>

              </div>
          </div>
        </div>
        {/* mobile navigation */}
        {/* <div
          className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
            !toggleMenu ? "h-0" : "h-full"
          }`}
        >
          <div className="px-8">
            <div className="flex flex-col gap-8 font-bold tracking-wider">
              <a href="#" className="border-l-4 border-gray-600">
                Features
              </a>
              <a href="#">Pricing</a>
              <a href="#">Download</a>
              <a href="#">Classic</a>
            </div>
          </div>
        </div> */}
      </nav>
    </>
  );
}