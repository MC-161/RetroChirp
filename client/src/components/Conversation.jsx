import React from "react";
import { Box, Typography } from "@mui/material";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

const Conversation = ({ friendId, name, subtitle, userPicturePath }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const main = palette.primary.second;
  const medium = palette.neutral.medium;

  return (
    <Box
      display="flex"
      alignItems="center"
      padding="1rem"
      cursor="pointer"
      onClick={() => {
        navigate(`/profile/${friendId}`);
        navigate(0);
      }}
      sx={{
        "&:hover": {
          backgroundColor: palette.background.paper,
        },
        cursor:"pointer"
      }}
    >
      <UserImage image={userPicturePath} size="55px" />
      <Box marginLeft="1rem">
        <Typography
          color={main}
          variant="h6"
          fontWeight="500"
          sx={{
            "&:hover": {
              color: palette.primary.dark,
            },
            display: "block", // Ensures proper spacing and alignment
          }}
        >
          {name}
        </Typography>
        <Typography color={medium} fontSize="0.75rem">
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default Conversation;
