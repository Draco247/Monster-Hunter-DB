import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { navItems } from "./NavItems";
import Dropdownmenu from "./Dropdownmenu";
import "./navbar.css";
import { IconContext } from 'react-icons';
import Typography from '@mui/material/Typography';
import styled from'styled-components';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import Logo from '../../assets/icons/rise_logo.png';
import SunbreakLogo from '../../assets/icons/sunbreak_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faX, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@mui/material/IconButton';


export default function Navbar({mode, toggleColorMode}) {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = (item) => {
    if (window.innerWidth <= 1244) {
      setDropdown(false);
    } else {
      if (item.subnav) {
            setOpenSubmenu(item.title); // Set the open submenu
          }
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth <= 1244) {
      setDropdown(false);
    } else {
      setOpenSubmenu(null);
      setDropdown(false);
    }
  };

  console.log(click);

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          MHRDB
        </Link>
        <IconButton onClick={toggleColorMode} style={{ width: '50px', height:'50px'}}>
                    {mode === 'dark' ? (
                    <FontAwesomeIcon icon={faMoon} style={{ color: '#538eed' }} />
                    ) : (
                    <FontAwesomeIcon icon={faSun} style={{ color: '#f0871f' }} />
                    )}
        </IconButton>
        <div className='menu-icon' onClick={handleClick}>
          {click ? (
            <FontAwesomeIcon icon={faX} />
              ) : (
              <FaIcons.FaBars />
              )}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        {navItems.map((item) => (
            <li
              key={item.id}
              className={item.cName}
              onMouseEnter={() => onMouseEnter(item)}
              onMouseLeave={onMouseLeave}
            >
              <Link to={item.path}>
                {item.icon}
                {item.title}
                {item.subnav && (
                  <FaIcons.FaCaretDown />
                )}
              </Link>
              {item.subnav && item.title === openSubmenu && (
                <Dropdownmenu item={item} />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}