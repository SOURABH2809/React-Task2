import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroSection = () => {
  return (
    <Box
      sx={{
        padding: { xs: '20px 10px', sm: '30px 20px', md: '40px 20px' },
      }}
    >
      <Grid container spacing={4} alignItems="center">
    
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: '700',
              lineHeight: '1.3',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
              textAlign: { xs: 'center', md: 'left' }, 
            }}
          >
            WELCOME TO INSPIRE
          </Typography>
          <Typography
            variant="h4"
            component="h4"
            sx={{
              fontWeight: '500',
              lineHeight: '1.3',
              fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
              textAlign: { xs: 'center', md: 'left' }, 
              marginTop: { xs: '10px', md: '20px' },
            }}
          >
            Empowering Voices, Igniting Creativity
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'gray',
              fontWeight: '300',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
              maxWidth: '500px',
              marginTop: '20px',
              textAlign: { xs: 'center', md: 'left' }, 
              marginX: { xs: 'auto', md: 0 }, 
            }}
          >
            Dive into insightful articles, tips, and stories from a community of passionate writers.
          </Typography>
          <Button
            href="#explore"
            variant="contained"
            sx={{
              backgroundColor: '#e9ecef',
              color: '#343a40',
              padding: { xs: '8px', sm: '8px' },
              borderRadius: '8px',
              fontSize: { xs: '0.75rem', sm: '1rem', md: '2 rem' },
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: { xs: '30%', sm: '35%', md: '40%' },
              marginTop: '20px',
              marginX: { xs: 'auto',sm:'auto', md: 0 }, 
              '&:hover': { scale: '1.05' },
              transition: 'all 0.3s',
            }}
          >
            Explore Articles
            <ArrowForwardIcon sx={{ fontSize: { xs: '14px', md: '16px' } }} />
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' }, 
            }}
          >
            <img
              src="https://cdn.pixabay.com/photo/2023/02/08/17/55/mountains-7777164_640.jpg" 
              alt="Blog Image"
              style={{
                width: '100%',
                maxWidth: '500px',
                borderRadius: '10px',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
