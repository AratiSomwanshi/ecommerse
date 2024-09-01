import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Menu, MenuItem } from '@mui/material';
import { Search as SearchIcon, ShoppingCart as ShoppingCartIcon, Login as LoginIcon, Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'; 

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const NavBar = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-Commerce
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Search>
        <IconButton color="inherit" component={Link} to="/login">
          <LoginIcon />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/add-to-cart/:userId"> 
         
            <ShoppingCartIcon />
       
        </IconButton>
        <IconButton color="inherit" onClick={handleClick}>
          Menu
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem component={Link} to="/home" onClick={handleClose}>Home</MenuItem>
          <MenuItem component={Link} to="/products" onClick={handleClose}>Products</MenuItem>
          <MenuItem component={Link} to="/about-us" onClick={handleClose}>About Us</MenuItem>
          <MenuItem component={Link} to="/contact-us" onClick={handleClose}>Contact Us</MenuItem>
          <MenuItem component={Link} to="/settings" onClick={handleClose}>Settings</MenuItem>
          <MenuItem component={Link} to="/login" onClick={handleClose}>Login</MenuItem>
          <MenuItem component={Link} to="/register" onClick={handleClose}>Register</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
