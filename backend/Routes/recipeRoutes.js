import express from "express";
import { Recipe } from "../Models/recipe.js";


const router = express.Router();


//save a recipe
router.post('/', async(req,res)=>{
    try{
        if(
            !req.body.title || !req.body.ingredients 
        ){
            res.status(400).send("Required fields are empty") 
        }
        const newRecipe = {
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions:req.body.instructions,
            cooktime: req.body.cooktime
        };
        const recipe = await Recipe.create(newRecipe);
        return res.status(201).send(recipe)
    }catch(err){
        console.log(err.message);
        res.status(500).send({message : err.message})
    }
});

//get recipes
router.get('/',async(req,res)=>{
    try{
        const recipes = await Recipe.find({});
        return res.status(200).json({
            count:recipes.length,
            data:recipes
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message})
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


export  {router as recipeRouter};