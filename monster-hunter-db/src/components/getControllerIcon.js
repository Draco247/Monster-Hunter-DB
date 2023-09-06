export const getControllerIcon = (button) => {
    console.log(button)
    // Replace underscores (_) with spaces in the image name
    const formattedImageName = `${button}.svg`

    console.log(formattedImageName);

    try {
        // Use require to dynamically import the image
        console.log(require(`../assets/controller icons/${formattedImageName}`))
        return require(`../assets/controller icons/${formattedImageName}`);
    } catch (error) {
        // Handle the case when the image doesn't exist
        console.error(`Image ${formattedImageName} not found.`);
        return null;
    }
};