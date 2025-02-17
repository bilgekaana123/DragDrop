import { text, pgTable, uuid } from "drizzle-orm/pg-core";

export const note = pgTable("note", {
  id: uuid("id").defaultRandom().primaryKey(),
  body: text("body"),
  colors: text("colors").notNull(),
  position: text("position").notNull(),
});
