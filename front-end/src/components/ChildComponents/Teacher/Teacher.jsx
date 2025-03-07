import React, { useContext, useEffect, useState } from "react";
import { axiosPublic } from "../../../Custom Hoocks/Axios/useAxiosPublick";
import { dataProvider } from "../../ContextApi/ContextProvider";
import ConMil from "../../../Custom Hoocks/ConverMil";
import { Link } from "react-router-dom";

const Teacher = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axiosPublic.get("/get-all-students").then((res) => setStudents(res.data));
  },[]);

//   set targeted user emil.
const[targetEmail,setEmail]=useState(null)
//   form submit handle.
const formSubmit=(e)=>{
    e.preventDefault()
    const hour=e.target.hour.value
//    now lets set readingTime.
if(targetEmail){
    axiosPublic.post("/set-reading-time",{hour,email:targetEmail})
.then(res=>console.log(res.data))
}
}


const{socket}=useContext(dataProvider)
// manage students.
const [activeUser,setActiveUser]=useState([])
useEffect(()=>{
socket.on("activeUser",(data)=>{
  setActiveUser(data)
})
},[socket])

// checking if the user is active or not.
const checkActiveUser=(email)=>{
  const isActive=activeUser.find(item=>item.email=== email)
  if(isActive){
    return true
  } else{
    return false
  }
}

// today read.
const timeToday=(param)=>{
  if(param){
    const mustRead=param.readingtime
    const remaining=param.todayRemaining
    return ConMil(mustRead-remaining)

  }
}
  return (
    <div>
        <h1>This is teacher dashboard</h1>
      {students.map((item, idx) => {
        return (
          
          <h1 key={idx} className={`border py-3 mt-4 flex w-[500px] justify-between ${checkActiveUser(item.email)?"bg-green-500":""}`} >
            <Link to={`/teacher/${item.email}`} className="btn btn-primary" >Details</Link>
            <span>{item?.name}</span>
            <span >Today: <span className="text-xs font-bold ">{`${timeToday(item).h}H ${timeToday(item).m}M ${timeToday(item).s}S`}</span></span>
            <form onSubmit={formSubmit} className="flex items-center gap-x-1">
              <input required className="border w-28" type="number" step="any" name="hour" /> hour
              <button onClick={()=>setEmail(item.email)} className="btn btn-xs btn-primary">Set</button>
            </form>
          </h1>
          
        );
      })}
    </div>
  );
};

export default Teacher;
