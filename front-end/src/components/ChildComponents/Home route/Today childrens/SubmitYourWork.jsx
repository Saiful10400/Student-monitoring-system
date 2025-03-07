import React, { useContext, useState } from 'react';
import { FaCamera } from "react-icons/fa";
import { dataProvider } from '../../../ContextApi/ContextProvider';
import imgUpload from '../../../../Custom Hoocks/useImgbb';
import { axiosPublic } from '../../../../Custom Hoocks/Axios/useAxiosPublick';
import Swal from 'sweetalert2';
const SubmitYourWork = () => {
    const{activity,userData,setActivity}=useContext(dataProvider)

    // file submit handle.
    const[photo,setPhoto]=useState(null)
    const fileONInput=(e)=>{
        let file=e.target.files[0]
        
        // let's read the file.
        const reader = new FileReader();
        reader.onload = () => {
          setPhoto({url:reader.result,file:file})
        };
        reader.readAsDataURL(file);
    }

    // work submit handel.
    const[submitbtn,setSubmitBtn]=useState(false)
    const SubmitHandle=()=>{
        setSubmitBtn(true)
        // atfirst upload the image into mongodb.
        imgUpload(photo.file)
        .then(res=>res.json())
        .then(result=>{
            
            // let's post the data into mongodb.
            axiosPublic.post("/submit-task",{email:userData.email,file:result.data.url,totalRead:userData?.readPrimaryEnd-userData?.readPrimaryStart})
            .then(res=>{
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${userData.name}, এতটা কষ্ট করার জন্য তোমাকে অসংখ্য ধন্যবাদ`,
                    showConfirmButton: false,
                    timer: 3000
                  }).then(()=>{
                    setActivity("start")
                    setPhoto(null)
                    location.reload()
                  })
                
            })
        })
        
    }
    return (
        <div className={`${activity==="submit"|| userData?.submited===false?"block mt-12":"hidden"}`}>
            <div>
                <label htmlFor="input">
                    <div className='border-dashed border-2 rounded-lg overflow-hidden  w-[90%] mx-auto mt-3 h-[20vh] flex justify-center items-center flex-col gap-3'>
                        {
                            photo?<img className='w-full h-full object-cover' src={photo?.url}></img>:
                            <>
                        <span className='text-4xl'><FaCamera /></span>
                        <h1 className='w-[97%] text-gray-500 font-semibold'>এতক্ষণ যাকিছু পড়েছ তার একটি লিস্ট খাতায় লিখে সেই লিস্টের ছবি তোল।</h1> 
                        <h1 className='text-xs font-bold text-red-400'>(ছবি তুলতে ক্যামেরা আইকনে টাচ কর।)</h1> 
                        </>
                        }
                    </div>
                </label>
                <input onInput={fileONInput} className='hidden' id="input" capture="environment" type="file" name="file"/>

                <button disabled={submitbtn||!photo?true:false} onClick={SubmitHandle}  className='btn btn-success w-[70%] mt-3'>{submitbtn?<span className="loading loading-spinner loading-lg"></span>:"জমা দাও"}</button>
            </div>
            <h1 className={`${activity==="submit"|| userData?.submited===false?"block mt-10 w-[90%] mx-auto text-red-500":"hidden"}`}>!! ছবি তুলে সাবমিট না করলে তুমি পড়েছ বলে গণ্য হবে না ।</h1>
        </div>
    );
};

export default SubmitYourWork;