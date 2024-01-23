import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getConversationsOfUser,
  getConversationBetweenUsers,
  createConversation,
  getFriendsWithoutConversation, // Import the new function
} from '../controllers/conversations.js';

const router = express.Router();

// Create
router.post('/', createConversation);

// Read
router.get('/:userId', verifyToken, getConversationsOfUser);
router.get('/find/:firstUserId/:secondUserId', verifyToken, getConversationBetweenUsers);
router.get('/friends-without-conversation/:userId', verifyToken, getFriendsWithoutConversation);

export default router;