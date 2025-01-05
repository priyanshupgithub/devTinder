const express = require('express');

const app = express();

app.use('/tes?t',(req,res)=>{   // is s is present of not it not then also it runs means s is optional
    res.send("Namaste test1 for '?'");
})

app.use('/tes+t',(req,res)=>{  //it runs for any number of s 
    res.send("Namaste test1 for '+'");
})

app.use('/ab*cd',(req,res)=>{  //it runs for any number of characters between the ab and cd 
    res.send("Namaste abcd '*'");
})

app.use('/a(bc)?d',(req,res)=>{  //means bc is optional
    res.send("Namaste abcd '?'");
})

app.use('/a(bc)+d',(req,res)=>{  //means bc can be repeat but only between the a and d
    res.send("Namaste abcd '+'");
})
// app.use(/a/,(req,res)=>{//means everythig is working in which ab is coming eg, asfabfwi, rdabkk, ab,abkk,koab
//     res.send("Namaste ab anywhere");
// })
app.use(/.*fly$/,(req,res)=>{//means everythig is working which ends with fly eg. /butterfly,/fly, dragonfly
    res.send("Namaste fly in end");
})

 // with req.query we can check the query from url like localhost:8080/query?name="patel"&surname=patel
//  output => { name: '"patel"', surname: 'patel' }
// app.use('/query',(req,res)=>{ 
//     console.log(req.query);
//     res.send("Namaste from query");
// })

// with req.params we can handle the dynamic routing i.e. when we hit 
// output => { name: 'patel', email: 'jii', password: '23232' }
app.use('/query/:name/:email/:password',(req,res)=>{
    console.log(req.params);  
    res.send("Namaste from dynamic routing");
})
app.use('/',(req,res)=>{
    res.send("Namaste from the home");
})



app.listen(8080,()=>{
    console.log("server is successfully listening on port 8080");   
})