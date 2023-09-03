import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "./sidebar";
import SubMenu from "./submenu";
import "./navbar.css";
import { IconContext } from 'react-icons';
import Typography from '@mui/material/Typography';
import styled from'styled-components';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import Logo from '../../assets/icons/rise_logo.png';
import SunbreakLogo from '../../assets/icons/sunbreak_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@mui/material/IconButton';


const SidebarNav = styled.nav`
  background: #060b26;
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column; /* Stack items vertically */
  position: absolute;
  border-right: 4px solid #632ce4;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: ${({ sidebar }) => (sidebar ? '.6s ease' : '1s ease')};
  z-index: 10;
  overflow-y: auto; /* Enable vertical scrolling when content overflows */
  max-height: 100vh; /* Limit the maximum height of the sidebar */
  border-top-right-radius: 80px;
  border-bottom-right-radius: 80px;
  margin-top: 10px;
`;



const SidebarWrap = styled.div`
  width: 100%;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
//   background: #632ce4;
//   border-bottom: 4px solid #632ce4;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #9827b8;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #060b26;
  border: 4px solid #632ce4;
  width: 250px;
  z-index: 10;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;



export default function Navbar({mode, toggleColorMode}) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const sidebarRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (sidebar && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            showSidebar();
          }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, [sidebar]);

    return (
        <>
         <div className="navbar">
                <Link to='#' className="menu-bars">
                    <IconButton onClick={showSidebar} style={{color: '#9827b8'}}>
                        <FaIcons.FaBars />
                    </IconButton>
                </Link>
                {/* <DropdownContainer>
                    <DropdownContent   open={dropdownOpen}>
                        {Sidebar.map((item, index) => {
                            return <SubMenu item={item} key={index} showSidebar={showSidebar}/>;
                            })}
                    </DropdownContent>
                </DropdownContainer> */}
                <IconButton onClick={toggleColorMode} style={{marginLeft:'10px', width: '50px', height:'50px'}}>
                    {mode === 'dark' ? (
                    <FontAwesomeIcon icon={faMoon} style={{ color: '#538eed' }} />
                    ) : (
                    <FontAwesomeIcon icon={faSun} style={{ color: '#f0871f' }} />
                    )}
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, textAlign: 'center', display: { xs: 'none', sm: 'block' }, color: '#fff' }}
                >
                    <img src={Logo} alt="Rise Logo" className="logo" style={{ marginRight: '5px', verticalAlign:'middle', height: '60px', width: '120px' }} />
                    <img src={SunbreakLogo} alt="Rise Sunbreak Logo" className="logo" style={{ marginRight: '5px', verticalAlign:'middle', height: '60px', width: '120px' }} />
                    Monster Hunter DB
                </Typography>
            </div>
            
            <SidebarNav ref={sidebarRef} sidebar={sidebar}>
                <SidebarWrap>
                    <NavIcon to='#'>
                        <IconButton onClick={showSidebar} style={{color: '#9827b8'}}>
                            <FaIcons.FaBars />
                        </IconButton>
                    </NavIcon>
                    {Sidebar.map((item, index) => {
                    return <SubMenu item={item} key={index} showSidebar={showSidebar}/>;
                    })}
                </SidebarWrap>
            </SidebarNav>
            {/* <IconContext.Provider value={{ color: '#fff' }}>
            </IconContext.Provider> */}
        </>
    )
}
