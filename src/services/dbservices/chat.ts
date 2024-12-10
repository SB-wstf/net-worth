import postgresdb from "../../config/db";
import { cards, chats, users, questions, answers } from "../../models/schema";
import { eq, desc } from "drizzle-orm";

export default class Chat {
  // Get last 5 chats by user ID
  static getLast5ChatsByUserId = async (userId: number): Promise<any> => {
    try {
      const last5Chats = await postgresdb
        .select({
          chatId: chats.id,
          question: questions.question,
          answer: answers.answer,
          createdAt: chats.createdAt,
        })
        .from(chats)
        .leftJoin(questions, eq(chats.questionId, questions.id))
        .leftJoin(answers, eq(chats.answerId, answers.id))
        .where(eq(chats.userId, userId))
        .orderBy(desc(chats.createdAt))
        .limit(5);
      return last5Chats;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch last 5 chats");
    }
  };

  // Get chat by ID
  static getChatById = async (chatId: number): Promise<any> => {
    try {
      const chat = await postgresdb
        .select({
          chatId: chats.id,
          question: questions.question,
          answer: answers.answer,
          user: {
            id: users.id,
            name: users.name,
            email: users.email,
          },
          createdAt: chats.createdAt,
        })
        .from(chats)
        .leftJoin(questions, eq(chats.questionId, questions.id))
        .leftJoin(answers, eq(chats.answerId, answers.id))
        .leftJoin(users, eq(chats.userId, users.id))
        .where(eq(chats.id, chatId));
      return chat.length > 0 ? chat[0] : null;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch chat by ID");
    }
  };
}
