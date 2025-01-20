import mongoose from "mongoose"

const recipeRatingSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId , 
        ref:"User",
        required: true,
    },
    value: {
        type: Number,
        required: true,
    }
});

const recipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:[{
        ingredient:{
            type:String,
            required:true
        },
        amount:{
            type : String,
        }
    }],
    instructions:{
        type:String,
        required:true
    },
    imageUrl: {
        type:String,
        required:true
    },
    cookingTime :{
        type:String,
        required:true
    },
    userOwner:{
        type:mongoose.Schema.Types.ObjectId, //_id of the user schema
        ref:"User",
        required:true
    },
    filters: {
        type: [String],
        enum:  ['All','Asian', 'Breakfast', 'Lunch', 'Dinner', 'Western'],
        default: ["All"] 
    },
    ratings : {
        type: [recipeRatingSchema],
        required: false,
    },  
    averageRatings: {
        type: {
            averageRating: { type: Number, default: 0 }, 
            count: { type: Number, default: 0 }, 
        },
        required: false, 
        default: {}, 
    },
    
    
});

export const Recipe = mongoose.model('Recipe',recipeSchema);