const mongoose = require('mongoose')
const validator = require('validator');
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:60,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid!"+value);
            }
        }

    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter a strong password!"+value);
            }
        }
    },
    age:{
        type:Number,
        min:18,
        max:108
    },
    gender:{
        type:String,
        validate(value){   //here we added a custom validation function and this validator functions runs onyl on creating new user and does not run/validate when patch(existing data) so for run this we have to add it in the patch api in (options)
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWRrWgjZtjvfCpKF-uof_08e89WR9269oYsA&s",
        validate(value){   //here we added a custom validation function and this validator functions runs onyl on creating new user and does not run/validate when patch(existing data) so for run this we have to add it in the patch api in (options)
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo Url"+value);
            }
        }
    },
    about:{
        type:String,
        default:"this is the default about ."
    },
    skills:{
        type:[String]
    }
},
{
    timestamps:true,
})

const User = new mongoose.model("User",userSchema)
module.exports =  User;
