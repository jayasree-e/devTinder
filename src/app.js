const express = require("express");
 const app =express();
 app.get("/user", (req,res)=>{
    res.send("this is get")
 })
 app.post("/user",(req,res)=>{
    res.send("this post");

 })
 app.delete("/user",(req,res)=>{
    res.send("this is delete")
 })
 
 
 
 
 app.listen("7777",()=>{
    console.log("listening on prot 777");
 });