import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { logFailure, logSuccess } from "../utils/Logging.js";
import JwtService from "../jwt/JwtService.js";

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
    logFailure(err);
    return res.status(500).json({
      status: 500,
      message: "ERROR",
    });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }

    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res.status(404).json({
        status: 404,
        message: "invalid password",
      });
    }

    const token = JwtService.generateToken(user);

    return res.status(200).json({
      status: 200,
      message: "success",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    logFailure(err);
    return res.status(500).json({
      status: 500,
      message: "ERROR",
    });
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const data = await User.findAll();

    if (!data || data.length === 0) {
      return res.status(200).json({
        message: "no users",
      });
    }

    const users = data.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }));

    return res.status(200).json({
      status: 200,
      message: "users retrieved",
      users,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: "ERROR",
    });
  }
};
