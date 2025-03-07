import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosPublic } from '../../Custom Hoocks/Axios/useAxiosPublick';
import GetDate from '../../Custom Hoocks/GetDate';
import ConMil from '../../Custom Hoocks/ConverMil';

const DynamicStudent = () => {
    const url=useLocation()
    const email=url.pathname.split("/")[2]
    const[userData,setUserData]=useState(null)
    useEffect(()=>{
        axiosPublic.post("/get-a-user",{email})
        .then(res=>setUserData(res.data))
    },[email])
   
    // today read.
    const readArray=userData?.read 
    const todayRead=readArray?.filter(item=>item.readDate===GetDate())
    console.log(todayRead)
    let time=(params)=>{
        return ConMil(params)
    }
    return (
        <div>
            <h1 className='text-xl font-bold text-center'>Today Read</h1>
            <div className='grid grid-cols-2 gap-6 mt-4'>
                {
                    todayRead?.map((item,idx)=>{
                       return(
                        <a key={idx} className='w-full bg-gray-200 p-1 rounded-xl' href={item?.resource?.file}>
                        <img className='w-full rounded-xl h-[100px] object-cover' src={item?.resource?.file} alt="" />
                       <div className='flex justify-between items-center flex-col'>
                       <h1>Date: {item?.readDate}</h1>
                        <h1>Submit Time:{item?.resource?.submitedAt}</h1>
                        <h1 className=' font-bold'>{time(item.resource.total).h}<span className='text-xs'>ঘণ্টা </span> {time(item.resource.total).m}<span className='text-xs'>মিনিট </span> {time(item.resource.total).s}<span className='text-xs'>সেকেন্ড</span></h1>
                       </div>
                    </a>
                       )
                    })
                }
            </div>
        </div>
    );
};

export default DynamicStudent;