const express = require("express");
const userController = require("../controller/UserController");
const router = express.Router();

router.post("/create", userController.createUser);

router.get("/users", userController.getUser);
router.get("/user/:firstName", userController.getUserByFirstName);
router.get("/user/:id", userController.getUserById);

router.put("/update-user/:id", userController.updateUserById);

module.exports = router;
