import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please enter a first name",
        },
      },
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please enter a last name",
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "email already exists",
      },
      validate: {
        notEmpty: {
          msg: "please enter a valid email",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        user.firstName = user.firstName.toLowerCase();
        user.lastName = user.lastName.toLowerCase();
        user.email = user.email.toLowerCase();
      },

      beforeUpdate: (user) => {
        if (user.changed("firstName")) {
          user.firstName = user.firstName.toLowerCase();
        }
        if (user.changed("lastName")) {
          user.lastName = user.lastName.toLowerCase();
        }
        if (user.changed("email")) {
          user.email = user.email.toLowerCase();
        }
        if (user.changed("password")) {
          user.password = user.password.toLowerCase();
        }
      },
    },
  }
);
