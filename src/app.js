const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/User");
const { ReturnDocument } = require('mongodb');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth")


// we use the middleware express.json() to conver the req.data to all the routes that why we do not use any route
app.use(express.json());
app.use(cookieParser());//use the middleware to parse the token.



app.post('/signup', async (req,res)=>{
    
    try {
        //first thing is validation your data 
        validateSignUpData(req);

        
        //encrypting the password
        const {firstName, lastName, emailId, password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        // console.log(passwordHash);


        // creating new instance of the user model
        // const user = new User(req.body) //bad way because whatever is comming will be pushed.
        const user = new User({
        firstName,lastName,emailId, password:passwordHash,
        });
        // console.log(req.body)
        await user.save();        
        res.send("User added successfully!");
    } catch (error) {
        res.status(400).send("ERROR : "+error.message)
    }
});

app.post('/login', async(req,res) =>{
    try {
        
        const {emailId,password} = req.body;
        
        if(!validator.isEmail(emailId)){
            throw new Error("Please enter the valid Email.");
        }
        const user = await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("Invalid credentials."); // do not write this -> Email id is not present in the DB
        }
        
        // below line will offload into userSchema instead of below line we are using the line which is below of below line
        // const isPasswordValid = await bcrypt.compare(password,user.password);//first pass is which is comming from req, and the second is which is actual passwordHash
        const isPasswordValid = await user.validatePassword(password)

        if(isPasswordValid){
            //create the JWT(json web tokens red(header), pink(payload->data(hidden thing)),blue(signature to check the token)) token

            // we are offlaod the below line into the userschema to clear or refactor the code beacause it is related to the userschema
            // const token = await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"7d"}); // 3 rd parameter is to expore the token
            const token = await user.getJWT(); //we are using this line instead of this above line as this make the code modular, testable, readable,reusable
            // console.log(token);

            // add the token to the cookie and send the response to the user
            res.cookie("token", token,{httpOnly:true,expires:new Date(Date.now()+8*3600000)} );//cookies will expire after 8 hours

            res.send("Login successfully.");
        }
        else{
            throw new Error("Invalid credentials."); // don not write this -> Password is not correct
        }
    } 
    catch (error) {
        res.status(400).send("ERROR : "+error.message)
    }
})

app.get("/profile", userAuth, async(req,res)=>{
    try {
        const user = req.user
        res.send(user);
    } 
    catch (error) {
        res.status(400).send("ERROR : "+error.message);
    }
});

app.get("/senConnectionRequest", userAuth, async(req,res)=>{
    try {
        const user = req.user
        //sending the connection request
        console.log("sendgin a connection request.")
        res.send(user.firstName+ " send the connection request.");
    } 
    catch (error) {
        res.status(400).send("ERROR : "+error.message);
    }
});


connectDB().then(()=>{
    console.log("database connection established.");
    app.listen(8080,()=>{
        console.log("server is successfully listening on port 8080");   
    })
}).catch((err)=>{
    console.log("database cannot be connected!");
})
