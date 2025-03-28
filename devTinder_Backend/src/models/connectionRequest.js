const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // reference to the user collection i.e creatind a link between the fromUserId and User collection with the help of which we can populate the fromUserId field and can get the data of the User collection
        required:true,

    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // reference to the user collection i.e creatind a link between the fromUserId and User collection with the help of which we can populate the fromUserId field and can get the data of the User collection
        required:true,

    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
            },
        },
    },
    {
        timestamps: true
    }
);

//indexing so to accessing from the database can be fast
connectionRequestSchema.index({fromUserId:1, toUserId:1}); //compound index


// I am covering this case in the request itself here i.e /request/send/:status/:toUserId so we can comment it(below code)
connectionRequestSchema.pre("save", function (next){
    const connectionRequest = this;

    // check if the fromUserId id same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself");
    }
    next();
});

const connectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = connectionRequestModel;