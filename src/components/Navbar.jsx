import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [menu, setMenu] = useState(null);

  const handleMenu = (event) => {
    setMenu(menu ? null : event.currentTarget);
  };

  return (
    <AppBar position="sticky" sx={{ minHeight: '56px', backgroundColor: 'primary' }}>
      <Toolbar sx={{ padding: { xs: '10px 20px', sm: '10px 40px' }, justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontSize: { xs: '1.5rem', sm: '2rem' }, 
            letterSpacing: '0.6rem',
            fontWeight: 'bold',
            marginLeft: '10px', 
            textAlign: { xs: 'center', sm: 'left' }, 
          }}
        >
          INSPIRE
        </Typography>

  
        <IconButton
          color="inherit"
          aria-label="menu"
          edge="end"
          onClick={handleMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>


        <Menu
          anchorEl={menu}
          open={Boolean(menu)}
          onClose={handleMenu}
        >
          <MenuItem onClick={handleMenu}>
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>HOME</Link>
          </MenuItem>
          <MenuItem onClick={handleMenu}>
            <Link to="/authors" style={{ textDecoration: 'none', color: 'inherit' }}>AUTHORS</Link>
          </MenuItem>
          <MenuItem onClick={handleMenu}>
            <Link to="/posts" style={{ textDecoration: 'none', color: 'inherit' }}>POSTS</Link>
          </MenuItem>
        </Menu>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, marginRight: '20px' }}>
          <Button component={Link} to="/home" color="inherit" sx={{ fontSize: '1rem' }}>
            Home
          </Button>
          <Button component={Link} to="/authors" color="inherit" sx={{ fontSize: '1rem' }}>
            Authors
          </Button>
          <Button component={Link} to="/posts" color="inherit" sx={{ fontSize: '1rem' }}>
            Posts
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
