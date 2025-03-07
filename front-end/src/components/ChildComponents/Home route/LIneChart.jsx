import { Line } from "react-chartjs-2";
import { Chart,CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend } from "chart.js";
import { useContext, useEffect } from "react";
import { axiosPublic } from "../../../Custom Hoocks/Axios/useAxiosPublick";
import { dataProvider } from "../../ContextApi/ContextProvider";

// lets register the components.
Chart.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend)
const LIneChart = () => {

let option={ responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'তোমার গত এক সপ্তাহের আগ্রগতি', 
      }
     
    },}



    // let's fetch the actual data from the server.
const {userData}=useContext(dataProvider)


let userREadingData=userData?.read

// main 2 resource.
 let DateArray=[]
 let readingTime=[]

userREadingData?.forEach(item=>{
    let date=item.readDate
    if(!DateArray.includes(date)){
        DateArray.push(date)
    }
})

DateArray=DateArray.slice(-7)


// let's make an array that contain this days reading time and sum them.

// conver hour funciton.
const conHour = (param) => {
  const hour=(param/(60*60*1000)).toFixed(1)
 
  if(!isNaN(hour)){
      return hour
  } else{
      return 0
  }
 
};

DateArray?.forEach(item=>{
    // match the data which date is equal to item date.
    let mathcDateData=userREadingData?.filter(childItem=>childItem?.readDate===item)
   
    // now let's sum the matched date reading time.
   let sum= mathcDateData?.reduce((prev,next)=>prev+next?.resource?.total,0)
   readingTime.push(conHour(sum))
})



// converter function.




let data={
   
        labels: DateArray,
        datasets: [
          {
            label: 'সময় (ঘণ্টা)', 
            data:readingTime,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
    
}

  return <Line options={option} data={data}/>;
};

export default LIneChart;
