import express from "express";
import controllers from "../controllers";
import validators from "../validators";
import { authenticateUser } from "../middleware";
const router = express.Router();

router.get("/all", controllers.Chat.getLast5UserChats);
router.get("/:chatId", controllers.Chat.getChatById);

export default router;
