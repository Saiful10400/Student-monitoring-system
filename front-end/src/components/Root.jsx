import React, { useContext } from 'react';
import { Outlet, useLocation, } from 'react-router-dom';
import { dataProvider } from './ContextApi/ContextProvider';
import lgif from "../../public/images/loader.gif"
const Root = () => {
    const url=useLocation().pathname.split("/")[1]
   const{user,userData}=useContext(dataProvider)
  
    return (
        <div>
            <div className=''>
                <h1 className='text-lg font-bold text-center pt-2'>{url==="register"&&"তোমার একটি একাউন্ট তৈরি কর।"}</h1> 
                <h1 className='text-lg font-bold text-center pt-2'>{url==="login"&&"তোমার ই-মেইল পাসওয়ার্ড দিয়ে প্রবেশ কর।"}</h1>
                {/* let's set student name. */}

                <h1 className={`${user?"block text-xl text-center font-bold mb-4 border-black border-b-2":"hidden"}`}>{user?.displayName}</h1>
            </div>
            <div><Outlet></Outlet></div>

        </div>
        // userData?<div>
        //     <div className=''>
        //         <h1 className='text-lg font-bold text-center pt-2'>{url==="register"&&"তোমার একটি একাউন্ট তৈরি কর।"}</h1> 
        //         <h1 className='text-lg font-bold text-center pt-2'>{url==="login"&&"তোমার ই-মেইল পাসওয়ার্ড দিয়ে প্রবেশ কর।"}</h1>
        //         {/* let's set student name. */}

        //         <h1 className={`${user?"block text-xl text-center font-bold mb-4 border-black border-b-2":"hidden"}`}>{user?.displayName}</h1>
        //     </div>
        //     <div><Outlet></Outlet></div>

        // </div>:<div className="w-full bg-[#221f37] h-screen flex justify-center items-center"><img src={lgif} alt="" /></div>
    );
};

export default Root;