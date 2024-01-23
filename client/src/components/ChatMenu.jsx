// ChatMenu.js
import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import Conversation from "components/Conversation";
import { useSelector } from "react-redux";

const ChatMenu = ({ userId, onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);
  const token = useSelector((state) => state.token);

  const getConversations = async () => {
    try {
      const res = await fetch(`http://localhost:3001/conversations/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch conversations: ${res.status}`);
      }

      const conversations = await res.json();
      console.log(conversations);
      setConversations(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error.message);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <Box height={"100%"} overflowy={"scroll"} gap={"1rem"}>
      <TextField placeholder="Search Friends" variant="outlined" fullWidth />
      <Box>
        {conversations.map((c) => (
          <div key={c._id} onClick={() => onSelectConversation(c)}>
            <Conversation conversation={c} currentUser={userId} />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default ChatMenu;
