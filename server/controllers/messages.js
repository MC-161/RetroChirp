import Message from "../models/Message.js";

/* ADD */
export const addMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* GET */
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
