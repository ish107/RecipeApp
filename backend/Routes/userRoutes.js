import express from "express";

import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

import { User } from "../Models/users.js";
import  {updateRating}  from "../utils/updateRating.js";

const router = express.Router();

const hashPassword = async (pwd) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pwd,salt)
};

dotenv.config();

export const requireLogin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send("Invalid token.");
    }
};
//register
router.post('/register', async(req,res)=>{
    try{
        const {username,password,firstname,lastname} = req.body
        const uname = await User.findOne({username});
        if(uname){
            return res.json({message:"Username already exists, try something else"})
        }
        const hashedPassword = await hashPassword(req.body.password)
       
        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username :req.body.username,
            password : hashedPassword
        };
        const user = await User.create(newUser);
        if(user)
        return res.status(201).send("succefully registered")
    }catch(err){
        console.log(err.message);
        res.status(500).send({message : err.message})
        res.redirect('/register')
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
        const isPasswordValid = await bcrypt.compare(password, uname.password)
        if(!isPasswordValid){
            return res.status(201).send("username and password did not match")
        }
        const token = jwt.sign({ id: uname._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({token,userID:uname._id, username: uname.username , favorites: uname.favorites, ratingsGiven: uname.ratingsGiven})
    }catch(err){
        console.log(err.message);
        res.status(500).send({message : err.message});
        res.redirect('/login');
    }
});

//update rating
router.put('/:userId/rate-recipe', async (req, res) => {
    const { userId } = req.params;
    const { recipeId, ratingValue } = req.body;
    console.log(userId,recipeId,ratingValue)

    if (!recipeId || ratingValue === undefined) {
        return res.status(400).json({ message: "Recipe ID and rating value are required." });
    }

    try {
        const { user, recipe} = await updateRating(userId, recipeId, ratingValue);
        res.status(200).json({ message: "Rating updated successfully.", user, recipe });
    } catch (error) {
        res.status(500).json({ message: "Error updating rating.", error: error.message });
    }
});

//add favorite recipes to the favorites

router.post('/:userId/add-favorites', async (req,res) => {
    const {userId} = req.params;
    const {recipeId} = req.body;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'User not Found'});
        }
        if(recipeId && !user.favorites.includes(recipeId)){
            user.favorites.push(recipeId);
            await user.save()
            return res.status(200).json({ message: 'Recipe added to favorites', user });
        }
    }catch(error){
        res.status(500).json({message: "Error updating favorites", error: error.message})
    }
});

//remove recipes from the favorites

router.post('/:userId/remove-favorites', async (req, res) => {
    const { userId } = req.params;
    const { recipeId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const index = user.favorites.indexOf(recipeId);
        if (index !== -1) {
            user.favorites.splice(index, 1); 
            await user.save(); 
            return res.status(200).json({ message: 'Recipe removed from favorites', user });
        } else {
            return res.status(400).json({ message: 'Recipe not found in favorites' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error removing recipe from favorites', error: error.message });
    }
});

//fetch favorites

router.get('/:userId/favorites', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('favorites'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        return res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorites', error: error.message });
    }
});




export  {router as userRouter};