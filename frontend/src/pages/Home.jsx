import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/home.css";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipe");
        setRecipes(response.data); // Update recipes state with fetched data
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="wallp">
        <div className="foods">
            <ul className="recipe-list">
                {recipes.map((recipe) => (
                <li key={recipe._id} className="recipe-item">
                    <div className="recipe-content">
                    <h2 className="recipe-title">{recipe.title}</h2>
                    <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
                    </div>
                </li>
                ))}
            </ul>
        </div>
    </div>
    
  );
};
