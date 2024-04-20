import mongoose from "mongoose"


const recipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:[{
        ingredient:String,
        amount:String,
    }],
    instructions:{
        type:String
    },
    cooktime :{
        type:String
    }/*,
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }*/
      
});

export const Recipe = mongoose.model('Recipe',recipeSchema);