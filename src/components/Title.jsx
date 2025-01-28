import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Title = ({ title }) => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'transparent', 
        boxShadow: 'none', 
        padding: 0, 
        color: "#495057",
      }}
    >
      <Toolbar>
        <Typography 
          variant="h4" 
          sx={{ 
            flexGrow: 1, 
            padding: "10px", 
            textAlign: { xs: 'flex-start', sm: 'flex-start' }, 
            borderBottom: '2px solid rgb(247, 246, 246)', 
            borderWidth: "3px", 
            fontSize: { xs: '0.7rem', sm: '1rem', md: '1.3rem' }, 
          }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Title;
