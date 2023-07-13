import './App.css';
import TopBar from './components/topbar'
import Monsters from './components/monsters'
import MonstersPage from './pages/MonstersPage'
import MonsterPage from './pages/MonsterPage'
import SelectWeaponsPage from './pages/SelectWeaponsPage'
import WeaponsPage from './pages/WeaponsPage'
import ItemsPage from './pages/ItemsPage'
import ItemPage from './pages/ItemPage'

import QuestsPage from './pages/QuestsPage'
// import QuestPage from './pages/QuestPage'

import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Monster from "./components/monster";


function App() {
  return (
      <>
        <Router>
            <TopBar/>
            <Routes>
                <Route path='/monsters' element={<MonstersPage/>}/>
                <Route path='/quests' element={<QuestsPage/>}/>
                <Route path="/monsters/:id" element={<MonsterPage />}/>
                {/*<Route path="/quests/:id" element={<QuestPage />}/>*/}
                <Route path="/weapons" element={<SelectWeaponsPage/>}/>
                <Route path="/weapons/:id" element={<WeaponsPage/>}/>
                <Route path="/items" element={<ItemsPage/>}/>
                <Route path="/items/:id" element={<ItemPage/>}/>
            </Routes>
            {/*<Box m={10}>*/}
            {/*    <Monsters/>*/}
            {/*</Box>*/}
        </Router>
    </>
  );
}

export default App;
