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
      const {recipe} = action.payload;
      const existingRecipe = state.recipes.find((r) => r.recipeId === recipe._id);
      
      if (existingRecipe) {
        existingRecipe.averageRatings.averageRating = averageRating;
        existingRecipe.averageRatings.count = count;
      } 
    }
  },
});

export const { setRecipes , addRecipe, updateAverageRating} = recipesSlice.actions; 
export default recipesSlice.reducer; 
