import React, { useState, useEffect } from "react";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import ChatWidget from "scenes/widgets/ChatWidget";

const ChatsPage = () => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const userId = _id;

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <ChatWidget />
    </Box>
  );
};

export default ChatsPage;
