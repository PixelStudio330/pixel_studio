import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,

  // Database
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "pixelx",
  },

  // JWT
  jwtSecret: process.env.JWT_SECRET || "supersecretkey123",
  jwtExpiresIn: "7d",

  // Email
  email: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
  },
};
