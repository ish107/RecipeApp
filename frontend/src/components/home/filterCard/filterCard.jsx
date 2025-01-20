import  React, {useEffect} from 'react';
import { styled } from '@mui/material/styles';

import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import SearchBar from '../searchBar/searchBar';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const FilterCard = ({selectedFilters, onFilterChange, onSearchChange, searchQuery}) => {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'All', selected: true },
    { key: 1, label: 'Asian', selected: false },
    { key: 2, label: 'Breakfast', selected: false },
    { key: 3, label: 'Lunch', selected: false },
    { key: 4, label: 'Dinner', selected: false },
    { key: 5, label: 'Western', selected: false },
  ]);

  useEffect(() => {
    const activeFilters = chipData.filter((chip) => chip.selected).map((chip) => chip.label);
    console.log(activeFilters, 'activeFilters');
    onFilterChange(activeFilters); 
  }, [chipData]);

  const handleToggle = (chipToToggle) => () => {
    setChipData((chips) => {
      if (chipToToggle.label === 'All') {
        return chips.map((chip) => ({
          ...chip,
          selected: chip.label === 'All',
        }));
      } else {
        return chips.map((chip) => {
          if (chip.label === 'All') return { ...chip, selected: false };
          if (chip.key === chipToToggle.key) {
            return { ...chip, selected: !chip.selected };
          }
          return chip;
        });
      }
    });
  }
  

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        justifyContent: 'space-between', 
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 2,
        m: 0,
      }}
      component="ul"
    >
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {chipData.map((data) => {
          return (
            <ListItem key={data.key}>
              <Chip
                label={data.label}
                onClick={handleToggle(data)}  
                color={data.selected ? 'success' : 'default'}  
                sx={{ fontFamily: 'monospace', fontSize: 20 }}
              />
            </ListItem>
          );
        })}
      </div>

      
    </Paper>
  );
}

export default FilterCard;

