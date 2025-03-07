const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.port || 5000;
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ftruncate, read } = require("fs");
require("dotenv").config();

// initialize app.
const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});

// mongodb uri.
const uri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.qe6izo7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version  
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


async function run() {
  try {
    
 

    // all routes start from here.

   




    // Database Name.
    let Database=client.db("Student_Track")
    // all database collection name.
    let userCollection=Database.collection("Users")

 // home route.
 app.get("/",async(req,res)=>{
  res.send(`The server is running at ${port}`)
})


// necessary functions.

const GetDate = () => {
    
  let todayDateobj=new Date();

  let day=todayDateobj.getDate().toString().padStart(2,0)
  let month=((todayDateobj.getMonth())+1).toString().padStart(2,0)
  let year=todayDateobj.getFullYear()

  return `${day}-${month}-${year}`
   
};


//    ### manage all user.



// 2.get all students.
app.get("/get-all-students",async(req,res)=>{
  let result=await userCollection.find({role:"student"}).toArray()
  res.send(result)
})

// 3.set student reading time.
app.post("/set-reading-time",async(req,res)=>{
  let {hour,email}=req.body
  let update={$set:{readingtime:parseInt(hour*60*60*1000),todayRemaining:parseInt(hour*60*60*1000)}}
  const result=await userCollection.updateOne({email},update,{upsert:true})
  res.send(result)
})

// 4. get a user data with email.
app.post("/get-a-user",async(req,res)=>{
  let{email}=req.body
  let result=await userCollection.findOne({email})
  res.send(result)
})








// ##### socket  io handle.
let activeUsers=[]

// get id.
const getId=(email)=>{
  let data=activeUsers.find(item=>item.email===email)
  return data.id
}
io.on("connection",(socket)=>{
  
 
  // 1. Add a user into database.

app.post("/add-a-user", async(req,res)=>{
  let data=req.body
  let result=await userCollection.insertOne({...data,isreading:false,submited:true,role:"student",joined:new Date().toLocaleDateString(),today:GetDate(),readingtime:18000000,todayRemaining:18000000})
  res.send(result) 
  const {email}=req.body
  const userData=await userCollection.findOne({email})
  io.to(getId(email)).emit("getUserData",{...userData})
})

  // 6. student is stoping study.
app.post("/stop-clock",async(req,res)=>{
  let{email}=req.body
  const upsert={upsert:true}
  const id={email}


  const currentuser=await userCollection.findOne(id)
  const readingDone=Date.now()-currentuser.readingStart
      const previouTimeREmaining=currentuser.todayRemaining
       

  //
  if(currentuser.isreading){
    const readingChange=await userCollection.updateOne(id,{$set:{isreading:false,readPrimaryEnd:Date.now(),submited:false,readingStart:0,todayRemaining:previouTimeREmaining-readingDone}},upsert)
    const userData=await userCollection.findOne({email})
  io.to(getId(email)).emit("getUserData",{...userData})
  res.send(readingChange)

  }
  
  
})

// submit the task.

app.post("/submit-task",async(req,res)=>{
  const {email}=req.body
  let data=req.body
  // const updateObje={ $push: { "read.$[elem].chunk": { total: data.totalRead, file: data.file } } }
  const  updateObje={ 
    $push:{read:{ 
      readDate: GetDate(),
      resource: { submitedAt:new Date().toLocaleTimeString(),total: data.totalRead, file: data.file }
   }
  
 }
 }
 const update2={$set:{submited:true,readPrimaryStart:0,readPrimaryEnd:0}}
  const result=await userCollection.updateOne({email},updateObje,{upsert:true})
  const result2=await userCollection.updateOne({email},update2,{upsert:true})
  res.send({result,result2})
  const userData=await userCollection.findOne({email})
  io.to(getId(email)).emit("getUserData",{...userData}) 
}) 


// namage data when 0
app.post("/hanle-last-moment", async(req,res)=>{
  const{email}=req.body
  const update={$set:{todayRemaining:0}}
  console.log(email)
  const result=userCollection.updateOne({email},update)
  console.log(result)
  const userData=await userCollection.findOne({email})
  io.to(getId(email)).emit("getUserData",{...userData}) 
})




  // start a timmer

// 5. student is starting study.
app.post("/Start-reading",async(req,res)=>{
  let{email}=req.body
  const upsert={upsert:true}
  const id={email}


  // lets update user is reading or not.
  const readingCange=await userCollection.updateOne(id,{$set:{isreading:true,readPrimaryStart:Date.now(),readingStart:Date.now(),today:GetDate()}},upsert)
  const userData=await userCollection.findOne({email})
  io.to(getId(email)).emit("getUserData",{...userData})
  
  
}) 





  // garbage dont see there.
  // connnected user handle with.(is the are stil connected or disconnected.)
  socket.on("connection",async(data)=>{
    // push user data into active user array.
    let check=activeUsers.find(item=>item.id===socket.id)
    if(!check){
      activeUsers.push({...data,id:socket.id})
    } 

        // the person who will is connected.
        const udata=activeUsers.find(item=>item.id===socket.id)
        const udata2=activeUsers.find(item=>item.email==="saifulislam10400i5@gmail.com")
        io.to(udata2?.id).emit("activeUser",activeUsers)
       
        const ReconnectUserData=await userCollection.findOne({email:udata?.email})
        if(ReconnectUserData){
          

          if(ReconnectUserData?.today!==GetDate() && ReconnectUserData){
            const updateNewDay=await userCollection.updateOne({email:ReconnectUserData.email},{$set:{today:GetDate(),todayRemaining:ReconnectUserData.readingtime}})
            // lets refetch data again
            const Refetch=await userCollection.findOne({email:ReconnectUserData.email})
            io.to(getId(ReconnectUserData.email)).emit("getUserData",{...Refetch})
            return
          }
       else if(ReconnectUserData?.isreading){
          
          // udpate user data on mongo.
          const readingDone=Date.now()-ReconnectUserData.readingStart
          const previouTimeREmaining=ReconnectUserData.todayRemaining
          const UpdateuserData=await userCollection.updateOne({email:ReconnectUserData.email},{$set:{readingStart:Date.now(),todayRemaining:previouTimeREmaining-readingDone}})
          io.to(getId(ReconnectUserData.email)).emit("getUserData",{...ReconnectUserData})
          console.log(activeUsers) 

        } else{
          
          io.to(getId(ReconnectUserData.email)).emit("getUserData",{...ReconnectUserData})
          
        }


        }  




  })
  socket.on("disconnect",async(data)=>{

    // manage disconnect user.
    const udata=activeUsers.find(item=>item.id===socket.id)
        if(udata){


          const ReconnectUserData=await userCollection.findOne({email:udata?.email})
        if(ReconnectUserData?.isreading){
          // udpate user data on mongo.
          const readingDone=Date.now()-ReconnectUserData.readingStart
          const previouTimeREmaining=ReconnectUserData.todayRemaining
          const UpdateuserData=await userCollection.updateOne({email:ReconnectUserData.email},{$set:{readingStart:Date.now(),todayRemaining:previouTimeREmaining-readingDone}})
          activeUsers=activeUsers.filter(item=>item.id!==socket.id)
          const udata=activeUsers.find(item=>item.id===socket.id)
        io.to(udata?.id).emit("activeUser",activeUsers)
        } else{
          activeUsers=activeUsers.filter(item=>item.id!==socket.id)
          const udata=activeUsers.find(item=>item.email==="saifulislam10400i5@gmail.com")
        io.to(udata?.id).emit("activeUser",activeUsers)

        } 

        }
  
    
  })
 
})








    // end.


    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// let's start the server.
server.listen(port,()=>{
    console.log(`the server is running`) 
})