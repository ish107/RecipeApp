import React, { useEffect, useState } from "react";
import axiosInstance from "../util/axios";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../store/recipeSlice";

import RecipeCard from "../components/home/recipeCard/recipeCard";
import FilterCard from "../components/home/filterCard/filterCard";
import "../styles/home.css";

export const Home = () => {
  
  const recipes = useSelector((state) => state.recipes.recipes);
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState(['All']);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get("/recipe");
        setFilteredRecipes(response.data);
        dispatch(setRecipes(response.data));  
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
  }, []);

  const handleFilterChange = (filters) => {
    if (filters.length === 0) {
      filters = ['All'];
    }
    setSelectedFilters(filters); 
    console.log(filters,'home')

    if (filters.includes('All')) {
      setFilteredRecipes(recipes); 
    } else {
      console.log(recipes)
      const updatedFilteredRecipes = recipes.filter((recipe) => 
        filters.every((filter) => recipe.filters.includes(filter))
      );
      
      console.log(updatedFilteredRecipes, 'recipes')
      setFilteredRecipes(updatedFilteredRecipes);
      
    }
  };
  return (
      <div style={{paddingTop: 180}}>
        <div style={{marginBottom: 10}}>
          <FilterCard onFilterChange={handleFilterChange}  selectedFilters={selectedFilters}/>
        </div>
        <ul className="recipe-list">
            {filteredRecipes.map((recipe) => (
            <li key={recipe._id} className="recipe-item">
                <RecipeCard recipe={recipe} date={new Date(parseInt(recipe._id.substring(0, 8), 16) * 1000).toLocaleDateString()} />
            </li>
            ))}
        </ul>
      </div>
    
  );
};
