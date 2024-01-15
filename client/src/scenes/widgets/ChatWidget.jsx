import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Divider, TextField, Button } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import ChatMenu from "components/ChatMenu";
import Msg from "components/Msg";

const ChatWidget = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    console.log("Sending message:", messageInput);
    setMessageInput('');
  };

  return (
    <WidgetWrapper m={"2rem 6rem"}>
      <FlexBetween gap={"1.5rem"}>
        <Box display={"grid"} gridTemplateColumns={"20% 1px 80%"} width={"100%"} gap={"0.5rem"}>
          <Box gridColumn="1">
            <ChatMenu userId={_id} />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box gridColumn="3" height={"100%"} display="flex" flexDirection="column">
            <Box flex="1" overflow="auto">
              <Msg message={"message"} />
              <Msg message={"message"} isSender={true} />
            </Box>
            {/* Input field and send button inline */}
            <Box display="flex" alignItems="center">
              <TextField
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                fullWidth
              />
              <Button
                onClick={handleSendMessage}
                variant="contained"
                color="primary"
                sx={{ padding: '0.9rem', margin:"0.4rem 0.5rem" }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default ChatWidget;
