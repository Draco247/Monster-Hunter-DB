import { getMonsterIcon } from './getMonsterIcon';
import { Link } from "react-router-dom"

export const MonsterCard = ({monster}) => {
    // console.log(monster.id)
    // console.log(monster)
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
                </div>
            </Link>
        </div>
    )
}