const { Sequelize } = require("sequelize");

// using sequelize

const sequelize = new Sequelize("nodeUserAuth", "root", "5991", {
  host: "localhost",
  dialect: "mysql",
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("connection established");
  } catch (err) {
    console.log("unable to connect ", err);
  }
}

// testConnection();

module.exports = sequelize;
