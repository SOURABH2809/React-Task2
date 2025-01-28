import React from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

const BlogSection = ({ posts }) => {
  const limitedPosts = posts.slice(0, 6);

  return (
    <Box
      sx={{
        padding: { xs: '20px 10px', sm: '30px 20px', md: '40px 20px' },
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
        LATEST POSTS
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {limitedPosts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: { xs: 'none', sm: '0 4px 6px rgba(0, 0, 0, 0.1)' },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
                sx={{
                  borderRadius: { xs: '4px', md: '8px 8px 0 0' },
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  padding: { xs: '10px', sm: '16px' },
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    marginBottom: '10px',
                  }}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                  }}
                >
                  {post.description}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  marginTop="10px"
                  sx={{
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                  }}
                >
                  By {post.author} - {post.date}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                sx={{
                  alignSelf: { xs: 'center', sm: 'flex-start' },
                  margin: { xs: '10px auto', sm: '20px' },
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  borderRadius: '4px 8px',
                  padding: { xs: '4px 8px', md: '6px 12px' },
                  textTransform: 'none',
                }}
              >
                Read More
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogSection;
