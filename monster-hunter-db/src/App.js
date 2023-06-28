import './App.css';
import TopBar from './components/topbar'
import Monsters from './components/monsters'
import MonstersPage from './pages/MonstersPage'
import QuestsPage from './pages/QuestsPage'
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';


function App() {
  return (
      <>
        <Router>
            <TopBar/>
            <Routes>
                <Route path='/monsters' element={<MonstersPage/>}/>
                <Route path='/quests' element={<QuestsPage/>}/>
            </Routes>
            {/*<Box m={10}>*/}
            {/*    <Monsters/>*/}
            {/*</Box>*/}
        </Router>
    </>
  );
}

export default App;
