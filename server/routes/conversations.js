import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getConversationsOfUser,
  getConversationBetweenUsers,
  createConversation,
  deleteConversation,
} from '../controllers/conversations.js';

const router = express.Router();

// Create
router.post('/', createConversation);

// Read
router.get('/:userId', verifyToken, getConversationsOfUser);
router.get('/find/:firstUserId/:secondUserId', verifyToken, getConversationBetweenUsers);

// Delete
router.delete('/:conversationId', verifyToken, deleteConversation);

export default router;
