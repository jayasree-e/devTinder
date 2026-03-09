const express = require("express");

const connectDB =require("./config/database");
const cookieParser = require("cookie-parser");
const {authRouter} = require("../src/routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");
const app =express();


app.use(express.json())
app.use(cookieParser())
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);




connectDB().
then(()=>{
   console.log("database connected")
app.listen("7777",()=>{
    console.log("listening on port 7777");
 });
}).catch((err)=>{
console.log("database cannot be connected")
})
 
 