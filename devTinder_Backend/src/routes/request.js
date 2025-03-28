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

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res) =>{
    try {
        const loggedInUser = req.user;
        const{status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({ message: "Status not allowed"});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId, //it is the id of the particular document which contains the record of who is sending the request to whom that the id of the particular document of connectionRequest collection 
            toUserId : loggedInUser._id, //this line says that the user who will review the req will be the user who is now logged in means (agar ajay(fromUserId) ne elon(toUserId) ko req send ki ha(interested/ignored then elon(toUserId/(loggedInUser)) hi us request ko review kare) )
            status : "interested", //it is hardcoded because interested status me hi review is possible , if the one user is ignored then the other user should not give the review
        })

        if(!connectionRequest){
            return res.status(404).json({message : "Connection request not found."});
        }

        connectionRequest.status = status; //update the status from interesed to the review status(accepted/rejected) so that it can prevents from further updation that is when a staus is updated accepted then it cannot reject later. because then it does not find the status "interesed"which is hardcoded results in throw error
        const data = await connectionRequest.save();
        res.json({message:"Connection request "+ status, data});
    } catch (error) {
        
    }
})

module.exports = requestRouter;