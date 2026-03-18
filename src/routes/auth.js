const express = require("express");
const authRouter = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("../utils/validation");
//Sign Up
authRouter.post("/signup", async(req,res)=>{
   
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
authRouter.post("/login", async (req,res)=>{
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

authRouter.post("/logout", async(req,res)=>{
    res.cookie("token", null, {expires: new Date(Date.now())})
    res.send("Logout Succesfull !")
})

module.exports = {authRouter}