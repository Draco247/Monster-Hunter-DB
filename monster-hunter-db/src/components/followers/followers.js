import {useState, useEffect} from "react";
import { FollowerCard } from "./followercard";

export default function Followers({fade}){
    const [followers,setFollowers] = useState([])

    useEffect(() => {
        // setQuests([])
        fetch(`https://localhost:443/api/v1/followers/getAll`)
            .then(res => res.json())
            .then((result)=> {
                setFollowers(result);
            })}, []);
    console.log(followers);

    return (
        <div className={`p-10 ${fade === false ? "transition duration-200 ease-in opacity-100" : "opacity-0"}`}>
            <h1 className="text-center">Followers</h1>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {followers.map(follower => (
                    <FollowerCard key={follower.id} follower={follower} />
                ))}
            </div>
        </div>
       
    );

}