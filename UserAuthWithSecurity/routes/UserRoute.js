import {
  createUser,
  loginUser,
  getAllUsers,
} from "../controllers/UserController.js";
import JwtService from "../jwt/JwtService.js";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/createUser", createUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/users", JwtService.verifyToken.bind(JwtService), getAllUsers);

export default userRoutes;
