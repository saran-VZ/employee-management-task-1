require('dotenv').config()

const user=require("/home/saran-st/Documents/task1-emp/models/user_Schema.js")
const jwt=require("jsonwebtoken")

exports.signin=async (req,res)=>{
   try{
    const {name,email,username,password}= req.body
    const user1 = await user.findOne({ username })
 
    if(!user1){
        res.status(404).send("user not found")
    }
    else if(user1.password !== password){
        res.status(401).send("wrong passowrd...authorization failed :(")
    }
    else{
    const curr_user={username}
    const acess_token=jwt.sign(curr_user,process.env.random_secrete_key,{expiresIn:"1m"})
    res.status(200).json({message:"login sucessfull :) ",acess_token:acess_token})
    
    }
}catch(err){
    res.send(err.message)
}
}

exports.signup=async (req,res)=>{                       
    try{
        const userdata=new user(req.body)
        const result= await userdata.save()
        res.status(200).send(result)
    }catch(err){
        res.send(err.message)
    }
}

