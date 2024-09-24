const express = require("express");
const userController = require("../controller/UserController");
const router = express.Router();

router.post("/create", userController.createUser);
router.get("/users", userController.getUser);

module.exports = router;
