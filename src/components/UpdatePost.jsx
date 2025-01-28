import React, { useState, useEffect } from "react";
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

const UpdatePostDialog = ({ open, onClose, postToEdit, onPostUpdate }) => {
  const [currentPost, setCurrentPost] = useState({
    id: "",
    title: "",
    description: "",
    numLikes: 0,
    numComments: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (open && postToEdit) {
      setCurrentPost({
        ...postToEdit,
        numLikes: postToEdit.numLikes || 0,
        numComments: postToEdit.numComments || 0,
      });
    }
  }, [open, postToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost({
      ...currentPost,
      [name]:
        name === "numLikes" || name === "numComments"
          ? Math.max(0, value)
          : value,
    });
  };

  const updatePost = async () => {
    if (!currentPost.id) {
      setSnackbarMessage("Post ID is missing. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:3000/posts/${currentPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentPost),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update post. Server responded with ${response.status}`
        );
      }

      const updatedPost = await response.json();

      if (onPostUpdate) {
        onPostUpdate(updatedPost);
      }

      setSnackbarMessage("Post updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      onClose();
    } catch (error) {
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} sx={{ padding: "40px" }}>
        <DialogTitle
          sx={{
            fontSize: "20px",
            textAlign: "center",
            color: "darkblue",
            fontWeight: "bold",
          }}
        >
          Update Post
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title"
            type="text"
            fullWidth
            value={currentPost.title || ""}
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
            value={currentPost.description || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Likes"
            name="numLikes"
            type="number"
            fullWidth
            value={currentPost.numLikes || 0}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Comments"
            name="numComments"
            type="number"
            fullWidth
            value={currentPost.numComments || 0}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ padding: "20px" }}>
          <Button onClick={onClose} color="secondary" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={updatePost}
            color="primary"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
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

export default UpdatePostDialog;
