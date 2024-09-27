import { User } from "../models/UserModel";
import bcrypt from "bcrypt";
import { logFailure, logSuccess } from "../utils/Logging";
import {
  decryptPasswordAES,
  encryptPasswordAES,
} from "../config/SecurityConfig";

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
  } catch (err) {
    logSuccess(err);
    return res.status(500).json({
      status: 500,
      message: "ERROR",
    });
  }
};
