import * as React from 'react';
import {useState, useEffect, useLayoutEffect} from "react";
import { getWeaponArt } from './getWeaponArt';
import { getControllerIcon } from '../getControllerIcon';
import reactStringReplace from 'react-string-replace';
import { WeaponColumns } from './weaponcolumns';




export default function Weapons({id}) {
    const [weapons, setWeapons] = useState([])
    const [switchskills, setswitchskills] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [fade, setFade] = useState(true);
    
    useEffect(() => {
        console.log(id);
        const fetchWeapons = async () => {
            try {
                setWeapons([])
                const response = await fetch(`https://localhost:443/api/v1/weapons/${id}/weapons`);
                const data = await response.json();
                setWeapons(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching weapons:', error);
            }
        };

        const fetchSwitckSkills = async (id) => {
            try {
                // setWeapons([])
                const response = await fetch(`https://localhost:443/api/v1/switch-skills/${id}/switch-skills`);
                const data = await response.json();
                setswitchskills(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching switch skills:', error);
            }
        };
        
        fetchWeapons();
        fetchSwitckSkills(id);
    }, [id]);
    // console.log(weapons);

    useEffect(() => {
        // Check if all required data objects are available
        if (weapons && switchskills) {
            // If all data is available, set loaded to true
            setLoaded(false);
            // setFade(true);
            // setLoaded(true);
            setTimeout(() => {
                // setFade(false);
                setLoaded(true);
              }, 100);

        }
    }, [weapons, switchskills]);

    useLayoutEffect(() => {
        setFade(true);
        if (loaded) {
            setTimeout(() => {
                setFade(false);
              }, 500);
        }
    }, [loaded]);

   
    if (!loaded) {
        // Render a loading message or return null
        return <div className="h-screen flex justify-center items-center" role="status">
                <svg aria-hidden="true" class="inline w-64 h-64 mr-2 text-slate-950 animate-spin dark:text-slate-50 fill-violet-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>;
    }
    // console.log()


    return (
        <div className={` p-10 ${fade === false ? "transition duration-150 ease-in opacity-100" : "opacity-0"}`}>
            <div class="grid grid-cols-4 gap-4 mb-3">
                <div class="col-span-2">
                    <img src={getWeaponArt(id)[0]} class="mx-auto border-3 border-black rounded-lg" />
                </div>
                <div class="col-span-2">
                    <img src={getWeaponArt(id)[1]} class="mx-auto border-3 border-black rounded-lg" />
                </div>
            </div>
            {/* <div className="weapon_art" style={{marginBottom: 20}}>
                <Grid container spacing={2} alignItems="stretch">
                        <Grid item xs={12} sm={6}>
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Box
                                    component="img"
                                    sx={{
                                        maxHeight: '100%',
                                        maxWidth: '100%',
                                        height: 'auto',
                                        border: '2px solid black',
                                        borderRadius: '5px',
                                    }}
                                    alt=""
                                    src={getWeaponArt(id)[0]}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Box
                                        component="img"
                                        sx={{
                                            maxHeight: '100%',
                                            maxWidth: '100%',
                                            height: 'auto',
                                            border: '2px solid black',
                                            borderRadius: '5px',
                                        }}
                                        alt=""
                                        src={getWeaponArt(id)[1]}
                                    />
                            </div>
                        </Grid>
                </Grid>
            </div> */}
            {switchskills.length > 0 ? (
                <div className="rounded-lg border-3 border-black overflow-hidden mb-3">
                     <table className="border-collapse table-auto w-full text-sm ">
                        <thead className="bg-slate-400 dark:bg-slate-900"> 
                            <tr>
                                <th className="border-b border-slate-950 dark:border-slate-600 font-semibold p-4 text-slate-950 dark:text-slate-200 text-left">Switch Skill</th>
                                <th className="border-b border-slate-950 dark:border-slate-600 font-semibold p-4 text-slate-950 dark:text-slate-200 text-left">Description</th>
                            </tr>
                        </thead>

                        <tbody className=" bg-slate-200 dark:bg-slate-800">
                            {switchskills.map((skills) => (
                                <tr>
                                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-800 dark:text-slate-500 dark:text-slate-400">{skills.switch_skill_name}</td>
                                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-800 dark:text-slate-500 dark:text-slate-400">
                                        {reactStringReplace(skills.switch_skill_description, /<([^>]+)>/g, (match, i) => (
                                        // Use group (the text inside the angle brackets) to create an image element
                                        <img
                                            src={getControllerIcon(match)} // Use match to determine the image path
                                            alt={`${match}`}
                                            // Add any other attributes you need for the image
                                            key={i} // Add a unique key for each image element
                                            style={{width: 30, height: 30, display: 'inline-block'}}
                                            // className="w-30 h-30 inline-block"
                                        />
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                ) : (
                    <div>Loading switch skill data...</div>
            )}

            {weapons.length > 0 ? (
                <div>
                    <WeaponColumns weapons={weapons} id={id}/>
                </div>
            ) : (
                <div>Loading weapons data...</div>
            )}
        </div>
    );
}