export const getItemIcon = (item) => {
    // Replace underscores (_) with spaces in the image name
    // console.log(item);
    const formattedImageName = `${item
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}.png`
        .replace(/\+(?=\.\w+)/, '%2B')
        .replace(/ /g, '+')
      

    // console.log(formattedImageName);

    try {
        // Use require to dynamically import the image
        return (`https://monster-hunter-db-images.s3.eu-north-1.amazonaws.com/item+icons/${formattedImageName}`);
    } catch (error) {
            // Handle the case when the image doesn't exist
            console.error(`Image ${formattedImageName} not found.`);
            return null;
        }
    };