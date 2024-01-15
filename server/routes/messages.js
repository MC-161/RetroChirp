import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getMessages, addMessage } from "../controllers/messages.js";
const router = express.Router();

/* ADD */
router.post("/", verifyToken, addMessage);

/* GET */
router.get("/:conversationId", verifyToken, getMessages);

export default router;
