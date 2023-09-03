export const getLocationImage = (location) => {
    // Replace underscores (_) with spaces in the image name
    const formattedImageName = `${location
        .replace(/(?:^|\s)\S/g, (char) => char.toLowerCase())}.png`
        .replace(/ /g, '_') // First, replace underscores with spaces

    console.log(formattedImageName);

    try {
        // Use require to dynamically import the image
        return require(`../../assets/map images/${formattedImageName}`);
    } catch (error) {
        // Handle the case when the image doesn't exist
        console.error(`Image ${formattedImageName} not found.`);
        return null;
    }
};