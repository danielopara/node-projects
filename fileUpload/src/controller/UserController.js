import { User } from "../models/UserModel.js";
import { sequelize } from "../config/DbConfig.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create(
      {
        email,
        password: hashedPassword,
      },
      { transaction }
    );

    await transaction.commit();

    console.log(`user created successfully`);
    return res.status(201).json({
      status: 201,
      message: "User created successfully",
    });
  } catch (err) {
    await transaction.rollback();

    console.error(`ERROR : ${err}`);
    next(err);
    return res.status(500).json({
      status: 500,
      message: "error creating user password",
    });
  }
};
