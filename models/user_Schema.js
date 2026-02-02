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
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    ]
  }},
    {
    timestamps: { createdAt: "created_on", updatedAt: "modified_on" },  
    versionKey: false   
  }

 )

 module.exports = mongoose.model("user",user_schema)