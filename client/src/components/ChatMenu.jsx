import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Modal, Backdrop, Fade } from "@mui/material";
import Conversation from "components/Conversation";
import FriendListWidget from "scenes/widgets/FriendConversationWidget";
import { useSelector } from "react-redux";

const ChatMenu = ({ userId, onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFriendList, setShowFriendList] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const token = useSelector((state) => state.token);

  // Access environment variables
  const apiUrl = process.env.REACT_APP_API_URL;

  const getConversations = async () => {
    try {
      const res = await fetch(`${apiUrl}/conversations/${userId}`, {
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

  const handleDeleteConversation = async (conversationId) => {
    try {
      const res = await fetch(`${apiUrl}/conversations/${conversationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete conversation: ${res.status}`);
      }

      setConversations((prevConversations) =>
        prevConversations.filter((conversation) => conversation._id !== conversationId)
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting conversation:", error.message);
    }
  };

  return (
    <Box>
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
            <FriendListWidget userId={userId} conversations={conversations}/>
          </Box>
        </Fade>
      </Modal>
      <div>
        {conversations.map((c) => (
          <div
            key={c._id}
            onClick={() => {
              onSelectConversation(c);
              setSelectedConversation(c);
            }}
            style={{
              cursor: "pointer",
              backgroundColor:
                selectedConversation && selectedConversation._id === c._id
                  ? "#f0f0f0"
                  : "transparent",
            }}
          >
            <Conversation
              conversation={c}
              currentUser={userId}
              searchTerm={searchTerm}
              onDeleteConversation={handleDeleteConversation}
            />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ChatMenu;
