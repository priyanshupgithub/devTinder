const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { Connection } = require("mongoose");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/User');



const USER_SAFE_DATA = ["firstName","lastName","age","gender","photoUrl","skills","about"];

userRouter.get("/user/request/received", userAuth , async (req,res)=>{  //get user request means all the request which are pending for (accepted/rejected)
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId:loggedInUser._id, // this line give us all the data who(fromUserId) is send us(toUserId) the request 
            status:"interested" // this will help in finding those request only which are not accepted/rejected means send by other otherwise we will get all the request accepted,rejected etc but we want onyl pending that is interested
        }).populate("fromUserId",["firstName","lastName","age","gender","photoUrl","skills","about"]); //populate the from UserId field with the User Collection data as we want the names and the lastname of the person who send us the conneciton request.

        res.json({message: "Data fetched successfully",data:connectionRequest}
            
        )
    } catch (error) {
        req.statusCode(400).send("ERROR : "+error.message);
    }
})


userRouter.get("/user/connections", userAuth, async (req,res)=>{
    try {

        //  ajay sends nikhil = accepted
        // nikhil sends elon = accepted
        // then nikhil has the two connections ajay and elon so nikhil can be the toUserId or fromUserId
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or:[ // here we check the or condition because the person can send the connection request and the person can recoeved the connection request
                {toUserId: loggedInUser._id , status : "accepted"},
                {fromUserId : loggedInUser._id , status : "accepted"}
            ]
        })
        .populate("fromUserId" , USER_SAFE_DATA)
        .populate("toUserId" , USER_SAFE_DATA)

        const data  = connectionRequests.map((row) => { // this will fetch the data only of the connection and removes the extra data about the loggedInUser
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        }); 

        res.json({data})
    } catch (error) {
        res.status(400).send("ERROR : "+error.message);
    }
});


userRouter.get("/feed", userAuth, async (req,res)=>{
    try {

        const page = parseInt(req.query.page) || 1 // if page is not given then assume 1
        let limit = parseInt(req.query.limit) || 10; // if limit is not given then assume 10
        limit = limit>50 ? 50 : limit;
        const skip = (page-1)*limit
        
        // user should see all the users card except
        // his own card
        // his connections i.e already connections i.e accepted/rejected
        // ignored people i.e whom the user is ignored to the people means jo ignore kar diye ha
        // already sent the connection request 
        // means humko vo cards nahi dikhane ha jisko hum req bhejh chuke ha ya jisne hume req bheji ha ya jjisko humse ignore kar diya ha and apna card
        const loggedInUser = req.user;

        //find all the connection request (sent+received)
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id},
            ],
        })
        .select("fromUserId toUserId")
        // .populate("fromUserId","firstName")
        // .populate("toUserId","firstName")

        //calculate the user id of the people jinko hume nahi dikhana ha and then push them one by one in the set(hideUserFromFeed)
        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req) =>{
            hideUserFromFeed.add(req.fromUserId.toString()); //push the user jisne bhejhi ha
            hideUserFromFeed.add(req.toUserId.toString()); // push the user jisko bheji ha
        })

        // console.log(connectionRequests);
        // find the remaining users
        const users = await User.find({
            $and: [
                {_id:{$nin : Array.from(hideUserFromFeed)} }, //unki id jo hideUsersFromFeed array me nahi ha i.e $nin and & query is used because both these condtions should be true
                {_id : {$ne : loggedInUser._id} }, //meri khud ki id bhi nahi honi chaiye i.e not equal (ne)
            ]
        })
        .select(USER_SAFE_DATA) // to display only required fields
        .skip(skip)
        .limit(limit)

        res.send(users)

    } catch (error) {
        res.status(400).send("ERROR : "+error.message);   
    }
})

module.exports = userRouter;