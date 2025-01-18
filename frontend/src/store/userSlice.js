
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, 
  token: null, 
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setUserRating : (state, action) => {
      const { recipeId, rating } = action.payload;
      if (!state.user) return;
      console.log(action.payload)
      const existingRating = state.user.ratingsGiven.find(r => r.recipeId === recipeId);

      if (existingRating) {
        existingRating.rating = rating;
      } else {
        state.user.ratings.push({ recipeId, rating });
      }
    },
  }
});

export const { setUser, logout , setUserRating} = userSlice.actions;

export default userSlice.reducer;
