export const getArmourSetImage = (set_name) => {
    const formattedImageName = `${set_name
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}.png`
        .replace(/ /g, '+')

    try {
        // Use require to dynamically import the image
        return (`https://monster-hunter-db-images.s3.eu-north-1.amazonaws.com/armour images/${formattedImageName}`);
    } catch (error) {
        // Handle the case when the image doesn't exist
        console.error(`Image ${set_name}.png not found.`);
        return null;
    }
}