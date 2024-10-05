import { body } from "express-validator";
import { createUser } from "../controller/UserController.js";
import express from "express";

const userRoutes = express.Router();

const validateUserCreation = [
  body("email").notEmpty().withMessage("please enter your email"),
  body("password").notEmpty().withMessage("please enter your password"),
];

userRoutes.post("/create-user", validateUserCreation, createUser);

export default userRoutes;
