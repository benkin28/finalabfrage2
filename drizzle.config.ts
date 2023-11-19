import { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: String(process.env.NODE_DATABASE_URL),
  },
} satisfies Config;
