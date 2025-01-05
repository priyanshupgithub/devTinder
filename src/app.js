const express = require('express');

const app = express();
const {adminAuth ,userAuth} = require("./middlewares/auth")
app.use('/',(err,req,res,next)=>{  //this will run only erro present but till here error is not present
    if(err){
        res.status(500).send("something went wrong");
    }
})
app.get('/getUserData', (req,res)=>{
    //logic of DB call and get user data
    try{
        throw new Error(" random error");
        res.send("user data send");
    }
    catch(err){
        console.log("error in catch"+err);
        res.status(500).send("some error occured contact support.")
    }
})
// err is the first parameter.
app.use('/',(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong");
    }
})
app.listen(8080,()=>{
    console.log("server is successfully listening on port 8080");   
})