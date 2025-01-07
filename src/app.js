const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/User")

// we use the middleware express.json() to conver the req.data to all the routes that why we do not use any route
app.use(express.json());

app.post('/signup', async (req,res)=>{
    const user = new User(req.body);
    try {
        // console.log(req.body)
        await user.save();        
        res.send("User added successfully!");
    } catch (error) {
        res.status(400).send("Error saving the user"+error.message)
    }
});

// feet api - GET /feed - get all the users from the database.
app.get('/feed', async (req,res)=>{
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
 
connectDB().then(()=>{
    console.log("database connection established.");
    app.listen(8080,()=>{
        console.log("server is successfully listening on port 8080");   
    })
}).catch((err)=>{
    console.log("database cannot be connected!");
})
