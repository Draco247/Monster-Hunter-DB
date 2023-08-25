import { Link } from 'react-router-dom';
import {useState} from "react";
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


const SidebarNav = styled.nav`
  background: #060b26;
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column; /* Stack items vertically */
  position: fixed;
  border-right: 4px solid #632ce4;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: ${({ sidebar }) => (sidebar ? '.6s ease' : '1s ease')};
  z-index: 10;
  overflow-y: auto; /* Enable vertical scrolling when content overflows */
  max-height: 100vh; /* Limit the maximum height of the sidebar */
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

export default function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <Link to='#' className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} style={{color: '#9827b8'}} />
                    </Link>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, textAlign: 'center', display: { xs: 'none', sm: 'block' }, color: '#fff' }}
                    >
                        <img src={Logo} alt="Rise Logo" className="logo" style={{ marginRight: '5px', verticalAlign:'middle', height: '50px', width: '100px' }} />
                        <img src={SunbreakLogo} alt="Rise Sunbreak Logo" className="logo" style={{ marginRight: '5px', verticalAlign:'middle', height: '50px', width: '100px' }} />
                        Monster Hunter DB
                    </Typography>
                </div>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to='#'>
                            <FaIcons.FaBars onClick={showSidebar} style={{color: '#9827b8'}} />
                        </NavIcon>
                        {Sidebar.map((item, index) => {
                        return <SubMenu item={item} key={index} showSidebar={showSidebar}/>;
                        })}
                    </SidebarWrap>
                </SidebarNav>
                {/* <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to='#' className="menu-bars">
                                <FontAwesomeIcon icon={faBars}/>
                            </Link>
                        </li>
                        {Sidebar.map((item, index) => {
                            return(
                                // <li key={index} className={item.cName}>
                                //     <Link to={item.path} className="nav-link">
                                //         {item.icon}
                                //         <span>{item.title}</span>
                                //     </Link>
                                // </li>
                                <SubMenu item={item} key={index}/>
                            )
                        })}
                    </ul>
                </nav> */}
            </IconContext.Provider>
        </>
    )
}
