import { Grid,Box } from '@mui/material';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { getMonsterIcon } from '../monsters/getMonsterIcon'
import { getQuestIcon } from './getQuestIcon';





const QuestBox = ({quests, quest_lvl}) => {
    const [hovered, setHovered] = useState(null);
    const { palette } = useTheme();

    const hoverStyle = {
        boxShadow: '0 0 5px 2px #888', // Apply a box shadow when hovered
        background: 'light' === useTheme().palette.mode ? '#fcdfb2' : '#03204d'
    };

    const handleMouseEnter = (id) => {
        setHovered(id);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    const getQuestType = (quest) => {
        // will add rampage once i can find the icon
        const questTypeKeywords = ['hunt all', 'slay all', 'hunt', 'capture', 'slay','deliver']; 
        
        const questTypeMatches = questTypeKeywords.filter(keyword =>
            quest.objective.toLowerCase().includes(keyword)
        );
        // console.log(questTypeMatches[0]);

        const isArena = /^arena \d+★/.test(quest.quest_name.toLowerCase()) // check if quest name starts with arena *star to display arena icon

        const questType =
            isArena
                ? 'Arena'
                : questTypeMatches.includes('hunt all')  || questTypeMatches.includes('slay all')
                ? 'Endurance'
                : questTypeMatches.includes('deliver')
                ? 'Gathering'
                : questTypeMatches.includes('deliver')
                ? 'Gathering'
                : questTypeMatches.length === 1
                ? questTypeMatches[0]
                : 'Hunt';
    
    //    console.log(questType);
       return questType;
    };

    const questIcon = (quest) => getQuestIcon(getQuestType(quest));
    return (
        <Box m={3} display="flex" justifyContent="center" alignItems="center">
            <Grid container spacing={2} style={{ flexWrap: 'wrap' }}>
                {quests
                    .filter(quest => quest.quest_lvl === quest_lvl)
                    .map(quest => (
                        <Grid item xs={12} sm={6} md={3} lg={3} key={quest.id}>
                            <Link to={`/quest/${quest.id}`} style={{ color: 'inherit' }}>
                                <Box height="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{...(hovered === quest.id && hoverStyle), 
                                    border: palette.borderColour.Box, borderRadius: '5px'}} onMouseEnter={() => handleMouseEnter(quest.id)}
                                    onMouseLeave={handleMouseLeave}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                        {questIcon && (
                                            <img
                                                src={getQuestIcon(getQuestType(quest))}
                                                alt={getQuestType(quest)}
                                                style={{ marginRight: '5px', verticalAlign: 'middle', width: '40px', height: '40px'}}
                                            />
                                        )}
                                        <h5 key={quest.id}>{quest.quest_name}</h5>
                                    </div>
                                    <Box m={2} display="flex"  sx={{ width: '100%'}}>
                                        <Grid container spacing={2} style={{ flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                            {quest.monsters.map(monster => (
                                                <Grid item xs={12} sm='auto' md='auto' lg='auto' key={monster.id}>
                                                     <Tooltip title={monster.name}>
                                                        <Box
                                                            component="img"
                                                            sx={{
                                                                height: 60,
                                                                width: 60,
                                                                // marginRight: '8px',
                                                                border: '2px solid black', 
                                                                borderRadius: '5px'
                                                            }}
                                                            alt={monster.name}
                                                            src={getMonsterIcon(monster.name)}
                                                        />
                                                     </Tooltip>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Box>
                            </Link>
                            
                        </Grid>
                    ))}
            </Grid>
        </Box>
    )

}

export default QuestBox;