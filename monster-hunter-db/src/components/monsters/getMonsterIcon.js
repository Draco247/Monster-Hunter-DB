export const getMonsterIcon = (monster_name) => {
    // Replace underscores (_) with spaces in the image name
    const formattedImageName = `${monster_name
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}_Icon.png`
        .replace(/ /g, '_') 
        // .replace(/ /g, '_') 

    // console.log(formattedImageName);

    try {
        // Use require to dynamically import the image
        // return require(`../../assets/icons/${formattedImageName}`);
        // console.log(`https://monster-hunter-db-images.s3.eu-north-1.amazonaws.com/icons/${formattedImageName}`)
        return (`https://monster-hunter-db-images.s3.eu-north-1.amazonaws.com/icons/${formattedImageName}`);
    } catch (error) {
        // Handle the case when the image doesn't exist
        console.error(`Image ${formattedImageName} not found.`);
        return null;
    }
};