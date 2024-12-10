import { Request, Response } from "express";
import dbServices from "../services/dbservices";

export default class Chat {
  // Get last 5 user chats
  static getLast5UserChats = async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId;
      const chats = await dbServices.Chat.getLast5ChatsByUserId(userId);
      res.status(200).json({ status: true, chats });
    } catch (error) {
      console.error("Error fetching chats:", error);
      res.status(500).json({ status: false, error: "Internal Server Error" });
    }
  };

  // Get chat by ID
  static getChatById = async (req: Request, res: Response) => {
    try {
      const chatId = parseInt(req.params.chatId);
      const chat = await dbServices.Chat.getChatById(chatId);
      if (chat) {
        res.status(200).json({ status: true, chat });
      } else {
        res.status(404).json({ status: false, message: "Chat not found" });
      }
    } catch (error) {
      console.error("Error fetching chat by ID:", error);
      res.status(500).json({ status: false, error: "Internal Server Error" });
    }
  };
}
