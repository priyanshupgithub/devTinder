const jwt = require("jsonwebtoken");
const User = require("../models/User");


const userAuth = async (req,res,next) =>{
    try{
    //read the token form the request cookies
    const cookies = req.cookies;
    const {token} = cookies;

    if(!token){
        throw new Error("token is not valid");
    }
    // valdiate the token
    const decodedObj = await jwt.verify(token,"DEV@Tinder$790");
    const {_id} = decodedObj;

    // find the user
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }
    req.user = user;
    next();
    }
    catch(error){
        res.status(400).send("ERROR : "+error.message);  
    }
}

module.exports = {userAuth}
// const adminAuth = (req,res,next)=>{
//     console.log("admin auth is checking");
//      const token = "xyz";
//      const isAdminAuthorized = token === 'xyz'
//     if(!isAdminAuthorized){
//         res.status(401).send("unauthorized request.");
//     }
//     else{
//         next();
//     }
// };

// const userAuth = (req,res,next)=>{
//     console.log("user auth is checking");
//      const token = "xyz";
//      const isAdminAuthorized = token === 'xyz'
//     if(!isAdminAuthorized){
//         res.status(401).send("user is unauthorized.");
//     }
//     else{
//         next();
//     }
// };

// module.exports = {adminAuth,userAuth}