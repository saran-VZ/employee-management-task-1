const mongoose = require("mongoose")
 const emp_schema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        match:[
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            "Invalid email format"
        ]
    },
    contact:{
        type:String,
        unique:true,
        match: [
            /^[6-9]\d{9}$/,
            "Invalid mobile number"
        ]
    },
    address:{
        type:String,
        required:true,
        maxlength:200,
    } },
    {
    timestamps: true,   
    versionKey: false   
  }

 )

 module.exports = mongoose.model("emp",emp_schema)