import './App.css';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Switch } from '@mui/material';
import NavBar from './components/navbar/navbar'
import HomePage from './pages/Home/HomePage'
import MonstersPage from './pages/Monsters/MonstersPage'
import MonsterPage from './pages/Monsters/MonsterPage'
import SelectWeaponsPage from './pages/Weapons/SelectWeaponsPage'
import WeaponsPage from './pages/Weapons/WeaponsPage'
import ItemsPage from './pages/Items/ItemsPage'
import ItemPage from './pages/Items/ItemPage'
import ArmoursPage from './pages/Armour/ArmoursPage'
import ArmourPage from './pages/Armour/ArmourPage'
import ArmourSetPage from './pages/Armour/ArmourSetPage'
import SkillsPage from "./pages/Skills/SkillsPage";
import DecorationsPage from "./pages/Skills/DecorationsPage";
import DecorationPage from "./pages/Skills/DecorationPage";
import QuestsPage from './pages/Quests/QuestsPage'
import QuestPage from './pages/Quests/QuestPage'
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import WeaponPage from "./pages/Weapons/WeaponPage";
import {useState} from "react";
import {blueGrey, deepOrange, grey, pink, purple, red, teal} from "@mui/material/colors";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@mui/material/IconButton';



const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // 👇 palette values for light mode
                // primary: { main: purple[800] },
                background: {
                    default: '#f2debd',
                    paper: '#f7a354',
                    MuiDataGridcolumnHeaders: '#f7a354',
                    MuiDataGridrow: '#f5b87f',
                },
                text: {
                    primary: grey[900]
                },
                borderColour: {
                    MUIDataGrid: '2px solid #cc690c',
                    Box: '2px solid #cc690c'
                }
            }
            : {
                // 👇 palette values for dark mode
                // primary: { main: teal[700] },
                background: {
                    default: '#2B3142',
                    paper: '#1d284d',
                    MuiDataGridcolumnHeaders: '#1d284d',
                    MuiDataGridrow: '#2b344f',
                },
                text: {
                    primary: grey[50],
                },
                borderColour: {
                    MUIDataGrid: '2px solid #010924',
                    Box: '2px solid #010924'
                }
            }),
    },
});



function App() {
    const [mode, setMode] = React.useState('dark');
    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
              <NavBar mode={mode} toggleColorMode={toggleColorMode}/>
              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/monsters' element={<MonstersPage/>}/>
                {/* <Route path='/quests' element={<QuestsPage/>}/> */}
                <Route path="/monsters/:id" element={<MonsterPage />}/>
                <Route path="/quests/:quest_type" element={<QuestsPage />}/>
                <Route path="/quest/:id" element={<QuestPage />}/>
                <Route path="/weapons" element={<SelectWeaponsPage/>}/>
                <Route path="/weapons/:weapon_type" element={<WeaponsPage/>}/>
                <Route path="/weapon/:id" element={<WeaponPage/>}/>
                <Route path="/items" element={<ItemsPage/>}/>
                <Route path="/items/:id" element={<ItemPage/>}/>
                <Route path="/armour" element={<ArmoursPage/>}/>
                <Route path="/armour/:id" element={<ArmourPage/>}/>
                <Route path="/armour/armourSets/:id" element={<ArmourSetPage/>}/>
                <Route path="/skills" element={<SkillsPage/>}/>
                <Route path="/decorations" element={<DecorationsPage/>}/>
                <Route path="/decorations/:id" element={<DecorationPage/>}/>
              </Routes>
             
          </Router>
      </ThemeProvider>
  );
}

export default App;
