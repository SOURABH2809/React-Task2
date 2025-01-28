import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
  Pagination,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SearchIcon from "@mui/icons-material/Search";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch Author Data
  const fetchAuthors = async () => {
    try {
      const response = await fetch("http://localhost:3000/authors");
      if (!response.ok) throw new Error("Failed to fetch authors");
      const data = await response.json();
      setAuthors(data);
      setFilteredAuthors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  
  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredAuthors.length / itemsPerPage);
  const paginatedAuthors = filteredAuthors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  // Search Function
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchData(query);

    if (query.length > 0) {
      const filtered = authors.filter((author) =>
        `${author.firstName} ${author.lastName}`.toLowerCase().startsWith(query)
      );

      setFilteredAuthors(filtered);
      setSuggestions(filtered.slice(0, 6));
    } else {
      setFilteredAuthors(authors);
      setSuggestions([]);
    }
  };


  //Suggestion function
  const handleSuggestionClick = (authorName) => {
    setSuggestions([]);
    setSearchData(authorName);

    const authorData = authors.find(
      (author) => `${author.firstName} ${author.lastName}` === authorName
    );

    if (authorData) {
      setFilteredAuthors([authorData]);
      setCurrentPage(1);
    }
  };


  // Navigate - authorId
  const handleNavigateCard = (authorId) => {
    if (authorId) navigate(`/authors/${authorId}`);
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
            maxWidth: "500px",
            margin: "20px auto",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search Authors..."
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
                height: "45px",
                width: "100%",
              },
            }}
          />
        </Box>

        {suggestions.length > 0 && (
          <Box
            sx={{
              width: { xs: "33%", sm: "33%", md: "33%" },
              backgroundColor: "#f9f9f9",
              borderRadius: "15px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 1,
              position: "absolute",
              display: "block",
              marginLeft: "300px",
            }}
          >
            {suggestions.map((author, index) => (
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
                onClick={() =>
                  handleSuggestionClick(
                    `${author.firstName} ${author.lastName}`
                  )
                }
              >
                <SearchIcon
                  sx={{
                    marginRight: "10px",
                    height: "20px",
                    width: "20px",
                    color: "gray",
                  }}
                />
                {author.firstName} {author.lastName}
              </Typography>
            ))}
          </Box>
        )}

        {paginatedAuthors.length === 0 ? (
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ marginTop: "170px", marginBottom: "170px" }}
          >
            No authors found.
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedAuthors.map((author) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={author.id}>
                  <Card sx={{ borderRadius: 1.5, boxShadow: 3, marginTop: 5 }}>
                    <CardHeader
                      avatar={
                        <Avatar
                          src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png"
                          alt={`${author.firstName} ${author.lastName}`}
                          sx={{ width: 50, height: 50 }}
                        />
                      }
                      title={`${author.firstName} ${author.lastName}`}
                      subheader={author.phone}
                      titleTypographyProps={{
                        sx: {
                          fontWeight: "bold",
                          fontSize: "1rem",
                          color: "#333",
                        },
                      }}
                      subheaderTypographyProps={{
                        sx: {
                          fontWeight: "medium",
                          fontSize: "0.9rem",
                          color: "dark-grey",
                        },
                      }}
                    />
                    <CardActions
                      disableSpacing
                      sx={{ justifyContent: "space-around" }}
                    >
                      <IconButton sx={{ width: 40, height: 40 }}>
                        <ThumbUpIcon
                          color="primary"
                          sx={{ fontSize: 24, color: "#1976d2" }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            marginLeft: "4px",
                            fontSize: "1rem",
                            color: "#555",
                          }}
                        >
                          {author.numLikes}
                        </Typography>
                      </IconButton>
                      <IconButton sx={{ width: 40, height: 40 }}>
                        <CommentIcon
                          color="secondary"
                          sx={{ fontSize: 24, color: "#d32f2f" }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            marginLeft: "4px",
                            fontSize: "1rem",
                            color: "#555",
                          }}
                        >
                          {author.numComments}
                        </Typography>
                      </IconButton>
                      <IconButton sx={{ width: 40, height: 40 }}>
                        <PostAddIcon
                          color="info"
                          sx={{ fontSize: 24, color: "#0288d1" }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            marginLeft: "4px",
                            fontSize: "1rem",
                            color: "#555",
                          }}
                        >
                          {author.numPosts}
                        </Typography>
                      </IconButton>
                    </CardActions>
                    <CardContent sx={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        onClick={() => handleNavigateCard(author.id)}
                        sx={{
                          borderRadius: 2,

                          backgroundColor: "#0466c8",
                          width: "52%",
                          paddingY: "none",

                          "&:hover": { backgroundColor: "#0353a4" },
                        }}
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
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
          marginTop: "20px",
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
            },
          }}
        />
      </Box>
    </>
  );
};

export default Authors;
