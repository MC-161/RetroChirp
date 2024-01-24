// ChatMenu.js
import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Modal, Backdrop, Fade } from "@mui/material";
import Conversation from "components/Conversation";
import FriendListWidget from "scenes/widgets/FriendConversationWidget";
import { useSelector } from "react-redux";

const ChatMenu = ({ userId, onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFriendList, setShowFriendList] = useState(false);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

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

  const toggleFriendList = () => {
    setShowFriendList((prev) => !prev);
  };

  return (
    <Box height={"100%"} overflowy={"scroll"} gap={"1rem"}>
      <TextField
        placeholder="Search Friends"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="outlined" onClick={toggleFriendList} fullWidth>
        {showFriendList ? "Hide Friend List" : "Show Friend List"}
      </Button>
      <Modal
        open={showFriendList}
        onClose={toggleFriendList}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showFriendList}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: 24,
            }}
          >
            {/* Pass filtered friends to FriendListWidget */}
            <FriendListWidget userId={userId} conversations={conversations}/>
          </Box>
        </Fade>
      </Modal>
      <Box>
        {conversations.map((c) => (
          <div key={c._id} onClick={() => onSelectConversation(c)}>
            <Conversation
              conversation={c}
              currentUser={userId}
              searchTerm={searchTerm}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default ChatMenu;
