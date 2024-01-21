import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import Msg from "components/Msg";
import ChatMenu from "components/ChatMenu"

const MobileChatWidget = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    console.log("Sending message:", messageInput);
    setMessageInput('');
  };

  return (
    <WidgetWrapper m={"2rem 1rem"}>
      <ChatMenu userId={_id} />
      <Box height={"100%"} display="flex" flexDirection="column">
        <Box flex="1" overflow="auto">
          <Msg message={"message"} />
          <Msg message={"message"} isSender={true} />
        </Box>
        {/* Input field and send button stacked for mobile */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            fullWidth
            marginBottom="1rem"
          />
          <Button
            onClick={handleSendMessage}
            variant="contained"
            color="primary"
            sx={{ padding: '0.9rem', margin: "0.4rem 0.5rem" }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default MobileChatWidget;
