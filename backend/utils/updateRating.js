import { User } from "../Models/users.js";
import {Recipe} from "../Models/recipe.js"
import mongoose from 'mongoose';

export const updateRating = async (userId, recipeId, ratingValue) => {
    
    const { ObjectId } = mongoose.Types;
    try {
        const user = await User.findById(userId);
        const recipe = await Recipe.findById(recipeId);

        const recipeIdObj = new ObjectId(recipeId);

        if (!user) {
            throw new Error("User not found.");
        }
       
        const existingRating = user.ratingsGiven.find(rating => rating.recipeId.equals(recipeIdObj));
        if (existingRating) {
            existingRating.value = ratingValue;
        } else {
            user.ratingsGiven.push({ recipeId: recipeId, value: ratingValue });
        }

        const totalRatings = recipe.rating.reduce((acc, rating) => acc + rating.value, 0);
        const averageRating = totalRatings / recipe.rating.length;

        // Update the recipe with the new values
        recipe.rating = averageRating;
        recipe.count = recipe.rating.length;

        await user.save();

        return { user };
    } catch (error) {
        throw new Error(error.message);
    }
};
