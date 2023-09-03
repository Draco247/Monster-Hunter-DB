export const getQuestIcon = (quest_type) => {
    // Replace underscores (_) with spaces in the image name
    const formattedImageName = `${quest_type
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}.png`
        .replace(/ /g, '_') // First, replace underscores with spaces

    // console.log(formattedImageName);

    try {
        // Use require to dynamically import the image
        return require(`../../assets/icons/${formattedImageName}`);
    } catch (error) {
        // Handle the case when the image doesn't exist
        // console.error(`Image ${formattedImageName} not found.`);
        return null;
    }
};

// export const getQuestIcon = (quest) => {
//     // will add rampage once i can find the icon
//     const questTypeKeywords = ['hunt all', 'slay all', 'hunt', 'capture', 'slay','deliver']; 
       
//    //  const questTypeMatches = questTypeKeywords.filter(keyword =>
//    //      quest.objective.toLowerCase().includes(keyword)
//    //  );
//    // console.log(quest)
//    // console.log(quest.toLowerCase())
//    const questTypeMatches = questTypeKeywords.filter(keyword =>
//        quest.toLowerCase().includes(keyword)
//    );
//     // console.log(questTypeMatches[0]);

//     const isArena = /^arena \d+★/.test(quest.quest_name.toLowerCase()) // check if quest name starts with arena *star to display arena icon

//     const questType =
//         isArena
//             ? 'Arena'
//             : questTypeMatches.includes('hunt all')  || questTypeMatches.includes('slay all')
//             ? 'Endurance'
//             : questTypeMatches.includes('deliver')
//             ? 'Gathering'
//             : questTypeMatches.includes('deliver')
//             ? 'Gathering'
//             : questTypeMatches.length === 1
//             ? questTypeMatches[0]
//             : 'Hunt';

// //    console.log(questType);
//    // Replace underscores (_) with spaces in the image name
//    const formattedImageName = `${questType
//        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}.png`
//        .replace(/ /g, '_') // First, replace underscores with spaces

//    // console.log(formattedImageName);

//    try {
//        // Use require to dynamically import the image
//        return require(`../../assets/icons/${formattedImageName}`);
//    } catch (error) {
//        // Handle the case when the image doesn't exist
//        // console.error(`Image ${formattedImageName} not found.`);
//        return null;
//    }
// };