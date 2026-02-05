const mongoose = require("mongoose")
 const user_schema = new mongoose.Schema({
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
    username:{
        type:String,
        required:true,
        maxlength:50,
        unique:true,
    },
    password: {
    type: String,
    required: true,
    unique:true,
  }},
    {
    timestamps: { createdAt: "created_on", updatedAt: "modified_on" },  
    versionKey: false   
  }

 )

 module.exports = mongoose.model("user",user_schema)