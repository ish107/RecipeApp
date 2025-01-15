import { useState } from "react";
import axios from "axios";
import axiosInstance from "../util/axios.js";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useGetUserID } from "../hooks/useGetUserID.js";
import { addRecipe } from "../store/recipeSlice.js";

import "../styles/createRec.css";
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox, Container} from "@mui/material";



export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [{ ingredient: "", amount: "" }],
    instructions: "",
    imageUrl: "",
    cookingTime: "",
    userOwner: userID,
  });

  const [selectedFilters, setSelectedFilters] = useState([]);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const filters = [ 'Asian', 'Breakfast', 'Lunch', 'Dinner', 'Western'];

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "recipe_app_cloudinary");
    data.append("cloud_name", "dojpkyyar");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dojpkyyar/image/upload",
      data
    );
    const imageUrl = res.data.secure_url;
    setRecipe({ ...recipe, imageUrl });
  };

  const handleIngredientChange = (event, index) => {
    const { name, value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = { ...ingredients[index], [name]: value };
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const newIngredient = { ingredient: "", amount: "" };
    const ingredients = [...recipe.ingredients, newIngredient];
    setRecipe({ ...recipe, ingredients });
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setSelectedFilters((prevSelectedFilters) => {
      if (checked) {
        return [...prevSelectedFilters, name];
      } else {
        return prevSelectedFilters.filter((filter) => filter !== name);
      }
    });
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedFilters,'***');
    try {
      const response = await axiosInstance.post(
        "/recipe",
        { ...recipe , filters: selectedFilters},
        {
          headers: { authorization: cookies.access_token },
        }
      );
      console.log(response.data)
      dispatch(addRecipe(response.data));
      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      sx={{display: "flex", minHeight: "100vh", marginTop: "80px"}}>
    
      <Box
        sx={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px",}} >
        <Box sx={{width: "100%",backgroundColor: "#ffffff",padding: "20px",borderRadius: "8px",boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",}}>
          <Typography variant="h4" gutterBottom align="center">Create Recipe</Typography>
          
          <form onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: "16px" }}>
              <TextField
                label="Title"
                variant="outlined"
                id="title"
                name="title"
                value={recipe.title}
                onChange={handleChange}
              />
            </Box>

            <Typography variant="h6" gutterBottom>Ingredients</Typography>

            {recipe.ingredients.map((ingredient, index) => (
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
                key={index}
              >
                <Box sx={{ flex: 1, marginRight: "8px" }}>
                  <TextField
                    fullWidth
                    label="Ingredient"
                    variant="outlined"
                    name="ingredient"
                    value={ingredient.ingredient}
                    onChange={(event) => handleIngredientChange(event, index)}
                  />
                </Box>
                <Box sx={{ flex: 1, marginRight: "8px" }}>
                  <TextField
                    fullWidth
                    label="Amount"
                    variant="outlined"
                    name="amount"
                    value={ingredient.amount}
                    onChange={(event) => handleIngredientChange(event, index)}
                  />
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            ))}
            <Button
              variant="contained"
              onClick={handleAddIngredient}
              sx={{marginTop: "8px",backgroundColor: "#3B2A2A",color: "#FFFFFF",}} >
              Add Ingredient
            </Button>

            <Box sx={{ marginTop: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Instructions
              </Typography>
              <TextField
                id="instructions"
                name="instructions"
                multiline
                rows={4}
                placeholder="Write instructions here..."
                value={recipe.instructions}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  overflow: "auto",
                }}
              />
            </Box>

            <Box sx={{ marginTop: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Upload Image
              </Typography>
              <input
                type="file"
                id="imageUrl"
                name="imageUrl"
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />
            </Box>

            <Box sx={{ marginTop: "16px" }}>
              <TextField
                fullWidth
                label="Cooking Time"
                variant="outlined"
                id="cookingTime"
                name="cookingTime"
                placeholder="e.g., 30 minutes"
                value={recipe.cookingTime}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Select Filters:
              </Typography>
              {filters.map((filter) => (
                <FormControlLabel
                  key={filter}
                  control={
                    <Checkbox
                      name={filter}
                      checked={selectedFilters.includes(filter)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={filter}
                />
              ))}
              
          </Box>

            <Box sx={{ marginTop: "16px" }}>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit} 
                sx={{backgroundColor: "#3B2A2A",color: "#FFFFFF",width: "100%",}}>
                Create Recipe
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};
