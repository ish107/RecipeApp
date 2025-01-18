import { User } from "../Models/users.js";
import mongoose from 'mongoose';

export const updateRating = async (userId, recipeId, ratingValue) => {
    
    const { ObjectId } = mongoose.Types;
    try {
        const user = await User.findById(userId);

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

        await user.save();

        return { user };
    } catch (error) {
        throw new Error(error.message);
    }
};
