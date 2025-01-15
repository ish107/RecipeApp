import mongoose from "mongoose"


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
        ref:"users",
        required:true
    },
    filters: {
        type: [String],
        enum:  ['All','Asian', 'Breakfast', 'Lunch', 'Dinner', 'Western'],
        default: ["All"] 
    },
    rating: {
        average: { type: Number, default: 0 }, 
        count: { type: Number, default: 0 },  
        
    }
      
});

export const Recipe = mongoose.model('Recipe',recipeSchema);