import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

// Cards table
export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(), // e.g., premium, debit, credit
});

// Owned Cards table
export const ownedCards = pgTable("owned_cards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  cardId: integer("card_id")
    .references(() => cards.id)
    .notNull(),
});

// Questions table
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 1024 }).notNull(),
});

// Answers table
export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  answer: varchar("answer", { length: 1024 }).notNull(),
});

// Chats table
export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id")
    .references(() => questions.id)
    .notNull(),
  answerId: integer("answer_id")
    .references(() => answers.id)
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").notNull(),
});

// Relations for users
export const usersRelations = relations(users, ({ many }) => ({
  ownedCards: many(ownedCards), // A user can own multiple cards
  chats: many(chats), // A user can have many chats
}));

// Relations for cards
export const cardsRelations = relations(cards, ({ many }) => ({
  ownedCards: many(ownedCards), // A card can be owned by many users
}));

// Relations for ownedCards
export const ownedCardsRelations = relations(ownedCards, ({ one }) => ({
  user: one(users, {
    fields: [ownedCards.userId],
    references: [users.id],
  }),
  card: one(cards, {
    fields: [ownedCards.cardId],
    references: [cards.id],
  }),
}));

// Relations for questions
export const questionsRelations = relations(questions, ({ many }) => ({
  chats: many(chats), // A question can have many chats
}));

// Relations for answers
export const answersRelations = relations(answers, ({ many }) => ({
  chats: many(chats), // An answer can have many chats
}));

// Relations for chats
export const chatsRelations = relations(chats, ({ one }) => ({
  question: one(questions, {
    fields: [chats.questionId],
    references: [questions.id],
  }),
  answer: one(answers, {
    fields: [chats.answerId],
    references: [answers.id],
  }),
  user: one(users, {
    fields: [chats.userId],
    references: [users.id],
  }),
}));
