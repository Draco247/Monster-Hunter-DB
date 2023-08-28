import { Grid,Box } from '@mui/material';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';




const QuestBox = ({quests, quest_lvl}) => {
    const [hovered, setHovered] = useState(null);

    const hoverStyle = {
        boxShadow: '0 0 5px 2px #888', // Apply a box shadow when hovered
        background: '#03204d'
    };

    const handleMouseEnter = (id) => {
        setHovered(id);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    const getMonsterIcons = (monster_name) => {
        // Replace underscores (_) with spaces in the image name
        const formattedImageName = `${monster_name
            .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}_Icon.png`
            .replace(/ /g, '_') // First, replace underscores with spaces

        // console.log(formattedImageName);

        try {
            // Use require to dynamically import the image
            return require(`../../assets/icons/${formattedImageName}`);
        } catch (error) {
            // Handle the case when the image doesn't exist
            console.error(`Image ${formattedImageName} not found.`);
            return null;
        }
    };

    return (
        <Box m={3} display="flex" justifyContent="center" alignItems="center">
            <Grid container spacing={2} style={{ flexWrap: 'wrap' }}>
                {quests
                    .filter(quest => quest.quest_lvl === quest_lvl)
                    .map(quest => (
                        <Grid item xs={12} sm={6} md={3} lg={3} key={quest.id}>
                            <Link to={`/quest/${quest.id}`}>
                                <Box height="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{...(hovered === quest.id && hoverStyle), 
                                    border: '2px solid black', borderRadius: '5px'}} onMouseEnter={() => handleMouseEnter(quest.id)}
                                    onMouseLeave={handleMouseLeave}>
                                    <p key={quest.id}>{quest.quest_name}</p>
                                    <Box ml={3} mr={3} sx={{ width: '100%'}}>
                                        <Grid container spacing={2} style={{ flexWrap: 'wrap' }}>
                                            {quest.monsters.map(monster => (
                                                <Grid item xs={12} sm={6} md={3} lg={3} key={monster.id}>
                                                     <Tooltip title={monster.name}>
                                                        <Box
                                                            component="img"
                                                            m={3}
                                                            sx={{
                                                                height: 60,
                                                                width: 60,
                                                                marginRight: '8px',
                                                                border: '2px solid black', 
                                                                borderRadius: '5px'
                                                            }}
                                                            alt={monster.name}
                                                            src={getMonsterIcons(monster.name)}
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