export const getFollowerArt = (name) => {
    try {
        // Use require to dynamically import the image
        return require(`../../assets/follower art/${name}.png`);
    } catch (error) {
            // Handle the case when the image doesn't exist
            console.error(`Image ${name}.png not found.`);
            return null;
        }
};