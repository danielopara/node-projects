import { sequelize } from "../config/DbConfig.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "email must not be empty",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password must not be empty",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        user.email = user.email.toLowerCase();
      },
    },
  }
);
