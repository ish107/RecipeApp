import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ViewRecipe from '../viewRecipeModal/viewRecipe';
import { addUserFavorites, removeUserFavorites } from '../../../services/favoritesHandlers';

import {Button, Card, CardHeader, IconButton, Rating, CardMedia, CardContent, CardActions,Typography, Paper} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const RecipeCard = ({recipe, date}) => {

    const dispatch = useDispatch();

   const user = useSelector((state) => state.user.user);
   const userFavorites = user?.favorites;

   const [modalOpen, setModalOpen] = useState(false);
   const [isFavorite,setIsFavorite] = useState(userFavorites?.includes(recipe._id) || false);

   const handleFavoriteToggle = () => {
    if (!isFavorite) {
        addUserFavorites(user.id, recipe._id, dispatch);
    } else {
        removeUserFavorites(user.id, recipe._id, dispatch);
    }
    setIsFavorite(!isFavorite);
};

   const handleCloseModal = () => {
    setModalOpen(false);
   };

   const handleOpenModal = () => {
    setModalOpen(true);
   };
    
    return(
        <>
        <Card sx={{maxWidth: 300}}>
            <CardHeader title={recipe.title}
            subheader={date} 
            action={
                <IconButton onClick={handleFavoriteToggle}>
                   <FavoriteIcon sx={{ color: isFavorite ? 'red' : 'gray' }} />
                </IconButton>
             } />
            <CardMedia
             sx={{
                height: 200, 
                width: '100%', 
                objectFit: 'cover'
            }}
                component="img"
                image={recipe.imageUrl}
                alt={recipe.title}
            />
            <CardContent>
                <Typography variant="body2" sx={{ minHeight: 30 }}>
                {recipe.cookingTime}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Rating
                    name="read-only"
                    value={recipe.averageRatings.averageRating}
                    //onChange={handleRating}
                />
                <Typography> ({recipe.averageRatings.count})</Typography>
            <Button variant='contained' sx={buttonStyles} onClick={handleOpenModal}>VIEW</Button>   
            </CardActions>
            <Paper elevation={0} />
                <Paper />
            <Paper elevation={3} />
        </Card>
        <ViewRecipe open={modalOpen} onClose={handleCloseModal} recipe={recipe} />
        </>
    )
}

export default RecipeCard;


const buttonStyles = {color: '#3B2A2A',fontFamily:'Monospace' ,fontSize: 16, background:'#3CB371', fontWeight:'bold',marginLeft: 'auto'}