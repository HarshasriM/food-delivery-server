const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../model/userModel");
const config = require("../config")


//register
router.post("/register",(req,res)=>{
    //encrypt password
    let email = req.body.email
    let info=[];
     User.find({email},(err,data)=>{
               if(err) throw err
               for (let i in data){
                    info.push(i)
               }
               if(!info.length) {
                        let hashedPassword =bcrypt.hashSync(req.body.password,8);
                         console.log(hashedPassword);
                         User.create({
                              name :req.body.name,
                              email :req.body.email,
                              password : hashedPassword,
                              phone : req.body.phone,
                              address:req.body.address,
                              role : req.body.role
                         },(err,result)=>{
                         if(err) res.send("Error while registering")
                         res.send("registered");
                         })
                   
               }
               else{
                    res.send("user existed")
               }
     })
     
    
     
});

// login
router.post("/login",(req,res)=>{
     User.findOne({email: req.body.email},(err,user)=>{
          if(err) res.send({auth:false , token:"Error while logging"});
          //validate the user
           console.log(user);
          if(!user) return res.send({auth:false,token:"Invalid credentials"});
          else {
               const passIsValid = bcrypt.compareSync(req.body.password,user.password)
               console.log(passIsValid)
               if(!passIsValid){
                    return res.send({auth:false,token:"Invalid credentials"});
               }
               let token = jwt.sign({id :user._id},config.secret,{
                    expiresIn:86400
               });
               res.send({auth:true,token:token})
          }
     });
});

//get all users
router.get("/users",(req,res)=>{
     User.find({},(err,data)=>{
          if(err) throw err
          res.send(data);
     })
})

//get particular user

router.get("/userInfo",(req,res)=>{
     let token = req.headers["x-access-token"];
     console.log(token)
     if(!token) res.send({auth:false , token:"no token provided"});
     jwt.verify(token,config.secret,(err,user)=>{
          if(err) res.send({auth : false,token:"Invalid Token"});
          console.log(user)
          User.findById(user.id,(err,result)=>{
               if(err) throw err
               res.send(result);
          })
     })
})
module.exports =router;