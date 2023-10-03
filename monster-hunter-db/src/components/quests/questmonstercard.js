import { getMonsterIcon } from '../monsters/getMonsterIcon';
import { Link } from "react-router-dom"
import CrownMini from "../../assets/icons/crown_mini.png"
import CrownKing from "../../assets/icons/crown_king.png"

export const QuestMonsterCard = ({questminicrowns, questkingcrowns, monster}) => {
    return (
        <div key={monster.id} className="text-center">
            <Link to={`/monsters/${monster.id}`} className="no-underline">
                <div className="max-w-sm bg-gray-300 border-3 border-black rounded-lg shadow dark:bg-slate-900 dark:border-gray-700 h-full flex flex-col group hover:bg-slate-700 dark:hover:bg-slate-600">
                    <img
                        className="mx-auto"
                        src={getMonsterIcon(monster.name)}
                        alt=""
                    />
                    <div className="p-5 flex-grow">
                        <h5 className="mb-3 font-bold text-gray-950 dark:text-gray-400">
                        {monster.name}
                        </h5>
                    </div>
                    {questminicrowns[monster.id] && questminicrowns[monster.id].length > 0 && (
                        <div className="text-center">
                            <hr class="w-48 h-1 mx-auto my-4 bg-slate-800 border-0 rounded md:my-10 dark:bg-slate-50"/>
                            <div className="flex flex-col items-center">
                                <img src={CrownMini} alt="mini crown" className="w-8 h-8 mb-4" />
                                <ul className="list-none p-0 text-slate-950 dark:text-slate-50 font-bold">
                                    {questminicrowns[monster.id].map((item, index) => (
                                        <li key={index} className="flex items-center mb-2">
                                            {Object.entries(item).map(([key, value]) => (
                                                <p key={key} className="m-0">
                                                    {key}: {value}
                                                </p>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {questkingcrowns[monster.id] && questkingcrowns[monster.id].length > 0 && (
                        <div className="text-center">
                            <hr class="w-48 h-1 mx-auto my-4 bg-slate-800 border-0 rounded md:my-10 dark:bg-slate-50"/>
                            <div className="flex flex-col items-center">
                                <img src={CrownKing} alt="king crown" className="w-8 h-8 mb-4" />
                                <ul className="list-none p-0 text-slate-950 dark:text-slate-50 font-bold">
                                    {questkingcrowns[monster.id].map((item, index) => (
                                        <li key={index} className="flex items-center mb-2">
                                            {Object.entries(item).map(([key, value]) => (
                                                <p key={key} className="m-0">
                                                    {key}: {value}
                                                </p>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                </div>
            </Link>
        </div>
    );
}