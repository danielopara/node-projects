import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("modelSecurity", "root", "5991", {
  host: "localhost",
  dialect: "mysql",
});
