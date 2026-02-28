const express = require("express");
 const app =express();
//  app.get("/user/a*c/:name/", (req,res)=>{
//     console.log(req.params)
//     console.log(req.query)
//     res.send("this is get")
//  })
//  app.post("/user",(req,res)=>{
//     res.send("this post");

//  })
//  app.delete("/user",(req,res)=>{
//     res.send("this is delete")
//  })
const {adminAuth,userAuth }= require("./middlewares/auth")
 app.use("/admin", adminAuth);
 app.get("/admin/getData", (req,res)=>{
   res.send("Data fetched");
 })
 app.delete("/admin/DeleteData", (req,res)=>{
   res.send("Deleted Data");
 })
 
 app.get("/user",userAuth,(req,res)=>{
   res.send("user Get")
 })
 
 
 app.listen("7777",()=>{
    console.log("listening on port 7777");
 });