const express = require('express');

const app = express();
const {adminAuth ,userAuth} = require("./middlewares/auth")


// what is middleware:
// A middleware is:
//     A function that has access to the request object (req), response object (res), and the next middleware function (next).
//     It can:
//         Perform operations (e.g., log, authenticate, modify request data).
//         End the request-response cycle.
//         Pass control to the next middleware in the stack using next().

// key features:
// Middlewares are executed in the order they are defined.
// They can handle:
//     Logging.
//     Parsing data (e.g., JSON, form data).
//     Authentication.
//     Error handling.
//     Adding custom headers.
// They can stop the request-response cycle by sending a response or pass it to the next middleware.

// ===================================================================================

// first
// if we use the two res.send() and comments the first one then it do no go to the next res because next() 
// is not defined and if after defining the next and commenting the first res then it go to the second res
// and when we send res in first and then use the next() then it give the responce of the first with error due to the repetition call of the res occur due to second.
// and when we use the next() first then use the res.send() of first then it give the resp of second with error due to repetition of res.send due to first
app.use('/user',(req,res,next)=>{
    console.log("handling the route user1.")
    res.send("response 1")
    next();
},
(req,res)=>{
    console.log("handling the route user2.")
    res.send("response 2")
},
(req,res)=>{ // this res hanlers will be called only if we use the next() in the above route handlers
    console.log("handling the route user3.")
    res.send("response 3")
}
)
// and we if make the chane of the next() in the route handlers and not send the response from any of the
// route then it expects the route handler response but it cant find then it will throw an error
// but if we do not use the next in the last route handler then it will hanging and waits but not throw error


// so here when we call any admin api then we have to check the authentication in each api so to avoid
// this we use middleware so that the same code cannot be use in every api. otherwise authrized code will
// also be written in the /admin/deleteUser.therefore all the middleware will be defined at the top so
// they can be checked for the /admin api below where /admin use

// handle auth middleware for all request (get,post,put,patch,delete)
app.use("/admin",adminAuth) //first check the auth 

app.get('/otheruser',userAuth,(req,res)=>{
        res.send("User data sent successfully."); 
    })

app.get('/admin/getAllData',(req,res)=>{
// check if the reqest is authorized and actually made by admin <= this code will be handled by middleware
// const token = "xyz";
// const isAdminAuthorized = token === 'xyz'
// if(isAdminAuthorized){
//     res.send("data send successfully.");
// }
// else{
//     res.status(401).send("unauthorized request");
// }
res.send("data send successfully.")
})

app.get('/admin/deleteUser',(req,res)=>{
// check if the reqest is authorized and actually made by admin
    res.send("User deleted successfully.");
})
app.listen(8080,()=>{
    console.log("server is successfully listening on port 8080");   
})