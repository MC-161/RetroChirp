import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import ChatFriend from "components/ChatFriend";

const FriendListWidget = ({ userId, conversations}) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [chatFriends , setChatFriends] = useState(null)

  const getFriends = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));

    const friendsWithConversation = new Set();

    conversations.forEach((conversation) => {
      conversation.members.forEach((member) => {
        if (member !== userId) {
          friendsWithConversation.add(member);
        }
      });
    });

    const friendsWithoutConversation = friends.filter(
      (friend) => !friendsWithConversation.has(friend._id)
    );

    setChatFriends(friendsWithoutConversation);
  };

  useEffect(() => {
    getFriends();
  }, [userId, conversations, friends, token]); // Dependencies added

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {chatFriends?.map((friend) => (
          <ChatFriend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.platform}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;