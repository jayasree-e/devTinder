const adminAuth = (req,res,next)=>{
    const token = "someToken";
   const isAuth = token ==="someToken";
   if(!isAuth){
      res.status(401).send("Error")
   }
   else{
    console.log("in next")
     next();
   }
}

const userAuth = (req,res,next)=>{
     const token = "someToken";
   const isAuth = token ==="someToken";
   if(!isAuth){
      res.status(401).send("Error")
   }
   else{
    console.log("in next")
     next();
   }
}
module.exports = {adminAuth,userAuth}