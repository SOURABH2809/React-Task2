import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, Box, Grid } from "@mui/material";
import AuthorCard from "../components/AuthorProfile/AuthorCard";
import AuthorPosts from "../components/AuthorProfile/AuthorPosts";

const AuthorProfile = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [view, setView] = useState("likes");

  
  // Fetch Data
  const fetchData = async () => {
    try {
      const authorResponse = await fetch(`http://localhost:3000/authors/${authorId}`);
      const postsResponse = await fetch(`http://localhost:3000/posts`);

      if (!authorResponse.ok || !postsResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const authorDetails = await authorResponse.json();
      const posts = await postsResponse.json();

      const authorPosts = posts.filter((post) => post.authorId === Number(authorId));

      if (authorPosts.length === 0) {
        throw new Error("No posts found for this author");
      }

      setPosts(authorPosts); 
      setAuthor(authorDetails);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authorId]);


  // Sorting 
  const sortedPosts = posts
    .sort((a, b) => {
      const aTotal = view === "likes" ? a.numLikes : a.numComments;
      const bTotal = view === "likes" ? b.numLikes : b.numComments;
      return bTotal - aTotal;
    })
    .slice(0, 6); 

  if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ padding: { xs: "10px", md: "20px" }, paddingBottom: "60px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box>
            {author && <AuthorCard author={author} />}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            {author && sortedPosts.length > 0 && (
              <AuthorPosts
                posts={sortedPosts} 
                view={view}
                handleToggle={(event, newView) => setView(newView)}
              />
            ) }
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthorProfile;
