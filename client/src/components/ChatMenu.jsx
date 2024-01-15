import FlexBetween from "./FlexBetween";
import { TextField } from "@mui/material";
import {Box} from "@mui/material";
import Conversation from "components/Conversation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import {useTheme} from "@mui/material";

const ChatMenu = ({userId}) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  
  const getFriends = async () => {
    
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <FlexBetween flexDirection={"column"} gap={"0.5rem"}>
      <TextField placeholder="Search Friends"/>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Conversation
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.platform}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </FlexBetween>
  );
}
 
export default ChatMenu;