const User = require("../model/User");
const log = require("../util/LogTime");

// Create a user
const createUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const data = await User.create({ firstName, lastName, email, password });

    log.logSuccess(`User created successfully: ${data.email}`);
    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      user: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: "User not created",
      error: err.message,
    });
  }
};

// Get all users
const getUser = async (req, res, next) => {
  try {
    const data = await User.findAll();

    if (!data || data.length === 0) {
      return res.status(200).json({
        status: 200,
        response: "No users found",
      });
    }

    const response = data.map((result) => ({
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
    }));

    return res.status(200).json({
      status: 200,
      message: "Users retrieved",
      response,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const response = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return res.status(200).json({
      status: 200,
      message: "User found",
      response,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  createUser,
  getUser,
  getUserById,
};
