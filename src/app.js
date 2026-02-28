const express = require("express");
const connectDB =require("./config/database");
const app =express();

const User = require("./models/users");
app.post("/signup", async(req,res)=>{
   //creating a new instance of User Model
   const user = new User({
      firstName: "hello",
      lastName: "world",
      emailId: "hello@test.com",
      password:"helloworld"

   })
   try{
      await user.save();
      res.send("Submitted succesfully");
   }
   catch(err){
      res.status(400).send("error",err.message)
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
 
 