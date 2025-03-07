import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataProvider } from "../ContextApi/ContextProvider";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../assets/firebase/firebase.config";
import { axiosPublic } from "../../Custom Hoocks/Axios/useAxiosPublick";
import Swal from 'sweetalert2'

const Signup = () => {
const {emailAndPasswordsignup,user}=useContext(dataProvider)
const move=useNavigate()
const[err,setErr]=useState(null)
    // signup form handle.

    const SignupHandle=(e)=>{
        e.preventDefault()
        const form=e.target
        const name=form.name.value
        const email=form.email.value
        const password=form.password.value
        
        // now lets signup with firebase.
        emailAndPasswordsignup(email,password)
        .then(res=>{
            // lets update user name.
            console.log(res)
            if(res){
              updateProfile(auth.currentUser,{ displayName:name})
              .then(()=>{
                // now lets add this user into mongodb.
                axiosPublic.post("/add-a-user",{name,email,password,isreading:false})
                .then(res=>{
                  console.log(res,"res form mongo after new user connection.")
                  if(res.data){
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: `${name}, তুমি সঠিকভাবে একাউন্ট তৈরি করেছো`,
                      showConfirmButton: false,
                      timer: 3000
                    }).then(()=>move("/"))
                  }
                })
              })
            }
        }).catch(err=>{
            setErr(err.message)
        })
    }

  return (
    <>
    <div className="flex justify-center items-center h-[60vh] lg:h-screen">
      <div className="card shrink-0 w-full lg:max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={SignupHandle} className="card-body">
        <h1 className={`text-red-700 text-center font-bold ${!err&&"hidden"}`}>ভুল হয়েছে!!<br></br> পুনরায় সঠিকভাবে ই-মেইল এবং পাসওয়ার্ড লিখ</h1>


          <div className="form-control">
            <label className="label">
              <span className="label-text">নাম</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="তোমার নাম লিখ"
              className="input input-bordered"
              required
            />
          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text">ই-মেইল</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="তোমার ই-মেইল লিখ"
              className="input input-bordered"
              required
            />
            
          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text">পাসওয়ার্ড</span>
            </label>
            <input
              type="text"
              placeholder="তোমার পাসওয়ার্ড লিখ"
              className="input input-bordered"
              required
              name="password"
            />
            
          </div>

          <div className="text-end"><Link to={"/login"} className="mt-5 text-sm text-end text-red-600 inline-block">আমার আগের একাউন্ট আছে</Link></div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Ok</button>
          </div>
        </form>
      </div>
    </div>
        <h1 className="text-center">তোমার পূর্বের একাউন্ট থাকলে <span className="text-sm text-red-600 font-bold">"আমার আগের একাউন্ট আছে"</span> এই লেখায় টাচ কর।</h1>
    </> 

  );
};

export default Signup;
