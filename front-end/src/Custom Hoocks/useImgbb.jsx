

const imgUpload = (file) => {
    const imgbbUrl=`https://api.imgbb.com/1/upload?key=bec94ed5bc48a1802eafe0cce3055f89`
    
    const data=new FormData()
    data.append("image",file)
    return fetch(imgbbUrl,{method:"POST",body:data})
};

export default imgUpload;