require('dotenv').config()

const express=require("express")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true})) 

const jwt=require("jsonwebtoken")


app.post('/login',(req,res)=>{
    const { username } = req.body;
    const user={name:username}
    const acess_token=jwt.sign(user,process.env.random_secrete_key)
    res.json({acess_token:acess_token})
})

app.listen(3000)
