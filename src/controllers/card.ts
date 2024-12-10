import { Request, Response } from "express";
import dbServices from "../services/dbservices";

export default class Card {
  // Get all cards
  static getAllCards = async (req: Request, res: Response) => {
    try {
      const cards = await dbServices.Card.getAllCards();
      res.status(200).json({ status: true, cards });
    } catch (error) {
      console.error("Error fetching cards:", error);
      res.status(500).json({ status: false, error: "Internal Server Error" });
    }
  };

  // Get card by ID
  static getCardById = async (req: Request, res: Response) => {
    try {
      const cardId = parseInt(req.params.cardId);
      const card = await dbServices.Card.getCardById(cardId);
      if (card) {
        res.status(200).json({ status: true, card });
      } else {
        res.status(404).json({ status: false, message: "Card not found" });
      }
    } catch (error) {
      console.error("Error fetching card by ID:", error);
      res.status(500).json({ status: false, error: "Internal Server Error" });
    }
  };
}
