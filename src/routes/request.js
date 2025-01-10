const express = require("express")
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest");
const { ConnectionReadyEvent } = require("mongodb");
const User = require("../models/User")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.json({
                message: "Invalid status type "+ status
            })
        }

        const toUser = await User.findById(toUserId);
            if(!toUser){
                return res.status(404).json({message:"User not Found"})
            }
        
        if(toUserId==fromUserId){  //it check the user/person cannot send request to own
            return res.json({
                message: "Cannot send request to own",
            })
        }
        //if there is any existing ConnectionRequest present means if we already send the connection request then we should not send the connection request again or the other case when the other person send us the connection request.
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[ //mongoose style for checking the or condition
                {fromUserId,toUserId}, //it is first conditon which checks are the(ie. fromUserId, toUserId) already exist in the connectionRequest Schema means let fromUserId->priyanshu and toUserId->ajay is present
                {fromUserId:toUserId , toUserId:fromUserId}, // here we check if ajay(fromUserId) send me(priyanshu[toUserId]) the connection request then also we don't him the connection request as he already send us the connection request then 
            ],
        })
        if(existingConnectionRequest){ 
            return res.status(400).send({message:"Connection Request already exist."});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })
        const data = await connectionRequest.save();
        res.json({
            message:`${req.user.firstName} ${status} in ${toUser.firstName}`,
            data,
        });
    } 
    catch (error) {
        res.status(400).send("ERROR : "+error.message);
    }
});

module.exports = requestRouter;