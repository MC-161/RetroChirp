import React from "react";
import {
  ChatOutlined, // Changed to ChatOutlined icon for starting a conversation
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const ChatFriend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryDark = palette.background.default;
  const main = palette.primary.second;
  const medium = palette.neutral.medium;

  const startConversation = async () => {
    try {
      const res = await fetch(`http://localhost:3001/conversations/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: _id,
        receiverId: friendId, // Corrected the spelling to "receiverId"
      }),
    });

      if (!res.ok) {
        throw new Error("Failed to start conversation");
      }

      console.log(`Starting conversation with ${name}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h6"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.dark,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={startConversation} // Call startConversation instead of patchFriend
        sx={{ backgroundColor: primaryDark, p: "0.6rem" }}
      >
        <ChatOutlined sx={{ color: main }} /> {/* Changed to ChatOutlined icon */}
      </IconButton>
    </FlexBetween>
  );
};

export default ChatFriend;