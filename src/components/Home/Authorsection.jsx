import React from 'react';
import { Box, Typography, Grid, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AuthorSection = () => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/authors'); 
  };

  return (
    <Box
      sx={{
        padding: { xs: '20px 10px', sm: '30px 20px', md: '40px 20px' },
        backgroundColor: '#f5f5f5',
        marginBottom: '40px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: { xs: '20px', md: '40px' },
          fontSize: { xs: '1.5rem', md: '2rem' },
        }}
      >
        MEET THE AUTHORS
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Author 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              textAlign: 'center',
              padding: { xs: '10px', md: '20px' },
            }}
          >
            <Avatar
              alt="John Doe"
              src="https://randomuser.me/api/portraits/men/9.jpg"
              sx={{
                width: { xs: 80, sm: 100, md: 120 },
                height: { xs: 80, sm: 100, md: 120 },
                margin: 'auto',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                marginTop: '10px',
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              John Doe
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontSize: { xs: '0.875rem', md: '1rem' },
                marginTop: '5px',
              }}
            >
              John is a passionate web developer who loves to write tutorials and share knowledge with others.
            </Typography>
          </Box>
        </Grid>
        {/* Author 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              textAlign: 'center',
              padding: { xs: '10px', md: '20px' },
            }}
          >
            <Avatar
              alt="Jane Smith"
              src="https://100k-faces.glitch.me/random-image"
              sx={{
                width: { xs: 80, sm: 100, md: 120 },
                height: { xs: 80, sm: 100, md: 120 },
                margin: 'auto',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                marginTop: '10px',
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Jane Smith
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontSize: { xs: '0.875rem', md: '1rem' },
                marginTop: '5px',
              }}
            >
              Jane is a software engineer with a passion for creating educational content and exploring new technologies.
            </Typography>
          </Box>
        </Grid>
        {/* Author 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              textAlign: 'center',
              padding: { xs: '10px', md: '20px' },
            }}
          >
            <Avatar
              alt="Mark Wilson"
              src="https://randomuser.me/api/portraits/men/5.jpg"
              sx={{
                width: { xs: 80, sm: 100, md: 120 },
                height: { xs: 80, sm: 100, md: 120 },
                margin: 'auto',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                marginTop: '10px',
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Mark Wilson
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontSize: { xs: '0.875rem', md: '1rem' },
                marginTop: '5px',
              }}
            >
              Mark is a tech enthusiast who writes about the latest trends in software development and AI.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleViewMore}
        >
          View More
        </Button>
      </Box>
    </Box>
  );
};

export default AuthorSection;
