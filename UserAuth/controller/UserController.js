const User = require("../model/User");
const log = require("../util/LogTime");

//create a user
const createUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  await User.create({ firstName, lastName, email, password })
    .then((data) => {
      log.logSuccess(`User created successfully: ${data.email}`);
      res.status(201).json({
        status: 201,
        message: "user created successfully",
        user: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "user not created",
        error: err.message,
      });
    });
};

//get a user
const getUser = async (req, res, next) => {
  await User.findAll()
    .then((data) => {
      const response = data.map((result) => ({
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
      }));
      res.status(200).json({
        status: 200,
        message: "users retrieved",
        response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        status: "400",
        message: err.message,
      });
    });
};

module.exports = {
  createUser,
  getUser,
};
