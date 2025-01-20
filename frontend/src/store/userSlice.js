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
      //const { recipeId, rating } = action.payload;
      state.user.ratingsGiven = action.payload;
    },
    addFavorites : (state, action) => {
      state.user.favorites.push(action.payload)
    },
    removeFavorites : (state,action) => {
      if (state.user) {
        state.user.favorites = state.user.favorites.filter(fav => fav !== action.payload);
    }
    }
  }
});

export const { setUser, logout , setUserRating, addFavorites, removeFavorites} = userSlice.actions;

export default userSlice.reducer;
