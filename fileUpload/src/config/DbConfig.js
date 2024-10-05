import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );
  } catch (error) {
    console.error("error creating database: ", error.message);
    throw error;
  } finally {
    await connection.end();
  }
};

const initSequelize = async () => {
  try {
    await createDatabase();

    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "mysql",
      }
    );
    console.log("connected to database successfully");
    return sequelize;
  } catch (error) {
    console.error("error initializing database: " + error.message);
  }
};

export const sequelize = await initSequelize();
