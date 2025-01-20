import express from "express";
import { Recipe } from "../Models/recipe.js";
import {updateRating} from '../utils/updateRating.js'


const router = express.Router();


//save a recipe
router.post('/', async(req,res)=>{
    try{
        if(
            !req.body.title || !req.body.ingredients 
        ){
            res.status(400).send("Required fields are empty") 
        }
        console.log(req.body)
        const newRecipe = {
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions:req.body.instructions,
            imageUrl: req.body.imageUrl,
            cookingTime: req.body.cookingTime,
            filters: req.body.filters,
            userOwner: req.body.userOwner
        };
        console.log(newRecipe)
        const recipe = await Recipe.create(newRecipe);
        return res.status(201).send(recipe)
    }catch(err){
        console.log(err.message);
        res.status(500).send({message : err.message})
    }
});

//get recipes
router.get('/', async (req, res) => {
    try {
        const { search } = req.query; 
        console.log(search)
        let filter = {};
        if (search) {
            filter.title = { $regex: search, $options: 'i' };  
            console.log(filter)
        }

        const recipes = await Recipe.find(filter);  
        return res.status(200).json(recipes);  
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


//get one recipe by id
router.get('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const recipe = await Recipe.findById(id);
        return res.status(200).json(recipe);
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message})
    }
});

//update rating
 router.put('/:id/rate', async (req, res) => {
    const { id } = req.params; 
    const { userId, ratingValue } = req.body; 

    if (!userId || ratingValue === undefined) {
        return res.status(400).json({ message: "User ID and rating value are required." });
    }

    try {
        const { user, recipe } = await updateRating(userId, id, ratingValue);
        res.status(200).json({ message: "Rating updated successfully.", user, recipe });
    } catch (error) {
        res.status(500).json({ message: "Error updating rating.", error: error.message });
    }
});


export  {router as recipeRouter};