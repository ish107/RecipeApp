import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setUser } from '../../store/userSlice';

import { AppBar, Button, Tab, Tabs, Toolbar, Drawer, List, ListItem, Typography } from '@mui/material';
import Logo from '../../assets/logo.png';
import './navbar.css';

export const Navbar = () => {
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false); 
  
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user?.username);
  const dispatch = useDispatch();

  const handleChange = (e, value) => {
    setValue(value);
  };

  const handleLoginClick = () => {
    navigate('./Register');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    window.localStorage.clear(); 
    dispatch(setUser({ user: { username: '', favorites: [] }, token: '' }));  
    navigate('/'); 
  };

  return (
    <AppBar sx={{ background: '#9DBF9E' }} position='fixed'>
      <Toolbar sx={{ marginLeft: 30, marginTop: 2, marginBottom: 2 }}>
        <img src={Logo} className='logo' />
        <Tabs sx={{ marginLeft: '25%' }} onChange={handleChange} value={value} indicatorColor='secondary' textColor='black'>
          <Tab label="HOME" sx={tabStyles} value={0} component={Link} to='/' />
          <Tab label="ADD RECIPE" sx={tabStyles} value={1} component={Link} to='/createRecipe' />
          <Tab label="PROFILE" sx={tabStyles} value={2} />
        </Tabs>

        
        <div style={{ marginLeft: 'auto' }}>
          {user ? (
            <>
              <Button sx={buttonStyles} onClick={toggleDrawer}>
                {user}
              </Button>
              
              <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer}>
                <List>
                  <ListItem>
                    <Typography variant="h6" sx={{ padding: 2 }}>
                      Welcome, {user}
                    </Typography>
                  </ListItem>
                  <ListItem button onClick={handleLogout}>
                    <Typography variant="body1" sx={{ padding: 2 }}>
                      Logout
                    </Typography>
                  </ListItem>
                </List>
              </Drawer>
            </>
          ) : (
            <Button variant='contained' sx={buttonStyles} onClick={handleLoginClick}>
              LOGIN
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

const tabStyles = { fontFamily: 'Monospace', fontSize: 28, color: '#3B2A2A', fontWeight: 'bold' };
const buttonStyles = { color: '#3B2A2A', fontFamily: 'Monospace', fontSize: 25, background: '#3CB371', fontWeight: 'bold', marginLeft: 'auto' };
