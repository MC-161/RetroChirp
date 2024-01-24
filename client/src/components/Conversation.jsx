// Conversation.js
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import UserImage from "./UserImage";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const Conversation = ({ conversation, currentUser, searchTerm }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const mainColor = palette.primary.main;
  const secondaryColor = palette.secondary.main;
  const mediumColor = palette.text.secondary;
  const token = useSelector((state) => state.token);

  const getUser = async (uid) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${uid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };

  useEffect(() => {
    const friendId = conversation.members.find((member) => member !== currentUser);
    getUser(friendId);
  }, [currentUser, conversation]);

  // Concatenate first and last names with a space in between
  const fullName = `${user?.firstName} ${user?.lastName}`;

  // Check if the friend's name includes the searchTerm
  if (
    searchTerm &&
    user &&
    !fullName.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    return null; // If not, don't render this conversation when searching
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      padding="1rem"
      cursor="pointer"
      sx={{
        "&:hover": {
          backgroundColor: palette.background.default,
        },
        cursor: "pointer",
      }}
    >
      {user ? (
        <UserImage image={user.picturePath} size="55px" />
      ) : (
        <Box
          width="55px"
          height="55px"
          backgroundColor={palette.background.default}
          borderRadius="50%"
        />
      )}
      <Box marginLeft="1rem">
        {user ? (
          <>
            <Typography
              color={mainColor}
              variant="h6"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: secondaryColor,
                },
                display: "block", // Ensures proper spacing and alignment
              }}
            >
              {fullName}
            </Typography>
            <Typography color={mediumColor} fontSize="0.75rem">
              {/* Additional user details if needed */}
            </Typography>
          </>
        ) : (
          <Typography color={mediumColor} fontSize="0.75rem">
            Loading user data...
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Conversation;
