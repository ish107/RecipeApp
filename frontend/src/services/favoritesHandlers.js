
import axiosInstance from "../util/axios";
import { addFavorites, removeFavorites } from "../store/userSlice";


const addUserFavorites = async (userId , recipeId, dispatch) => {
    console.log(userId,recipeId)
    try{
        const response = await axiosInstance.post(`user/${userId}/add-favorites` ,{
             recipeId: recipeId
        })
        console.log(response);
        dispatch(addFavorites(recipeId))
    }catch(error){
        console.log(error)
    }
};

const removeUserFavorites = async (userId, recipeId,dispatch) => {
    try{
        const reponse = await axiosInstance.post(`user/${userId}/remove-favorites`,{
            recipeId: recipeId
        })
        dispatch(removeFavorites(recipeId))
    }catch(error){
        console.log(error)
    }
};

export {addUserFavorites, removeUserFavorites} ;