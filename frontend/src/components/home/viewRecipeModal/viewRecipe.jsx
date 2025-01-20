import  React,{useState, useCallback} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../../util/axios';
import { setUserRating } from '../../../store/userSlice';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, CardMedia, Rating, Box, List, ListItem, ListItemIcon, ListItemText, Chip} from '@mui/material';
import KitchenIcon from '@mui/icons-material/Kitchen';
import Alert from '@mui/material/Alert';

import { updateAverageRating } from '../../../store/recipeSlice';

const ViewRecipe = ({ open, onClose, recipe }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!recipe) return null;

  const user = useSelector((state) => state.user.user?.id);
  const ratings = useSelector((state) => state.user.user?.ratingsGiven) || [];

  const oldRating = (ratings.find(item => item.recipeId === recipe._id))?.value || null;

  const [rating, setRating] = useState(oldRating && oldRating || 0);
  const [alert, setAlert] = useState({ open: false, type: '', message: '' });

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRatingSave = async () => {
      try {
        const response = await axiosInstance.put(`/user/${user}/rate-recipe`, {
          recipeId: recipe._id,
          ratingValue: rating,
        });
        
        dispatch(setUserRating(response.data.user.ratingsGiven)); 
        dispatch(updateAverageRating(response.data));

        setAlert({ open: true, type: 'success', message: 'Rating saved successfully!' });

      } catch (error) {

        console.error("Error updating rating:", error.message);
        setAlert({ open: true, type: 'error', message: 'Failed to save rating. Please try again.' });
      }
  };

  const handleClick =() =>{
    navigate("/Register")
  }

  return (
    <>
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
          border: `2px solid #3B2A2A`,
          boxShadow: 4,
        }
      }}
    >
      <DialogTitle sx={{ fontFamily: 'monospace', fontSize: 24, color: '#3CB371', fontWeight: 'bold',}}>
        {recipe.title.toUpperCase()}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box sx={{ width: '50%', pr: 2 }}>
            <CardMedia
              component="img"
              image={recipe.imageUrl}
              alt={recipe.title}
              sx={{ borderRadius: 2, boxShadow: 3 }}
            />
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly"  mt={2}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#3B2A2A', mb: 1 }}>
                Rate this Dish
              </Typography>
              <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
              <Rating
                name={"simple-controlled"}
                value={rating}
                onChange={(event,value) => handleRatingChange(value)}
                precision={0.5}
                sx={{ fontSize: 28 }}
                disabled={!user}
              />
              {user && <Button 
                onClick={handleRatingSave} 
                sx={{ fontFamily: 'monospace', color: '#FFFFFF', backgroundColor: '#3CB371', '&:hover': { backgroundColor: '#2F4F4F' },borderRadius: 2 ,marginLeft: 2}}>
                Save
              </Button>}
              </Box>
              {!user && <Chip label="LogIn to rate this dish" onClick={handleClick} color='success' sx={{marginTop: 2}}/>}
              {alert.open && (
                <Alert
                  severity={alert.type} 
                  onClose={() => setAlert({ open: false, type: '', message: '' })} 
                  sx={{marginTop: 2, width: '100%',}}>{alert.message}
              </Alert>
            )}
            </Box>
          </Box>
          <Box sx={{ width: '50%', pl: 2, }}>
            <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#3B2A2A', fontWeight: 'bold', mb: 1 }}>
              Ingredients:
            </Typography>
            <List sx={{ pl: 2, fontFamily: 'monospace', color: '#696969' }}>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <KitchenIcon fontSize="small" sx={{ color: '#3CB371' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1)}: ${ingredient.amount}`}
                    primaryTypographyProps={{ fontFamily: 'monospace', fontSize: 16 }}
                  />
                </ListItem>
              ))}
            </List>

            <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#3B2A2A', fontWeight: 'bold', mt: 3, mb: 1 }}>
              Cooking Time:
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#696969' }}>
              {recipe.cookingTime} 
            </Typography>

            <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#3B2A2A', fontWeight: 'bold', mt: 3, mb: 1 }}>
              Instructions:
            </Typography>
            <Typography variant="body2" paragraph sx={{ fontFamily: 'monospace', color: '#696969' }}>
              {recipe.instructions}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose} 
          sx={{ 
            fontFamily: 'monospace', 
            color: '#FFFFFF', 
            backgroundColor: '#3CB371', 
            '&:hover': { backgroundColor: '#2F4F4F' },
            borderRadius: 2 
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default ViewRecipe;
