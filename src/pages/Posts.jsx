import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdatePost from "../components/UpdatePost";
import CreatePost from "../components/CreatePost";
import {
  Grid,
  Card,
  Button,
  Typography,
  TextField,
  Box,
  Pagination,
  Container,
  CircularProgress,
  Modal,
  Backdrop,
  InputAdornment,
  Fade,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import SearchIcon from "@mui/icons-material/Search";

const Post = () => {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [DeletePost, setDeletePost] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpenDialogue, setIsOpenDialogue] = useState(false);
  const [isOpenDialogue1, setIsOpenDialogue1] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);

  const navigate = useNavigate();

  // Fetch Posts Data
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();

      setPostsData(data.reverse());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(
    (filteredPost.length || postsData.length) / itemsPerPage
  );
  const paginatedPosts = (filteredPost.length ? filteredPost : postsData).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  //Search Function
  const handleSearchChange = (event) => {
    const query = event.target.value.trim().toLowerCase();
    setSearchData(query);

    if (query.length > 0) {
      const filtered = postsData.filter((post) =>
        post.title.toLowerCase().startsWith(query)
      );
      setFilteredPost(filtered);

      const filteredSuggestions = postsData.filter((post) =>
        post.title.toLowerCase().startsWith(query)
      );
      setSuggestions(filteredSuggestions.slice(0, 6));
    } else {
      setFilteredPost(postsData);
      setSuggestions([]);
    }
  };


  //Suggestion Function
  const handleSuggestionClick = (postTitle) => {
    setSuggestions([]);
    setSearchData(postTitle);

    const post = postsData.find((post) => post.title === postTitle);
    if (post) {
      setFilteredPost([post]);
      setCurrentPage(1);
    }
  };

  const addNewPost = (newPost) => {
    setPostsData((prevPosts) => {
      return [newPost, ...prevPosts];
    });
  };


  //Read More function
  const handleReadMore = (postId, event) => {
    event.stopPropagation();
    setExpandedPost(expandedPost === postId ? null : postId);
  };


  //Delete Funtion
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/${DeletePost}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }

      const updatedPosts = postsData.filter((post) => post.id !== DeletePost);
      setPostsData(updatedPosts);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleConfirmDelete = (postId, event) => {
    event.stopPropagation();
    setDeletePost(postId);
    setIsModalOpen(true);
  };

  const handleCancelDelete = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  //Create - Dialogue
  const handleCloseDialogue = () => {
    setIsOpenDialogue(false);
  };

  //Create - Dialogue
  const handleOpenDialogue = () => {
    setIsOpenDialogue(true);
  };

  //Update - Dialogue
  const handleCloseDialogue1 = () => {
    setIsOpenDialogue1(false);
    setPostToEdit(null);
  };

  //Update - Dialogue
  const handleOpenDialogue1 = (event, post) => {
    event.stopPropagation();
    setIsOpenDialogue1(true);
    setPostToEdit(post);
  };


  // Navigation - postId
  const handleNavigateCard = (postId) => {
    if (postId) navigate(`/posts/${postId}`);
  };

  
  //Update Function
  const handlePostUpdate = (updatedPost) => {
    setPostsData((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
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
    return (
      <Container>
        <Typography variant="h5" color="error" textAlign="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ paddingY: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            maxWidth: "600px",
            margin: "20px auto",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search Posts..."
            value={searchData}
            onChange={handleSearchChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                paddingTop: "1px",
                paddingBottom: "3px",
                height: "45px",
              },
            }}
          />

          <Box>
            <Button
              sx={{
                backgroundColor: "#FBFBFB",
                color: "darkblue",
                paddingY: "10px",
                borderRadius: "20px",
                paddingX: "4px",
                width: "120px",
              }}
              variant="contained"
              onClick={handleOpenDialogue}
            >
              Create Post
            </Button>

            <CreatePost
              open={isOpenDialogue}
              onClose={handleCloseDialogue}
              addNewPost={addNewPost}
            />
          </Box>
        </Box>

        {suggestions.length > 0 && (
          <Box
            sx={{
              width: { xs: "32%", sm: "32%", md: "32%" },
              backgroundColor: "#f9f9f9",
              borderRadius: "15px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 1,
              position: "absolute",
              display: "block",
              marginLeft: "250px",
            }}
          >
            {suggestions.map((post, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "0.2px solid lightgrey",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#ececec" },
                }}
                onClick={() => handleSuggestionClick(post.title)}
              >
                <SearchIcon
                  sx={{
                    marginRight: "10px",
                    height: "20px",
                    width: "20px",
                    color: "gray",
                  }}
                />
                {post.title}
              </Typography>
            ))}
          </Box>
        )}

        {paginatedPosts.length === 0 ? (
          <Container>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{ marginTop: "80px" }}
            >
              No posts found.
            </Typography>
          </Container>
        ) : (
          <>
            <Grid
              container
              spacing={3}
              sx={{
                marginTop: "20px",
                marginBottom: "30px",
                justifyContent: "center",
              }}
            >
              {paginatedPosts.map((post) => (
                <Grid item xs={12} key={post.id}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      boxShadow: 3,
                      borderRadius: 2,
                      overflow: "hidden",
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
                          sx={{
                            display: "flex",
                            gap: "35px",
                            marginTop: "15px",
                          }}
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
                            <Typography variant="body2">
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
                            <Typography variant="body2">
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
                          : `${post.description.slice(0, 500)}`}
                      </Typography>
                      <Box
                        sx={{
                          marginTop: "15px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={(event) => handleReadMore(post.id, event)}
                        >
                          {expandedPost === post.id ? "Read Less" : "Read More"}
                        </Button>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <Button
                            sx={{
                              backgroundColor: "#FBFBFB",
                              color: "#0D92F4",
                            }}
                            variant="contained"
                            size="small"
                            onClick={(event) =>
                              handleOpenDialogue1(event, post)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            sx={{
                              backgroundColor: "#FBFBFB",
                              color: "#D84040",
                            }}
                            variant="contained"
                            size="small"
                            onClick={(event) =>
                              handleConfirmDelete(post.id, event)
                            }
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <UpdatePost
              open={isOpenDialogue1}
              onClose={handleCloseDialogue1}
              postToEdit={postToEdit}
              onPostUpdate={handlePostUpdate}
            />

            <Modal
              open={isModalOpen}
              onClose={handleCancelDelete}
              closeAfterTransition
              BackdropComponent={Backdrop}
            >
              <Fade in={isModalOpen}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: 24,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Confirm Deletion!!
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                    Are you sure you want to delete this post?
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button color="secondary" onClick={handleCancelDelete}>
                      Cancel
                    </Button>
                    <Button
                      sx={{ backgroundColor: "darkblue", color: "white" }}
                      onClick={handleDelete}
                      color="error"
                    >
                      Yes
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Modal>
          </>
        )}
      </Container>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
          position: "relative",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              borderRadius: "50%",
              margin: "0 5px",
            },
          }}
        />
      </Box>
    </>
  );
};

export default Post;
