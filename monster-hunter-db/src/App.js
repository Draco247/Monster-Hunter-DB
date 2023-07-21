import './App.css';
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

// import ItemPage from './pages/Items/ItemPage'

import QuestsPage from './pages/Quests/QuestsPage'
import QuestPage from './pages/Quests/QuestPage'

import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Monster from "./components/monsters/monster";
import WeaponPage from "./pages/Weapons/WeaponPage";


function App() {
  return (
      <>
        <Router>
            <TopBar/>
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
            </Routes>
            {/*<Box m={10}>*/}
            {/*    <Monsters/>*/}
            {/*</Box>*/}
        </Router>
    </>
  );
}

export default App;
