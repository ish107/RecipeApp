import express from "express";
import jwt from 'jsonwebtoken';

import { User } from "../Models/users.js";


const router = express.Router();


//register
router.post('/register', async(req,res)=>{
    try{
        const {username,password,firstname,lastname} = req.body
        const uname = await User.findOne({username});
        if(uname){
            return res.json({message:"Username already exists, try something else"})
        }
       
        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username :req.body.username,
            password : req.body.password
        };
        const user = await User.create(newUser);
        if(user)
        return res.status(201).send("succefully registered")
    }catch(err){
        console.log(err.message);
        res.status(500).send({message : err.message})
    }
});

//login
router.post('/login', async(req,res)=>{
    const {username,password} = req.body;
    try{
        if(
            !req.body.username || !req.body.password
        ){
            res.status(400).send("one or more fields are empty")
        }
        const uname = await User.findOne({username})
        if(!uname){
            return res.status(201).send("Invalid username")
        }
        const isPasswordValid = (password === uname.password)
        if(!isPasswordValid){
            return res.status(201).send("username and password did not match")
        }
        const token = jwt.sign({id:uname._id},"secret")
        res.json({token,userID:uname._id})
    }catch(err){
        console.log(err.message);
        res.status(500).send({message : err.message})
    }
});

export  {router as userRouter};