import React, { useEffect, useState, useMemo } from "react";
import axiosInstance from "../util/axios";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../store/recipeSlice";

import RecipeCard from "../components/home/recipeCard/recipeCard";
import FilterCard from "../components/home/filterCard/filterCard";
import SearchBar from "../components/home/searchBar/searchBar";

import "../styles/home.css";


export const Home = () => {
  const recipes = useSelector((state) => state.recipes.recipes); 
  const dispatch = useDispatch();

  const [selectedFilters, setSelectedFilters] = useState(["All"]);
  const [searchQuery, setSearchQuery] = useState("");  
  const [filteredRecipes, setFilteredRecipes] = useState([]); 

  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get("/recipe");
        dispatch(setRecipes(response.data));  
        setFilteredRecipes(response.data); 
      } catch(err) {
        console.error("Failed to fetch recipes:", err.message);
        alert("Failed to load recipes. Please try again later.");
      }
    };
    fetchRecipes();
  }, [dispatch]);

  
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredRecipes(recipes);  
      return;
    }

    const fetchFilteredRecipes = async () => {
      
      try {
        const response = await axiosInstance.get("/recipe", {
          params: { search: searchQuery },  
        });
        setFilteredRecipes(response.data); 
      } catch (err) {
        console.error("Failed to fetch filtered recipes:", err.message);
        alert("Failed to load filtered recipes. Please try again later.");
      } 
    };

    fetchFilteredRecipes();
  }, [searchQuery, recipes]);  
  
  const finalFilteredRecipes = useMemo(() => {
    let filtered = filteredRecipes;

    if (!selectedFilters.includes("All")) {
      filtered = filtered.filter((recipe) =>
        selectedFilters.every((filter) => recipe.filters.includes(filter))
      );
    }

    return filtered;
  }, [filteredRecipes, selectedFilters]);

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters.length === 0 ? ["All"] : filters);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);  
  };


  return (
    <div style={{ paddingTop: 180 }}>
      <div style={{ marginBottom: 10, display: "flex" }}>
        
        <FilterCard
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />
        <div style={{ marginLeft: '50%' }}>
          <SearchBar
            setSearchResults={handleSearchChange}  
            searchQuery={searchQuery}  
            setSearchQuery={setSearchQuery}
          />
          
        </div>
      </div>
      <ul className="recipe-list">
        {finalFilteredRecipes.map((recipe) => (
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
    </div>
  );
};
