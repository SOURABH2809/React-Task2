import React from "react";
import {
  Card,
  Avatar,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import PostAddIcon from "@mui/icons-material/PostAdd";

const AuthorCard = ({ author, isLoading, error }) => {
  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {!isLoading && !error && author && (
        <Card
          sx={{
            width: { xs: "80%", sm: "400px" },
            height: { xs: "auto", sm: "300px" },
            boxShadow: 3,
            borderRadius: 2,
            display: "flex",
            backgroundColor: "#f8f9fa",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 20px",
            textAlign: "center",
            margin: "10px auto",
            "@media (max-width: 600px)": {
              width: "80%",
              margin: "10px auto",
            },
          }}
        >
          <Avatar
            sx={{ width: 120, height: 120, marginBottom: "10px" }}
            src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png"
            alt={`${author.firstName} ${author.lastName}`}
          />
          <Typography
            variant="h5"
            sx={{ marginBottom: "10px", fontWeight: "bold" }}
          >
            {author.firstName} {author.lastName}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ marginBottom: "15px" }}
          >
            Contact: {author.phone}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "55px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ThumbUpIcon
                sx={{
                  color: "primary.main",
                  marginBottom: "5px",
                  width: "30px",
                  height: "30px",
                }}
              />
              <Typography variant="body2">{author.numLikes}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CommentIcon
                sx={{
                  color: "secondary.main",
                  marginBottom: "5px",
                  width: "30px",
                  height: "30px",
                }}
              />
              <Typography variant="body2">{author.numComments}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <PostAddIcon
                sx={{
                  color: "info.main",
                  marginBottom: "5px",
                  width: "30px",
                  height: "30px",
                }}
              />
              <Typography variant="body2">{author.numPosts}</Typography>
            </Box>
          </Box>
        </Card>
      )}

      {!isLoading && !error && !author && (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          Author profile not found
        </Typography>
      )}
    </>
  );
};

export default AuthorCard;
