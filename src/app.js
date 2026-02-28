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
 app.use("/user",
   (req,res,next)=>{
   console.log("response 1");
   next();
   // res.send("response 1")
 },
 [(req,res,next)=>{
   console.log("response 2");
  // res.send("response 2")
   next();
 },
 (req,res,next)=>{
   console.log("response 3");
   res.send("response 3")
 }],
 (req,res)=>{
   console.log("response 4");
   res.send("response 4")
 }
)
 
 
 
 app.listen("7777",()=>{
    console.log("listening on prot 777");
 });