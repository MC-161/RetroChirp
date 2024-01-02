import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const mode = theme.palette.mode;


  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="0.6rem 6%"
        textAlign="center"
      > 
        <Box className={`nes-container is-rounded ${mode == "dark" ? 'is-dark' : ''}`} display={"flex"} justifyContent={"center"}>
          <Typography fontWeight="bold" fontSize="20px" color="primary">
            Retro
          </Typography>
          <Typography fontWeight="bold" fontSize="20px" color="primary.second">
            Chirp
          </Typography>
        </Box>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h6" sx={{ mb: "1.5rem", lineHeight:"2"}} textAlign={"center"}>
          Welcome to RetroChirp, the Social Media for Retro Games & Consoles!
        </Typography>
        <Form></Form>
      </Box>
    </Box>
  );
};

export default LoginPage;
