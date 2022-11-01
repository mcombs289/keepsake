const Sequelize = require("sequelize");
const db = require("../db");

const User_Movie = db.define("user_movie", {
  status: {
    type: Sequelize.ENUM(["Recommended", "Saved", "Watched"]),
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  featured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User_Movie;
