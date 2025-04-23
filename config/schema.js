
const { pgTable, serial, varchar, text, integer, boolean } = require("drizzle-orm/pg-core");

export const Jsonforms = pgTable("Jsonforms", {
  id: serial("id").primaryKey(),
  jsonfrom: text("jsonforms").notNull(),  
  createdBy: varchar("CreatedBy", { length: 255 }).notNull(),
  createdAt: varchar("CreatedAt", { length: 255 }).notNull(),
  theme: varchar('theme'),
  backGround: varchar('backGround'),
  
  enableUser: boolean("enableUser").default(false),
});

export const UserResponses = pgTable("UserResponses", {
  id: serial("id").primaryKey(),
  jsonResponse: text("jsonResponse").notNull(),
  createdBy: varchar("CreatedBy", { length: 255 }).default("Unknown"), 
  createdAt: varchar("CreatedAt", { length: 255 }).notNull(),
  formRef: integer("formRef").references(() => Jsonforms.id)
});