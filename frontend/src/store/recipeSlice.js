import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [], 
    filteredRecipes: []
  },
  reducers: {
    setRecipes(state, action) {
      state.recipes = action.payload; 
      state.filteredRecipes = action.payload;
    },
    addRecipe(state, action){
        state.recipes.push(action.payload);
    },
    
  },
});

export const { setRecipes , addRecipe, filterRecipes} = recipesSlice.actions; 
export default recipesSlice.reducer; 
