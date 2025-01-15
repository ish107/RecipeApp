import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../components/auth/login/loginSlice'
import recipesReducer from './recipeSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
  }
});