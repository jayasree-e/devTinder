
const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation")
const profileRouter = express.Router();
profileRouter.get("/profile/view",userAuth, async(req,res)=>{
   try{
     
      res.send(req.user);
   }
   catch(err){
       res.status(400).send(err.message)
   }
   
})
profileRouter.patch("/profile/edit",userAuth, async(req,res)=>{
   try{
     if(!validateEditProfileData(req)){
      throw new Error("Invalid Edit request")
     }
     const loggedInUser = req.user;
     console.log(loggedInUser)
     Object.keys(req.body).forEach((key)=> (loggedInUser[key] = req.body[key]))
       console.log(loggedInUser)
       await loggedInUser.save();
      res.json({
         message: `${loggedInUser.firstName}, your profile updated successfully`,
         data: loggedInUser
      });
   }
   catch(err){
       res.status(400).send(err.message)
   }
   
})
module.exports = {profileRouter}