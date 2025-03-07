

const GetDate = () => {
    
    let todayDateobj=new Date();

    let day=todayDateobj.getDate().toString().padStart(2,0)
    let month=((todayDateobj.getMonth())+1).toString().padStart(2,0)
    let year=todayDateobj.getFullYear()

    return `${day}-${month}-${year}`
     
};

export default GetDate;