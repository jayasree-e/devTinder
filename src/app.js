const express = require("express");
const bcrypt = require("bcrypt");
const connectDB =require("./config/database");
const cookieParser = require("cookie-parser");

const app =express();

const User = require("./models/users");
const {validateSignUpData} = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");

app.use(express.json())
app.use(cookieParser())
//Sign Up
app.post("/signup", async(req,res)=>{
   
   try{
      validateSignUpData(req);
      const {firstName, lastName, emailId, password} = req.body;
      const passwordHash = await bcrypt.hash(password,10)
      const user = new User({firstName, lastName, emailId, password: passwordHash});
      await user.save();
      res.send("Submitted succesfully");
   }
   catch(err){
      res.status(400).send(err.message)
   }
   
})
//Login
app.post("/login", async (req,res)=>{
   try{
    const {emailId, password} = req.body;
    const user = await User.findOne({emailId: emailId})
    if(!user){
      res.send("Invalid credentials")
    }
    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid){
      const token = await user.getJWT();
      res.cookie("token",token, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
  })
      res.send("Login successful")
    }
    else{
      res.send("Invalid credentials")
    }
   }
   catch(err){
       res.status(400).send(err.message)
   }
})

app.get("/profile",userAuth, async(req,res)=>{
   try{
     
      res.send(req.user);
   }
   catch(err){
       res.status(400).send(err.message)
   }
   
})
app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
   try{
     const user= req.user
      res.send(user.firstName +"  sNew Connection Request");
   }
   catch(err){
       res.status(400).send(err.message)
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
 
 