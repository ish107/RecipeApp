import { User } from "../Models/users.js";
import {Recipe} from "../Models/recipe.js"
import mongoose from 'mongoose';

export const updateRating = async (userId, recipeId, ratingValue) => {
    
    const { ObjectId } = mongoose.Types;
    try {
        const user = await User.findById(userId);
        const recipe = await Recipe.findById(recipeId);

        const recipeIdObj = new ObjectId(recipeId);
        const userIdObj = new ObjectId(userId);

        if (!user) {
            throw new Error("User not found.");
        }
       
        const existingRating = user.ratingsGiven.find(rating => rating.recipeId.equals(recipeIdObj));
        if (existingRating) {
            existingRating.value = ratingValue;
        } else {
            user.ratingsGiven.push({ recipeId: recipeId, value: ratingValue });
        }

        const existingUserRating = recipe.ratings.find(rating => rating.userId.equals(userIdObj));
        if (existingUserRating) {
            existingUserRating.value = ratingValue;
        } else {
            recipe.ratings.push({ userId: userId, value: ratingValue });
        }

        const totalRatings = recipe.ratings.reduce((acc, rating) => acc + rating.value, 0);
        recipe.averageRatings.averageRating =( totalRatings/ recipe.ratings.length).toFixed(1);
        recipe.averageRatings.count = recipe.ratings.length;
        console.log(existingRating, totalRatings)

        await user.save();
        await recipe.save();

        return { user, recipe };
    } catch (error) {
        throw new Error(error.message);
    }
};
