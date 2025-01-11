const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { Connection } = require("mongoose");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");



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
        
    }
});

module.exports = userRouter;