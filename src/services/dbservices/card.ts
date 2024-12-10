import postgresdb from "../../config/db";
import { cards, chats, users, questions, answers } from "../../models/schema";
import { eq, desc } from "drizzle-orm";

export default class Card {
  // Get all cards
  static getAllCards = async (): Promise<any> => {
    try {
      const allCards = await postgresdb.select().from(cards);
      return allCards;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch cards");
    }
  };

  // Get card by ID
  static getCardById = async (cardId: number): Promise<any> => {
    try {
      const card = await postgresdb
        .select()
        .from(cards)
        .where(eq(cards.id, cardId));
      return card.length > 0 ? card[0] : null;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch card by ID");
    }
  };
}
