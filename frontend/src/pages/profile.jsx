import { useState } from "react";
import { useSelector } from "react-redux";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import RecipeCard from '../components/home/recipeCard/recipeCard'
import "../styles/home.css"

const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState(0);

  const user = useSelector(state => state.user.user);
  const recipes = useSelector(state => state.recipes.recipes)

  const favorites = user.favorites;

  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe._id));
  const uploadedRecipes = recipes.filter((recipe) => recipe.userOwner === user.id);

  console.log('data', user,recipes)
  
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div style={{ paddingTop: " 180px"}}>

      <Box sx={{ padding: '20px' }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          sx={{
            width: "100%", 
            '& .MuiTab-root': {
              fontSize: "22px",  
              fontWeight: "bold",
              color: "#3B2A2A",
              "& .MuiTab-root.Mui-selected": {
                    color: "success"},
              padding: "15px 30px",  
              '&:hover': { backgroundColor: "#9DBF9E", color: "#fff" },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: "#3CB371", 
            },
          }}
        >
          <Tab label="Uploaded Recipes" />
          <Tab label="Favorites" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box >
          {uploadedRecipes.length > 0 ? (
            <ul className="recipe-list">
            {uploadedRecipes.map((recipe) => (
              <li key={recipe._id} className="recipe-item">
                <RecipeCard
                  recipe={recipe}
                  date={new Date(
                    parseInt(recipe._id.substring(0, 8), 16) * 1000
                  ).toLocaleDateString()}
                />
              </li>
            ))}
          </ul>
          
          ) : (
            <Typography>No uploaded recipes yet.</Typography>
          )}
        </Box>
      )}

      {activeTab === 1 && (
         <Box >
         {favoriteRecipes.length > 0 ? (
           <ul className="recipe-list">
           {favoriteRecipes.map((recipe) => (
             <li key={recipe._id} className="recipe-item">
               <RecipeCard
                 recipe={recipe}
                 date={new Date(
                   parseInt(recipe._id.substring(0, 8), 16) * 1000
                 ).toLocaleDateString()}
               />
             </li>
           ))}
         </ul>
         
         ) : (
           <Typography>No Favorite recipes yet.</Typography>
         )}
       </Box>
      )}
    </div>
  );
};

export default ProfileTab;


