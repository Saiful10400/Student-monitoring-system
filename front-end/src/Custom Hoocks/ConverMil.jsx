import React from 'react';

const ConMil = (param) => {
    const hour=parseInt(param/(60*60*1000))
    const min=parseInt((param%(60*60*1000))/(60*1000))
    const sec=parseInt(((param%(60*60*1000))%(60*1000))/1000)
    // return `${hour} Hour ${min} Min ${sec} Sec`

   
    if(!isNaN(hour) && !isNaN(min) && !isNaN(sec)){
        return {h:hour,m:min,s:sec,skleton:false}
    } else{
        return {h:" . ",m:" . ",s:" . ",skleton:true}
    }
    

};

export default ConMil;