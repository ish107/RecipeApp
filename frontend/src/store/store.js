import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice'
import recipesReducer from './recipeSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    recipes: recipesReducer,
  }
});