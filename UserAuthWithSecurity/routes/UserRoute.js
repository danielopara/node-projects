import { createUser } from "../controllers/UserController.js";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/createUser", createUser);

export default userRoutes;
