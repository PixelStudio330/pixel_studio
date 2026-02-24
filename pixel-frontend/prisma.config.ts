import * as dotenv from 'dotenv';
import { defineConfig } from "@prisma/config";

// This manually forces the .env file to load
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // This tells Prisma: "Look at the DATABASE_URL in the .env file"
    url: process.env.DATABASE_URL,
  },
});