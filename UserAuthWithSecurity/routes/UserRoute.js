import { createUser, loginUser } from "../controllers/UserController.js";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/createUser", createUser);
userRoutes.post("/login", loginUser);

export default userRoutes;
