require('dotenv').config()

const jwt=require("jsonwebtoken")
const user=require("../../models/user_Schema")
const mongoose = require("mongoose");

const sessionDB = mongoose.createConnection(process.env.mongoDB_sessions_url);

const bcrypt = require("bcrypt");

const session = require("express-session");
const MongoStore = require("connect-mongo");


/*exports.signin=async (req,res)=>{
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
    //res.status(200).json({message:"login sucessfull :) ",acess_token:acess_token})
    
    res.cookie("acess_token", acess_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
    });
    res.json({ message: "Login successful" });
 }
}catch(err){
    res.send(err.message)
}

}*/

function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(password);
}

exports.signup=async (req,res)=>{                       
    try{
        const {name,username,email,password}= req.body
        if(!validatePassword(password)){
            res.send("enter a strong password with uppercase,numbers and special characters...!!!!!!!")
        }
        const hashedPassword= await bcrypt.hash(password, 10)
        const userdata= new user({name,username,email,password:hashedPassword})
        const result= await userdata.save()
        res.status(200).send(result)
    }catch(err){
        res.send(err.message)
    }
}



exports.signin= async (req, res) => {
  const { username,password } = req.body;

  const user1 = await user.findOne({ username });
  if (!user1) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match =  bcrypt.compare(password, user1.password);

  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const sessionsCollection = sessionDB.collection("sessions");
  const sessions = await sessionsCollection.find({}).toArray();

  const userSessions = sessions.filter(s => {
    const data = JSON.parse(s.session);
    return data.userId === user1._id.toString();
  });

  if (userSessions.length >= 3) {
  await sessionsCollection.deleteOne({ _id: userSessions[0]._id });
}

  req.session.userId = user1._id;
  req.session.email = user1.email;
  res.json({ message: "Successfully logged in :~)" })

};