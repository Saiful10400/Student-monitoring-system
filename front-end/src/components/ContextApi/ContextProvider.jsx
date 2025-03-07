import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../assets/firebase/firebase.config';
import io from "socket.io-client"
import { axiosPublic } from '../../Custom Hoocks/Axios/useAxiosPublick';
import Swal from 'sweetalert2';
// let's connect to the socket server with client.
const socket=io("https://manage-students-socket-server.glitch.me")
export const dataProvider=createContext(null)
const ContextProvider = ({children}) => {

    // if new user implemented set it into and state.
    const[user,setUser]=useState(null)
    // set user data.
    const[userData,setUserData]=useState(null)

    // manage loader state.
    const[loading,setLoading]=useState(true)
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            if(user){
             
              // let's update connected user emil.
              socket.emit("connection",{email:user.email,name:user.displayName})
                setUser(user)
                setLoading(false)
                
            } else{
              setUser(user)
              setLoading(false)
            }
        })

        return ()=>unsubscribe
    },[])

const[refetch,setRefetch]=useState(false)
    useEffect(()=>{
    socket.on("getUserData",(data)=>{
      setUserData(data)
    
      
    })
    },[socket])



    const [clockTime,setClockTime]=useState(0)
    const [startClock,setStartClock]=useState(false)
    const [stopClockbtn,setStopClockBtn]=useState(false)
    const [stopClock,setStopClocks]=useState(false)
    const [activity,setActivity]=useState("start")

    useEffect(()=>{
      if(startClock&&userData){
          const clearclock=setInterval(()=>{
              if(clockTime>=0){
                setClockTime(prev=>prev-=1000)
              }
          },1000)
  
          // stop the clock.
          if(stopClock || clockTime===0){
              clearInterval(clearclock)
              
          }
      
          return()=>clearInterval(clearclock)
      }
  },[startClock,userData,stopClock])







    // study start button handle.
    let startStudyHandle=()=>{
      // lets manupulate user data.(what's happened we will check letter.)
      setClockTime(userData?.todayRemaining)
      setStartClock(true)
      // setStopClockBtn(true)
      setActivity("stop")
      axiosPublic.post("/Start-reading",{email:user.email})
      .then(()=>{
        setRefetch(prev=>!prev)
      })
  }


 // if reading is true then remain the previous thing.
 const [stopRerander,setStopRender]=useState(true)
 if(userData?.isreading && stopRerander){
     setClockTime(userData?.todayRemaining)
     setStartClock(true)
     setActivity("stop")
     setStopRender(false)
 }



const[stopbtn,setStopBtn]=useState(false)
     // study stop handle.
     let stopStudyHandle=()=>{
        
        
      if(user){



        // study stop handle with a confirmation.
        Swal.fire({
          title: "তুমি কি নিশ্চিত?", 
          text: "তুমি কি বিরতি নিতে চাও?", 
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "হ্যাঁ,চাই!",
          cancelButtonText: "এখন না, পরে নিব!" 
        }).then((result) => {
          if (result.isConfirmed) {
           
            setStopBtn(true)
          axiosPublic.post("/stop-clock",{email:user.email})
          .then(res=>{
              if(res.data){
                  setStopClocks(true)
                  setActivity("submit")
                  setStopBtn(false)
              }
          })

          }
        });


        





        
      }
  }



  // handle form negative value.
if(clockTime!==0 && clockTime<1000){
  axiosPublic.post("/stop-clock",{email:user.email})
          .then(res=>{
              if(res.data){
                  setStopClocks(true)
                  setActivity("submit")
                  setClockTime(0)
                  if(userData){
                    axiosPublic.post("/hanle-last-moment",{email:userData.email})
                  }
              }
          })
}





    // clock related activitier.

  // 3.signup with e-mail and password.
  const emailAndPasswordsignup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // 4.signin with email and password.
  const loginWithEmail=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }


  // clock related functions and events.











    const contextData={emailAndPasswordsignup,loading,stopbtn,socket,setActivity,loginWithEmail,activity,user,startStudyHandle,stopStudyHandle,clockTime,stopClockbtn,userData}
    return (
        <dataProvider.Provider value={contextData}>
            {children}
        </dataProvider.Provider>
    );
};

export default ContextProvider;