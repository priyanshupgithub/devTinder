const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://priyanshujii0001:Mongodb123@devtinder.jksoo.mongodb.net/devTinder');
};

module.exports = connectDB;
