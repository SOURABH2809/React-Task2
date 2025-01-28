import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        padding: 3,
        backgroundColor: "primary.main",
        textAlign: "center",
        position: "relative",
        bottom: 0,
      }}
    >
      <Typography variant="body2" color="white">
        © 2024 Sourabh Gautam. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
