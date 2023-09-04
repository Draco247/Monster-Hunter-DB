export const getWeaponArt = (weapon_type_id) => {

    const weapons = {
        "0": "GS",
        "1": "SNS",
        "2": "DB",
        "3": "LS",
        "4": "HAM",
        "5": "HH",
        "6": "LANCE",
        "7": "GL",
        "8": "SA",
        "9": "CB",
        "10": "IG",
        "11": "BOW",
        "12": "LBG",
        "13": "HBG",
    }

   const weapon_type = weapons[weapon_type_id]
   console.log(weapon_type)
   // Replace underscores (_) with spaces in the image name
   const formattedImageName = `${weapon_type.toUpperCase()}.jpg`
   const formattedImageName2 = `${weapon_type.toUpperCase()}_SB.jpg`
   // console.log(formattedImageName);

   try {
       // Use require to dynamically import the image
       return [
        require(`../../assets/weapon art/${formattedImageName}`),
        require(`../../assets/weapon art/${formattedImageName2}`)
      ];
      
   } catch (error) {
       // Handle the case when the image doesn't exist
       console.error(`Image ${formattedImageName} not found.`);
       return null;
   }
};