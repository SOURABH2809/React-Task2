import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const CreatePostDialog = ({ open, onClose, addNewPost }) => {
  const [newPost, setNewPost] = useState({
    id: "",
    title: "",
    description: "",
    authorId: "",
    numLikes: "",
    numComments: "",
    datePublished: Math.floor(Date.now() / 1000),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if ((name === "numLikes" || name === "numComments") && value < 0) {
      updatedValue = 0;
    }

    setNewPost({
      ...newPost,
      [name]: updatedValue,
    });
  };

  const handleCreatePost = async () => {
    const postWithId = {
      ...newPost,
      id: uuidv4(),
      authorId: Math.floor(Math.random() * 100) + 1,
      datePublished: Math.floor(Date.now() / 1000),
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postWithId),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setSnackbarMessage("Post created successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setNewPost({
        id: "",
        title: "",
        description: "",
        authorId: "",
        numLikes: "",
        numComments: "",
        datePublished: Math.floor(Date.now() / 1000),
      });

      addNewPost(postWithId);

      onClose();
    } catch (error) {
      setSnackbarMessage(`Failed to create the post. Error: ${error.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog sx={{ padding: "40px" }} open={open} onClose={onClose}>
        <DialogTitle
          sx={{
            fontSize: "20px",
            textAlign: "center",
            color: "darkblue",
            fontWeight: "bold",
          }}
        >
          CREATE NEW POST
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title"
            type="text"
            fullWidth
            value={newPost.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newPost.description}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Likes"
            name="numLikes"
            type="number"
            fullWidth
            value={newPost.numLikes}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Comments"
            name="numComments"
            type="number"
            fullWidth
            value={newPost.numComments}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ padding: "20px" }}>
          <Button onClick={onClose} color="secondary" disabled={isSubmitting}>
            Back
          </Button>
          <Button
            onClick={handleCreatePost}
            color="primary"
            variant="contained"
            disabled={isSubmitting}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        sx={{ marginTop: "50px", position: "fixed" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreatePostDialog;
