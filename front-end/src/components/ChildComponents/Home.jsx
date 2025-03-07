import React, { useContext } from "react";
import { dataProvider } from "../ContextApi/ContextProvider";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./home.css"
import GetDate from "../../Custom Hoocks/GetDate";
const Home = () => {
  const { user } = useContext(dataProvider);

  return <div className="">
    {user ? <div>
        <div className="text-center">
            <h1>আজকের তারিখঃ {GetDate()}</h1>

            <div className="flex mt-5 items-center justify-center gap-x-5"><NavLink to={"/"} className="btn btn-primary bg-gray-300 text-gray-600 border-none btn-sm"> আজকের কাজ</NavLink>
            <NavLink to={"/lastweek"} className="btn btn-primary bg-gray-300 text-gray-600 border-none btn-sm">গত এক সপ্তাহে</NavLink></div>
            <div className="mt-6 border-t-2 border-black"><Outlet></Outlet></div>

           
        </div>
    </div> :

     <div>
        <h1 className="text-xl text-center text-red-500">এই সফটওয়্যারটি ব্যাবহার করতে হলে তোমার একটি একাউন্ট লাগবে।</h1>
        <div className="h-[50vh] flex flex-col justify-center items-center">
        <h1 className="text-center text-lg">আচ্ছা,তোমার কি কোন একাউন্ট আছে ?</h1> 
        <h1 className="flex justify-center items-center gap-x-4 mt-3"><Link className="btn btn-primary" to={"/login"}>হ্যা,আছেতো</Link> <Link className="btn btn-primary" to={"/register"}>না,নেইতো</Link></h1>
        </div>
     </div>}
    </div>;
};

export default Home;
