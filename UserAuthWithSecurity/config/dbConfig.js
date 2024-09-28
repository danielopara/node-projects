import { Sequelize } from "sequelize";
import mysql from "mysql2/promise"; // Importing mysql2 to create database if it doesn't exist

// Function to create the database if it doesn't exist
const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "5991",
  });

  try {
    await connection.query("CREATE DATABASE IF NOT EXISTS modelSecurity");
    console.log("Database created or already exists!");
  } catch (error) {
    console.error("Error creating database:", error.message);
    throw error; // Throwing error so we can stop further execution if the database is not created
  } finally {
    await connection.end();
  }
};

// First create the database, then initialize Sequelize
const initSequelize = async () => {
  try {
    // Create the database if it doesn't exist
    await createDatabase();

    // Initialize Sequelize with the new or existing database
    const sequelize = new Sequelize("modelSecurity", "root", "5991", {
      host: "localhost",
      dialect: "mysql",
    });

    console.log("Connected to the database successfully!");
    return sequelize;
  } catch (error) {
    console.error("Failed to initialize Sequelize:", error.message);
  }
};

// Call the initSequelize function to initialize
export const sequelize = await initSequelize();
