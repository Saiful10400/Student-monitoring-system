import React, { useContext, useEffect, useState } from 'react';
import { axiosPublic } from '../../../Custom Hoocks/Axios/useAxiosPublick';
import { dataProvider } from '../../ContextApi/ContextProvider';
import ConMil from '../../../Custom Hoocks/ConverMil';
import SubmitYourWork from './Today childrens/SubmitYourWork';
import "./today.css"
const Today = () => {



const{startStudyHandle,stopbtn,activity,stopStudyHandle,clockTime,userData}=useContext(dataProvider)


let time=ConMil(userData?.isreading?clockTime:userData?.todayRemaining)
    return (
        <>
        <div className='mt-4'>
            
            <div className='bg-gray-300 w-[95%] h-[145px] mx-auto rounded-lg py-5 relative'> 

            {/* for skleton. */}
            <div className={`${time?.skleton?"flex":"hidden"} flex-col absolute top-0 left-0 gap-4 w-full h-full`}>
            <div className="skeleton bg-gray-300 h-full rounded-lg w-full"></div>
            </div>

                <div className={time?.skleton?"hidden":"block"}>
                <h1 className='font-bold text-lg text-gray-500'>আজকে পড়তে হবে তোমাকে</h1>
                <h1 className='text-6xl font-bold mt-4'>{time.h}<span className='text-lg'>ঘণ্টা</span> {time.m}<span className='text-lg'>মিনিট</span> {time.s}<span className='text-lg'>সেকেন্ড</span></h1>
                </div>

            </div>
             {/* <h1 className='text-3xl font-bold mt-4'>{ConMil(userData?.readingtime)} <span className='text-lg'>ঘণ্টা</span></h1> */}
             <button disabled={userData?.todayRemaining<1000}  onClick={startStudyHandle} className={`${activity==="start"&&userData?.submited===true?"btn mt-12 btn-primary" :"hidden"}`}> {userData?.todayRemaining===0?"আজকের মিশন কমপ্লিট করার জন্য তোমাকে ধন্যবাদ।":"পড়া শুরু"}</button>
             <button disabled={stopbtn} onClick={stopStudyHandle} className={`${activity==="stop"?"btn mt-12 btn-warning" :"hidden"}`}>{stopbtn?<span className="loading loading-spinner loading-lg"></span>:"বিরতি নিব"}</button>
             <div className={`skeleton w-28 h-14 inline-block mt-9 ${time?.skleton?"":"hidden"} `}></div>
        </div>
        <SubmitYourWork></SubmitYourWork>
        </>
    );
}; 

export default Today;