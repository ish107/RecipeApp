import mongoose from "mongoose";

// Define the schema for ratings within the user schema
const ratingSchema = new mongoose.Schema({
    title: {
        type: String,
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
    favorites: {
        type: [String],
        required: false,
    },
    ratingsGiven: {
        type: [ratingSchema], 
        required: false,
    }
});

export const User = mongoose.model('User', userSchema);
