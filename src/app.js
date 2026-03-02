const express = require("express");
const connectDB =require("./config/database");
const app =express();

const User = require("./models/users");


app.use(express.json())
app.post("/signup", async(req,res)=>{
   //creating a new instance of User Model
   const user = new User(req.body);
   try{
      await user.save();
      res.send("Submitted succesfully");
   }
   catch(err){
      res.status(400).send("error",err.message)
   }
   
})
//get user by email
app.get("/user",async(req,res)=>{
   const userEmail = req.body.emailId;
   try{
      const user = await User.findOne({emailId: userEmail});
      if(!user){
         res.send("User not found")
      }
      else{
         res.send(user);
      }
   }
   catch(err){
      res.status(400).send("Soemthing went wrong")
   }

})

//Get all users
app.get("/feed", async(req,res)=>{
    
   try{
      const users = await User.find({});
      res.send(users);

   }
   catch(err){
      res.status(400).send("something went wrong")
   }
})
//Delet user by id
app.delete("/user", async(req,res)=>{
   const userId = req.body.userId;
   try{
      const user = await User.findByIdAndDelete(userId);
      res.send("User Deleted Successfully");
   }catch(err){
      res.status(400).send("Something went wrong")
   }
})

//Update user
app.patch("/user", async(req,res)=>{
   
   const userID = req.body.userId;
   
   console.log(userID)
   const data= req.body;
   try{
      await User.findByIdAndUpdate({_id: userID}, data);
      res.send("User updated Successfully");
   }catch(err){
      res.status(400).send("Something went wrong")
   }
})
connectDB().
then(()=>{
   console.log("database connected")
app.listen("7777",()=>{
    console.log("listening on port 7777");
 });
}).catch((err)=>{
console.log("database cannot be connected")
})
 
 