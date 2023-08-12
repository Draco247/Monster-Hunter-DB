import './App.css';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch } from '@mui/material';
import TopBar from './components/topbar/topbar'
import Monsters from './components/monsters/monsters'
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
import Monster from "./components/monsters/monster";
import WeaponPage from "./pages/Weapons/WeaponPage";
import {useState} from "react";
import {blueGrey, deepOrange, grey, pink, purple, red, teal} from "@mui/material/colors";


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
    // const [theme, settheme] = useState(false);
    // const darkTheme = createTheme({
    //     palette: {
    //         mode: theme ? 'dark' : 'light',
    //         type: "dark",
    //         primary: purple,
    //         secondary: {
    //             main: '#b9f6ca',
    //         },
    //     },
    // });
    // const handleChange = (event) => {
    //     settheme(event.target.checked);
    // }
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
              <TopBar/>
              <label>Dark Mode</label>
              <Switch
                  checked={theme}
                  color='success'
                  onChange={toggleColorMode} />
              <Routes>
                  <Route path='/monsters' element={<MonstersPage/>}/>
                  <Route path='/quests' element={<QuestsPage/>}/>
                  <Route path="/monsters/:id" element={<MonsterPage />}/>
                  <Route path="/quests/:id" element={<QuestPage />}/>
                  <Route path="/weapons" element={<SelectWeaponsPage/>}/>
                  <Route path="/weapons/:id" element={<WeaponsPage/>}/>
                  <Route path="/weapons/:id/weapons" element={<WeaponPage/>}/>
                  <Route path="/items" element={<ItemsPage/>}/>
                  <Route path="/items/:id" element={<ItemPage/>}/>
                  <Route path="/armour" element={<ArmoursPage/>}/>
                  <Route path="/armour/:id" element={<ArmourPage/>}/>
                  <Route path="/armour/armourSets/:id" element={<ArmourSetPage/>}/>
                  <Route path="/skills" element={<SkillsPage/>}/>
                  <Route path="/decorations" element={<DecorationsPage/>}/>
                  <Route path="/decorations/:id" element={<DecorationPage/>}/>
              </Routes>
              {/*<Box m={10}>*/}
              {/*    <Monsters/>*/}
              {/*</Box>*/}
          </Router>
      </ThemeProvider>
  );
}

export default App;
