import React from "react";
import { Box, Typography, Avatar, useTheme } from "@mui/material";

const Msg = ({ message, isSender }) => {
  const theme = useTheme();

  const messageContainerStyles = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  };

  const avatarStyles = {
    width: "40px",
    height: "40px",
  };

  const messageStyles = {
    maxWidth: "60%",
    padding: "0.8rem",
    borderRadius: "10px",
    backgroundColor: isSender
      ? theme.palette.primary.main
      : theme.palette.background.default,
    marginLeft: isSender ? "auto" : "1rem",
  };

  return (
    <Box style={messageContainerStyles}>
      {!isSender && (
        <Avatar
          alt="User"
          src="https://wallpapers-clan.com/wp-content/uploads/2023/05/cool-pfp-02.jpg"
          style={avatarStyles}
        />
      )}
      <div className="nes-balloon" style={messageStyles}>
        <Typography variant="body1" color="text.primary">
          {message}
        </Typography>
      </div>
    </Box>
  );
};

export default Msg;
