import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";

const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "5991",
  });

  try {
    await connection.query("CREATE DATABASE IF NOT EXISTS file_server");
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

    const sequelize = new Sequelize("file_server", "root", "5991", {
      host: "localhost",
      dialect: "mysql",
    });

    console.log("connected to database successfully");
    return sequelize;
  } catch (error) {
    console.error("error initializing database: " + error.message);
  }
};

export const sequelize = await initSequelize();
