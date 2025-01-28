import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A237E",
    },
    secondary: {
      main: "#FF4081",
    },
    background: {
      default: "linear-gradient(to right, #1A237E, #FF4081)",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#388e3c",
    },
    info: {
      main: "#0288d1",
    },
    warning: {
      main: "#f57c00",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
      color: "#1A237E",
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 600,
      color: "#1A237E",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#1A237E",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem",
      color: "#212121",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#757575",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
    caption: {
      fontSize: "0.75rem",
      color: "#757575",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 20px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A237E",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1A237E",
          color: "#ffffff",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: "Roboto, sans-serif",
          fontWeight: 600,
        },
        h2: {
          fontFamily: "Roboto, sans-serif",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
