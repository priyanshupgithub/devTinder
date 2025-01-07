const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/User")



app.post('/signup', async (req,res)=>{
    // creating a new instance of the User model
    const userObj = {
        firstName:"Sachin",
        lastName:"tendulkar",
        email : "sachin@mail.com",
        password : "sachin@123",
    }
    const user = new User(userObj);

    try {
        await user.save();
        res.send("User added successfully")
        
    } catch (error) {
        res.status(400).send("Error saving the user in the database"+error.message)
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
