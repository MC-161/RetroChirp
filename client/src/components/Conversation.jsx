import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { MoreVert as MoreVertIcon, Person as PersonIcon, Delete as DeleteIcon } from "@mui/icons-material";
import UserImage from "./UserImage";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Conversation = ({ conversation, currentUser, searchTerm, onDeleteConversation }) => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { palette } = useTheme();
  const mainColor = palette.primary.main;
  const secondaryColor = palette.secondary.main;
  const mediumColor = palette.text.secondary;
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const getUser = async (uid) => {
    try {
      const response = await fetch(`${apiUrl}/users/${uid}`, {
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

  const fullName = `${user?.firstName} ${user?.lastName}`;

  if (
    searchTerm &&
    user &&
    !fullName.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    return null;
  }

  const handleDelete = () => {
    onDeleteConversation(conversation._id);
  };

  const handleViewProfile = () => {
    navigate(`/profile/${user._id}`);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="1rem"
      cursor="pointer"
      sx={{
        "&:hover": {
          backgroundColor: palette.background.default,
        },
        cursor: "pointer",
      }}
    >
      <Box display="flex" alignItems="center" width={"60%"}>
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
                  display: "block",
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
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete Conversation" />
        </MenuItem>
        <MenuItem onClick={handleViewProfile}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Conversation;
