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