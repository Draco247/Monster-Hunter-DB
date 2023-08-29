export const getArmourIcon = (piece_type) => {
    // Replace underscores (_) with spaces in the image name
    const formattedImageName = `${piece_type}.png`

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