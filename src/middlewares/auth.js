// const adminAuth = (req,res,next)=>{
//     const token = "someToken";
//    const isAuth = token ==="someToken";
//    if(!isAuth){
//       res.status(401).send("Error")
//    }
//    else{
//     console.log("in next")
//      next();
//    }
// }
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const userAuth = async (req,res,next)=>{
   try{
      const {token} = req.cookies;
      if(!token){
         throw new Error("Invalid token")
      }
      const decodedMessage = await jwt.verify(token,"Dev@Tinder123");
      const {_id} = decodedMessage;
      const user =await User.findById(_id);
      if(!user){
         throw new Error("User doesn't exist")
      }
      req.user = user;
      next();
   }
   catch(err){
      res.status(400).send(err.message);
   }
    
}
module.exports = {userAuth}