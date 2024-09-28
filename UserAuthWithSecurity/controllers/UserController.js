import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { logFailure, logSuccess } from "../utils/Logging.js";
import {
  decryptPasswordAES,
  encryptPasswordAES,
} from "../config/SecurityConfig.js";

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const encryptedPassword = encryptPasswordAES(password);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(encryptedPassword, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    logSuccess("user created successfully", user);
    return res.status(201).json({
      status: 201,
      message: "user created successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    logSuccess(err);
    return res.status(500).json({
      status: 500,
      message: "ERROR",
    });
  }
};
