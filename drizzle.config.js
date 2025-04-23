import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./config/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_0uhnxpXd1rTU@ep-old-wave-a42233l5-pooler.us-east-1.aws.neon.tech/QuickForms%20AI?sslmode=require',
  }
});
