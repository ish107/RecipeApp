import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    recipeId : {
        type: mongoose.Schema.Types.ObjectId , 
        ref:"Recipe",
        required: true,
    },
    value: {
        type: Number,
        required: true,
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    favorites:{ type : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
    }]},
    ratingsGiven: {
        type: [ratingSchema], 
        required: false,
    }
});

export const User = mongoose.model('User', userSchema);
