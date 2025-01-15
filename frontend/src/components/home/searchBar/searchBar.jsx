import * as React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    left: '26%',
    width: '100%',
    height: 50,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(1, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#3B2A2A',
    width: '100%',
    fontSize: 24, 
    fontFamily:'Monospace',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));




const SearchBar = () => {
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon color='#3B2A2A'/>
            </SearchIconWrapper>
            <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
}

export default SearchBar;
