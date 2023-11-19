import {
  pgTable,
  pgEnum,
  serial,
  text,
  integer,
  foreignKey,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";
export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);

export const products = pgTable("products", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
});

export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  adress: text("adress").notNull(),
  product: integer("product")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export type Supplier = typeof suppliers.$inferSelect;
