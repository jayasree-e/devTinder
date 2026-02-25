const express = require("express");
 const app =express();
 app.get("/user/a*c/:name/", (req,res)=>{
    console.log(req.params)
    console.log(req.query)
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