import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";

const formatDate = (timestamp) => {
  const date = new Date(Number(timestamp));
  return date.toLocaleString();
};

const PostProfile = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //Fetch Post data
  const fetchPostData = async () => {
    setLoading(true);
    try {
      const postResponse = await fetch(`http://localhost:3000/posts/${postId}`);
      const likeResponse = await fetch(
        `http://localhost:3000/likes?postId=${postId}`
      );
      const commentResponse = await fetch(
        `http://localhost:3000/comments?postId=${postId}`
      );
      const authorResponse = await fetch(`http://localhost:3000/authors`);

      if (
        !postResponse.ok ||
        !likeResponse.ok ||
        !commentResponse.ok ||
        !authorResponse.ok
      ) {
        throw new Error("Failed to fetch data");
      }

      const postData = await postResponse.json();
      const likeData = await likeResponse.json();
      const commentData = await commentResponse.json();
      const authorsData = await authorResponse.json();

      setPost(postData);
      setLikes(likeData);
      setComments(commentData);
      setAuthors(authorsData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  //Find Author Name
  const getAuthorFullName = (authorId) => {
    const author = authors.find((author) => author.id === String(authorId));
    return author ? `${author.firstName} ${author.lastName}` : "Unknown Author";
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Container sx={{ marginTop: 4, width: "1100px" }}>
      {post && (
        <Card variant="outlined" sx={{ padding: 2, marginBottom: 10 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Title: {post.title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Published on: {formatDate(post.datePublished)} | By Author:{" "}
              {getAuthorFullName(post.authorId)}
            </Typography>
            <Typography variant="h6" sx={{ marginY: 2, textAlign: "justify" }}>
              Description: {post.description}
            </Typography>
          </CardContent>

          <Divider />

          <Box
            sx={{
              padding: 2,
              backgroundColor: "#f8f9fa",
              borderRadius: 2,
              marginTop: 4,
            }}
          >
            <Grid container spacing={9}>
              <Grid item xs={12} md={6}>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ marginBottom: 1 }}
                >
                  <ThumbUpIcon
                    sx={{
                      width: 30,
                      height: 30,
                      marginRight: 1,
                      marginLeft: 2,
                      color: (theme) => theme.palette.primary.main,
                    }}
                  />
                  <Typography variant="h5">LIKES</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "2px",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    marginBottom: 2,
                  }}
                />
                {likes.length > 0 ? (
                  <List>
                    {likes.map((like) => (
                      <ListItem
                        key={like.id}
                        alignItems="flex-start"
                        sx={{
                          backgroundColor: "#f0f0f0",
                          borderRadius: 2,
                          marginBottom: 1,
                          padding: 1.5,
                        }}
                      >
                        <Avatar
                          src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png"
                          sx={{
                            width: 40,
                            height: 40,
                            marginRight: 2,
                            marginTop: "9px",
                          }}
                        />
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight="bold">
                              {getAuthorFullName(like.authorId)}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="span" color="textSecondary">
                              Liked on: {formatDate(like.datePublished)}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography>No likes available for this post.</Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ marginBottom: 1 }}
                >
                  <CommentIcon
                    sx={{
                      width: 30,
                      height: 30,
                      marginRight: 1,
                      marginLeft: 2,
                      paddingTop: "3px",
                      color: (theme) => theme.palette.secondary.main,
                    }}
                  />
                  <Typography variant="h5">COMMENTS</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "2px",
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    marginBottom: 2,
                  }}
                />
                {comments.length > 0 ? (
                  <List>
                    {comments.map((comment) => (
                      <ListItem
                        key={comment.id}
                        alignItems="flex-start"
                        sx={{
                          backgroundColor: "#f0f0f0",
                          borderRadius: 2,
                          marginBottom: 1,
                          padding: 2,
                        }}
                      >
                        <Avatar
                          src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png"
                          sx={{
                            width: 40,
                            height: 40,
                            marginRight: 2,
                            marginTop: "9px",
                          }}
                        />
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight="bold">
                              {getAuthorFullName(comment.authorId)}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography component="span" fontStyle="italic">
                                "{comment.text}"
                              </Typography>
                              <Typography
                                component="span"
                                color="textSecondary"
                              >
                                <br />
                                Commented on:{" "}
                                {formatDate(comment.datePublished)}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography>No comments available for this post.</Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        </Card>
      )}
    </Container>
  );
};

export default PostProfile;
