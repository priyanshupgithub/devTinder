const express = require('express');

const app = express();

app.use('/test/1',(req,res)=>{
    res.send("Namaste test1");
})
app.use('/test',(req,res)=>{
    res.send("Namaste test");
})
app.use('/test/2',(req,res)=>{
    res.send("Namaste test2");
})
// app.use('/',(req,res)=>{
//     res.send("Namaste Priyanshu patel");
// })
app.get('/user/1',(req,res)=>{
    res.send("Namaste user1");
})
app.post('/user/1',(req,res)=>{
    res.send("post Namaste user1 ");
})
app.get('/user/2',(req,res)=>{
    res.send("Namaste user2");
})
app.delete('/user/2',(req,res)=>{
    res.send("delete Namaste user2");
})
app.use('/user',(req,res)=>{
    res.send("Namaste user");
})

app.use('/',(req,res)=>{
    res.send("Namaste from the home");
})


app.listen(8080,()=>{
    console.log("server is successfully listening on port 8080");   
})