import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, CardMedia, Rating, Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import KitchenIcon from '@mui/icons-material/Kitchen';

const ViewRecipe = ({ open, onClose, recipe }) => {
  const [rating, setRating] = React.useState(recipe?.rating || 0);

  if (!recipe) return null;

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  return (
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
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#3B2A2A', mb: 1 }}>
                Rate this Dish
              </Typography>
              <Rating
                name="recipe-rating"
                value={rating}
                onChange={handleRatingChange}
                precision={0.5}
                sx={{ fontSize: 28 }}
              />
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
  );
};

export default ViewRecipe;
