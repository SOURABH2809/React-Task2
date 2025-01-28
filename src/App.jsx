import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authors from "./pages/Authors";
import Posts from "./pages/Posts";
import PostProfile from "./pages/PostProfile";
import AuthorProfile from "./pages/AuthorProfile";
import Container from "@mui/material/Container";
import theme from "./theme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Title from "./components/Title";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar sx={{ marginBottom: 6 }} />

      <Container sx={{ marginTop: 0, minHeight: "calc(100vh)" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Title title="Home >>" />
                <Home />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Title title="Home >>" />
                <Home />
              </>
            }
          />
          <Route
            path="/authors"
            element={
              <>
                <Title title="Authors  >>" />
                <Authors />
              </>
            }
          />
          <Route
            path="/authors/:authorId"
            element={
              <>
                <Title title="Authors  >>  Author Profile" />
                <AuthorProfile />
              </>
            }
          />
          <Route
            path="/posts/:postId"
            element={
              <>
                <Title title="Posts  >>  Post Profile" />
                <PostProfile />
              </>
            }
          />
          <Route
            path="/posts"
            element={
              <>
                <Title title="Posts  >>" />
                <Posts />
              </>
            }
          />
        </Routes>
      </Container>

      <Footer />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
