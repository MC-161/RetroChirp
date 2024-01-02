import GamepadOutlinedIcon from '@mui/icons-material/GamepadOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { useTheme } from "@emotion/react";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { Box, Typography, Divider } from "@mui/material";
import { useEffect } from "react";
import { Instagram, Twitter } from "@mui/icons-material"



const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.primary.dark;
  const medium = palette.primary.second;
  const main = palette.primary.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    platform,
    game,
    viewedProfile,
    impressions,
    friends,
    twitter,
    instagram
  } = user;

  return (
    <WidgetWrapper>
      {/* user row */}
      <FlexBetween
        gap={"0.5rem"}
        pb={"1.1rem"}
        onClick={() => navigate(`/profile/${userId}`)}
        sx={{ cursor: "pointer" }}
      >
        <FlexBetween gap={"1rem"}>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={main}
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <GamepadOutlinedIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{platform}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <VideogameAssetOutlinedIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{game}</Typography>
        </Box>
      </Box>

      <Divider/>
      
      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Twitter fontSize='large'/>
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>@{twitter}</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <Instagram fontSize='large'/>
            <Box>
              <Typography color={main} fontWeight="500">
                Instagram
              </Typography>
              <Typography color={medium}>@{instagram}</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
