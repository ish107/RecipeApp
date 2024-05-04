import {useState} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID.js"
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie"
import "../styles/createRec.css"

export const CreateRecipe =()=>{
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);
    const [recipe, setRecipe] = useState({
        title:"",
        ingredients : [{ingredient:"",amount:""}],
        instructions : "",
        imageUrl: "",
        cookingTime: "",
        userOwner : userID
    });

    const navigate = useNavigate();

    const handleChange = (event)=>{
        const{name,value} = event.target; //name of the items of form
        setRecipe({...recipe,[name]:value})
    }

    const handleIngredientChange = (event, index) => {
        const { name, value } = event.target;  //name used to set the ingredient and amount
        const ingredients = [...recipe.ingredients];
        ingredients[index] = { ...ingredients[index], [name]: value };
        setRecipe({ ...recipe, ingredients });
    };
    
    const handleAddIngredient = () => {
        const newIngredient = { ingredient: "", amount: "" };
        const ingredients = [...recipe.ingredients, newIngredient]; //add new ingredient
        setRecipe({ ...recipe, ingredients });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axios.post(
            "http://localhost:5000/recipe",
            { ...recipe },
            {
              headers: { authorization: cookies.access_token },
            }
          );
    
          alert("Recipe Created");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };
      console.log(recipe);
    
    return (
        <div className="createRecipe">
            <div className="form-recipe">
            <form className="recipeForm" onSubmit={handleSubmit}> 
                <div className="form-detailsR">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={recipe.title}
                        onChange={handleChange}
                    />

                    <label htmlFor="ingredients">Ingredients</label>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="ingr-list">
                            <input
                                type="text"
                                name="ingredient"
                                placeholder="Ingredient"
                                value={ingredient.ingredient}
                                onChange={(event) => handleIngredientChange(event, index)}
                            />
                            <input
                                type="text"
                                name="amount"
                                placeholder="Amount"
                                value={ingredient.amount}
                                onChange={(event) => handleIngredientChange(event, index)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddIngredient} className="btn">Add Ingredient</button>

                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={recipe.instructions}
                        onChange={handleChange}
                    ></textarea>

                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={recipe.imageUrl}
                        onChange={handleChange}
                    />
                    <label htmlFor="cookingTime">Cooking Time</label>
                        <input
                        type="text"
                        id="cookingTime"
                        name="cookingTime"
                        value={recipe.cookingTime}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn">Create Recipe</button>
                </div>
            </form>
            </div>
            
           
        </div>
    )
}
    
    