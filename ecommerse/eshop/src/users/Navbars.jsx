import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom'; 

const Navbars = ({ cartCount }) => {
    return (
        <AppBar position="fixed" sx={{ top: 0, left: 0, width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    MyShop
                </Typography>
                <IconButton color="inherit" component={Link} to="/userhome">
                    <HomeIcon />
                </IconButton>
                <IconButton color="inherit" component={Link} to="/user-profile">
                    <AccountCircle />
                </IconButton>
                <IconButton color="inherit" component={Link} to="/cart">
                    <Badge badgeContent={cartCount} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbars;
