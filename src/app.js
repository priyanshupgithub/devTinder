const express = require('express');
const app = express();
const connectDB = require("./config/database");
const { ReturnDocument } = require('mongodb');
const cookieParser = require("cookie-parser");


// we use the middleware express.json() to conver the req.data to all the routes that why we do not use any route
app.use(express.json());
app.use(cookieParser());//use the middleware to parse the token.

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectDB().then(()=>{
    console.log("database connection established.");
    app.listen(8080,()=>{
        console.log("server is successfully listening on port 8080");   
    })
}).catch((err)=>{
    console.log("database cannot be connected!");
})
