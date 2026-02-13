import mysql from "mysql2/promise";
import { config } from "./config/config";

export const db = mysql.createPool(config.db);
