import './App.css';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch } from '@mui/material';
import NavBar from './components/navbar/navbar'
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


const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // 👇 palette values for light mode
                primary: { main: purple[800] },
                text: {
                    primary: grey[900],
                },
            }
            : {
                // 👇 palette values for dark mode
                primary: { main: teal[700] },
                background: {
                    default: '#2B3142',
                    paper: blueGrey[900],
                },
                text: {
                    primary: grey[50],
                },
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
              {/* <TopBar/> */}
              <NavBar/>
              {/* <label>Dark Mode</label> */}
              <Switch
                checked={mode === 'dark'}
                color='success'
                onChange={toggleColorMode}
                />
                {mode === 'dark' ? (
                <FontAwesomeIcon icon={faMoon} style={{ marginLeft: '10px' }} />
                ) : (
                <FontAwesomeIcon icon={faSun} style={{ marginLeft: '10px' }} />
                )}

              <Routes>
                  <Route path='/monsters' element={<MonstersPage/>}/>
                  {/* <Route path='/quests' element={<QuestsPage/>}/> */}
                  <Route path="/monsters/:id" element={<MonsterPage />}/>
                  <Route path="/quests/:quest_type" element={<QuestsPage />}/>
                  <Route path="/quest/:id" element={<QuestPage />}/>
                  <Route path="/weapons" element={<SelectWeaponsPage/>}/>
                  <Route path="/weapons/:id" element={<WeaponsPage/>}/>
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
