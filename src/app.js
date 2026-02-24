const express = require("express");
 const app =express();
 app.use("/test", (req,res)=>{
    res.send("this is test page")
 })
 app.use("/hello",(req,res)=>{
    res.send("This is hello");
 })
 app.use("/", (req,res)=>{
    res.send("this is home");
 })
 
 
 
 app.listen("7777",()=>{
    console.log("listening on prot 777");
 });