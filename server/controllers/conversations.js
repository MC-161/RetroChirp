import Conversation from "../models/Conversation.js";

/* CREATE */
export const createConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* READ */
export const getConversationsOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getConversationBetweenUsers = async (req, res) => {
  try {
    const { firstUserId, secondUserId } = req.params;
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get friends without a conversation for a user
export const getFriendsWithoutConversation = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get conversations for the user
    const userConversations = await Conversation.find({
      members: userId,
    });

    // Extract friend IDs from the conversations
    const friendsInConversations = userConversations.reduce(
      (friends, conversation) => [...friends, ...conversation.members],
      []
    );

    // Get all friends for the user
    const allFriends = await Friend.find({
      _id: { $ne: userId }, // Exclude the user itself
    });

    // Filter out friends who are in any conversation
    const friendsWithoutConversation = allFriends.filter(
      (friend) => !friendsInConversations.includes(friend._id.toString())
    );

    res.json(friendsWithoutConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
