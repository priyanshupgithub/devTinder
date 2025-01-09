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
        
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            //create the JWT(json web tokens red(header), pink(payload->data(hidden thing)),blue(signature to check the token)) token
            const token = await jwt.sign({_id:user._id},"DEV@Tinder$790");
            console.log(token);

            // add the token to the cookie and send the response to the user
            res.cookie("token", token );

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


// feed api - GET /user - get all the users from the database.
app.get('/user', async (req,res)=>{
    const userName = req.body.firstName;
    try {
        // const users = await User.find() //give any random document
        // const users = await User.find({})//find all the users from the collection

        const users = await User.find({firstName:userName})
        if(users.length === 0){
            res.status(404).send("user not found");
        }
        else{
            res.send(users);
        }
    } catch (error) {
        res.status(400).send("something went wrong");
    }
})
 
// delete data of the user from the database.
app.delete('/user', async (req,res)=>{
    const userId = req.body.userId;
    try {
        // const user = await User.findByIdAndDelete({_id:userId});
        const user = await User.findByIdAndDelete(userId); //shorthand
       res.send("user deleted successfully.");
        
    } catch (error) {
        res.status(400).send("something went wrong");
    }
})

// update data of the user
// also while we are updating the field which are not present in the schema then it will not update those field
app.patch('/user/:userId', async (req,res)=>{
    const userId =  req.params?.userId;
    const data = req.body;
    try {
        // ALLOWED CHANGES -  we do not want that the user will change the unwanted changes like email,age etc
        const ALLOWED_UPDATES = [
            "lastName","gender","about","skills","photoUrl","age","password"
        ];
    
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );

        if(!isUpdateAllowed){
            throw new Error ("Update not allowed on these values");
        }
        if(data?.skills.length > 10){
            throw new Error("Skills cannot be more than 10");
        }
        const user = await User.findByIdAndUpdate({_id:userId}, data, {ReturnDocument:"after",runValidators:true,}); //here the third parameter is the options (object) -> optional see 
        // console.log(user);
        res.send("user updated successfully.");
    } catch (error) {
        res.status(400).send("update failed "+error.message);
    }
})
 

connectDB().then(()=>{
    console.log("database connection established.");
    app.listen(8080,()=>{
        console.log("server is successfully listening on port 8080");   
    })
}).catch((err)=>{
    console.log("database cannot be connected!");
})
