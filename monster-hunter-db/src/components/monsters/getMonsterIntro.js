export const getMonsterIntro = (monster_name) => {
    // Replace underscores (_) with spaces in the image name
    // console.log(monster_name);
    const formattedImageName = `${monster_name
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}.png`
        .replace(/ /g, '_') // First, replace underscores with spaces

    // console.log(formattedImageName);

    try {
        // Use require to dynamically import the image
        return require(`../../assets/monster intros/${formattedImageName}`);
    } catch (error) {
        try {
            const formattedImageName = `${monster_name
                .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}.jpeg`
                .replace(/ /g, '_')

            // console.log(formattedImageName);

            return require(`../../assets/monster intros/${formattedImageName}`);
        } catch (error) {
            // Handle the case when the image doesn't exist
            console.error(`Image ${formattedImageName} not found.`);
            return null;
        }
    }
};