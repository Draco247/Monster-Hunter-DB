import { getFollowerArt } from "./getFollowerArt";
import { getWeaponIcon } from "../weapons/getWeaponIcon";

export const FollowerCard = ({follower}) => {
    const weaponmapping = {
        "Great Sword": "GS",
        "Sword & Shield": "SNS",
        "Dual Blades": "DBS",
        "Long Sword": "LS",
        "Hammer": "HAM",
        "Hunting Horn": "HH",
        "Lance": "LANCE",
        "Gunlance": "GL",
        "Switch Axe": "SA",
        "Charge Blade": "CB",
        "Insect Glaive": "IG",
        "Bow": "BOW",
        "Light Bowgun": "LBG",
        "Heavy Bowgun": "HBG"
    }

    return (
        // <p>{follower.follower_name}</p>
        <div className="p-10  text-center rounded-md bg-slate-50 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-500">
            <h1 className="text-2xl font-bold">{follower.follower_name}</h1>
            <img className="mb-5"src={getFollowerArt(follower.follower_name)}/>
            <h2 className="text-base font-bold truncate">{follower.follower_title}</h2>
            <p className="">{follower.follower_description}</p>
            <p>
                <span className="text-salte-50 dark:text-slate-50 font-bold">Health: </span>
                <span className="text-green-500 font-bold">{follower.follower_health}</span>
            </p>

            <p>
                <span className="text-salte-50 dark:text-slate-50 font-bold">Stamina: </span>
                <span className="text-yellow-300 font-bold">{follower.follower_stamina}</span>
            </p>
            {follower.hunting_style.split(',').map((style, index) => (
                <p key={index}>{style.trim()}</p>
            ))}
            <div className="p-10 grid grid-cols-3 gap-4">
                {JSON.parse(follower.weapons).map((weapon, index) => (
                    <img className="w-full h-full"src={getWeaponIcon(weaponmapping[weapon])}/>
                ))}
            </div>
           

        </div>
       
    );
}