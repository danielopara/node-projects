import { sequelize } from "../config/DbConfig.js";
import { DataTypes } from "sequelize";

export const File = sequelize.define("files", {
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file: {
    type: DataTypes.BLOB("long"),
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
