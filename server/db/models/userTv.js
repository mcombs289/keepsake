const Sequelize = require("sequelize");
const db = require("../db");

const User_Tv = db.define("user_tv", {
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

module.exports = User_Tv;
