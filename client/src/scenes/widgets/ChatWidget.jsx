// ChatWidget.js
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Divider, TextField, Button } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import Msg from "components/Msg";
import ChatMenu from "components/ChatMenu";
import { useEffect } from "react";

const ChatWidget = () => {
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [recId, setRecId] = useState(null);
  const scrollRef = useRef();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: _id,
      text: messageInput,
    };
    try {
      const res = await fetch("http://localhost:3001/messages/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Specify content type
        },
        body: JSON.stringify(message), // Convert message object to JSON string
      });

      if (!res.ok) {
        throw new Error(`Failed to send message: ${res.status}`);
      }

      const newMessage = await res.json(); // Await the JSON parsing
      setMessages([...messages, newMessage]);
      setMessageInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const onSelectConversation = (selectedConversation) => {
    setCurrentChat(selectedConversation);
    setRecId(selectedConversation.members.find((member) => member !== _id));
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/messages/${currentChat?._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setMessages(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <WidgetWrapper m={"2rem 6rem"} height="70vh" position={"relative"}>
      <FlexBetween gap={"1.5rem"} flexDirection="column" height={"100%"}>
        <Box
          display={"grid"}
          gridTemplateColumns={"20% 1px 80%"}
          width={"100%"}
          gap={"0.5rem"}
          height={"100%"}
        >
          <Box gridColumn="1" height="100%">
            <ChatMenu
              userId={_id}
              onSelectConversation={onSelectConversation}
            />
          </Box>
          <Divider orientation="vertical" flexItem />

          <Box
            gridColumn="3"
            height="100%"
            display="flex"
            flexDirection="column"
            style={{ overflowY: "auto" }} // Set overflow to auto for messages
          >
            <Box
              style={{ flex: 1, minHeight: 0, overflowY: "auto" }}
              // Add this style to make the messages scroll
            >
              {currentChat ? (
                <>
                  <Box>
                    {messages.map((m) => (
                      <div key={m._id} ref={scrollRef}>
                        <Msg
                          recId={recId}
                          message={m}
                          isSender={m.sender === _id}
                        />
                      </div>
                    ))}
                  </Box>
                </>
              ) : (
                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                  fontSize={"2rem"}
                  sx={{ textAlign: "center", color: "gray" }}
                  height={"100%"}
                >
                  Open a conversation
                </Box>
              )}
            </Box>
            {/* Input field and send button inline */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p="1rem" // Add padding for spacing
              position="sticky"
              bottom="0"
            >
              <TextField
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevents the default behavior (e.g., adding a newline)
                    handleSendMessage(e);
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                variant="contained"
                color="primary"
                sx={{
                  padding: "0.4rem",
                  marginLeft: "0.5rem",
                  minHeight: "45px",
                }}
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
