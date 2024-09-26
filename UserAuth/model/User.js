const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const { IsNotEmpty } = require("class-validator");

const User = sequelize.define(
  "User",
  {
    // @IsNotEmpty({message: "firstName cannot be empty"})
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "firstName cannot be empty",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "lastName cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
        user.password = user.password;
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
          user.password = user.password;
        }
      },
    },
  }
);

module.exports = User;
