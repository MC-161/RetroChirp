import React, { useEffect, useState } from "react";
import { Box, Typography,useTheme } from "@mui/material";
import UserImage from "./UserImage";
import { useSelector } from "react-redux";
import {format} from "timeago.js"

const Msg = ({ recId, message, isSender }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const apiUrl = process.env.REACT_APP_API_URL;
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

  const getUser = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/${recId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, [recId]);

  return (
    <Box style={messageContainerStyles}>
      {!isSender && user && <UserImage image={user.picturePath} size="50px" />}
      <div className="nes-balloon" style={messageStyles}>
        <Typography variant="body1" color="text.primary">
          {message.text}
        </Typography>
        <Typography fontSize="0.5rem">
          {format(message.createdAt)}
        </Typography>
      </div>
    </Box>
  );
};

export default Msg;
