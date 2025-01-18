import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [], 
    filteredRecipes: [],
  },
  reducers: {
    setRecipes(state, action) {
      state.recipes = action.payload; 
      state.filteredRecipes = action.payload;
    },
    addRecipe(state, action){
      state.recipes.push(action.payload);
    },
    updateAverageRating(state, action){
      const {recipeId, averageRating, count} = action.payload;
      const recipe = state.recipes.find(item => item.id === recipeId);
      recipe.rating.averageRating = averageRating;
      recipe.rating.count = count;
    }
    
  },
});

export const { setRecipes , addRecipe, updateAverageRating} = recipesSlice.actions; 
export default recipesSlice.reducer; 
