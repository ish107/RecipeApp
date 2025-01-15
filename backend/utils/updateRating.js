import { Recipe } from '../Models/recipe.js'
import { User } from "../Models/users.js"

export const updateRating = async (userId, recipeId, ratingValue) => {
    try {
        const user = await User.findById(userId);
        const recipe = await Recipe.findById(recipeId);

        if (!user || !recipe) {
            throw new Error("User or Recipe not found.");
        }

        const existingRating = user.ratingsGiven.find(rating => rating.title === recipe.title);

        if (existingRating) {
            const oldRatingValue = existingRating.value;
            existingRating.value = ratingValue;

            const totalRating = recipe.rating.average * recipe.rating.count;
            const newTotalRating = totalRating - oldRatingValue + ratingValue;
            recipe.rating.average = newTotalRating / recipe.rating.count;
        } else {
            user.ratingsGiven.push({ title: recipe.title, value: ratingValue });

            recipe.rating.count += 1;
            recipe.rating.average = (recipe.rating.average * (recipe.rating.count - 1) + ratingValue) / recipe.rating.count;
        }

        await user.save();
        await recipe.save();

        return { user, recipe };
    } catch (error) {
        throw new Error(error.message);
    }
};
