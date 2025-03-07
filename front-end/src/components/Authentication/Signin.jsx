import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataProvider } from "../ContextApi/ContextProvider";
import Swal from "sweetalert2";
import { axiosPublic } from "../../Custom Hoocks/Axios/useAxiosPublick";

const Signin = () => {
  const move=useNavigate()
  const[err,setErr]=useState(null)
  const{loginWithEmail}=useContext(dataProvider)
    // form submit handle.
    const formSubmitHandle=(e)=>{
        e.preventDefault()
        const form =e.target
        const email=form.email.value
        const password=form.password.value
        // lets login.
        loginWithEmail(email,password)
        .then(res=>{
          if(res){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `তুমি সঠিকভাবে প্রবেশ করেছো`,
              showConfirmButton: false,
              timer: 3000
            }).then(()=>{
              // do something according user role.
              axiosPublic.post("/get-a-user",{email})
              .then(res=>{
                const{role}=res.data
                if(role==="teacher"){
                  move("/teacher")
                } else{
                  move("/")
                }
              })
            })
          }
        }).catch(err=>setErr(err.message))
    }
  return (
    <>
    <div className="flex justify-center items-center h-[60vh] lg:h-screen">
      <div className="card shrink-0 w-full lg:max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={formSubmitHandle} className="card-body">
        <h1 className={`text-red-700 text-center font-bold ${!err&&"hidden"}`}>ভুল হয়েছে!!<br></br> পুনরায় সঠিকভাবে ই-মেইল এবং পাসওয়ার্ড লিখ</h1>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">ই-মেইল</span>
            </label>
            <input
              type="email"
              placeholder="তোমার ই-মেইল লিখ"
              className="input input-bordered"
              name="email"
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


          <div className="text-end"><Link to={"/register"} className="mt-5 text-sm text-end text-red-600 inline-block">আমার কোন একাউন্ট নেই</Link></div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Ok</button>
          </div>
         
        </form>
      </div>
    </div>
    <h1 className="text-center">তোমার পূর্বের একাউন্ট না থাকলে <span className="text-sm text-red-600 font-bold">"আমার কোন একাউন্ট নেই"</span> এই লেখায় টাচ কর।</h1> 
    </>
  );
};

export default Signin;
