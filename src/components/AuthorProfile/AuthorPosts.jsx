import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";

const AuthorPost = ({ posts, view, handleToggle }) => {
  const [expandedPost, setExpandedPost] = useState(null);
  
  const navigate = useNavigate();

  // Read More function
  const handleReadMore = (id, event) => {
    event.stopPropagation();
    setExpandedPost(expandedPost === id ? null : id);
  };

  // Navigate postId
  const handleNavigateCard = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ padding: { xs: "10px", md: "20px" }, paddingBottom: "60px" }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ paddingBottom: "20px" }}
            >
              TOP POSTS :-
            </Typography>

            <ToggleButtonGroup value={view} exclusive onChange={handleToggle}>
              <ToggleButton
                value="likes"
                aria-label="Top Likes"
                sx={{ padding: "10px 50px" }}
              >
                Top Likes <ThumbUpIcon sx={{ marginLeft: "5px" }} />
              </ToggleButton>
              <ToggleButton
                value="comments"
                aria-label="Top Comments"
                sx={{ padding: "10px 50px" }}
              >
                Top Comments <CommentIcon sx={{ marginLeft: "5px" }} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Grid
            container
            spacing={3}
            sx={{
              marginTop: "20px",
              marginBottom: "30px",
              justifyContent: "center",
            }}
          >
            {posts.map((post) => (
              <Grid item xs={12} key={post.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: "hidden",
                    height: "100%",
                  }}
                  onClick={() => handleNavigateCard(post.id)}
                >
                  <Box
                    sx={{
                      width: "35%",
                      backgroundColor: "#f5f5f5",
                      padding: "15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        color="text.primary"
                        sx={{ fontWeight: "800" }}
                      >
                        Title: {post.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {new Date(post.datePublished).toLocaleDateString()}
                      </Typography>
                      <Box
                        sx={{ display: "flex", gap: "35px", marginTop: "15px" }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ThumbUpIcon
                            sx={{
                              color: "primary.main",
                              marginRight: "8px",
                              width: 28,
                              height: 28,
                            }}
                          />
                          <Typography variant="body3">
                            {post.numLikes}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CommentIcon
                            sx={{
                              color: "secondary.main",
                              marginRight: "8px",
                              width: 28,
                              height: 28,
                            }}
                          />
                          <Typography variant="body3">
                            {post.numComments}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: "65%",
                      padding: "30px",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "justify",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {expandedPost === post.id
                        ? post.description
                        : `${post.description.slice(0, 300)}...`}
                    </Typography>

                    <Box sx={{ marginTop: "15px" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={(event) => handleReadMore(post.id, event)}
                      >
                        {expandedPost === post.id ? "Read Less" : "Read More"}
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthorPost;
