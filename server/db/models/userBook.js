const Sequelize = require("sequelize");
const db = require("../db");

const User_Book = db.define("user_book", {
  status: {
    type: Sequelize.ENUM(["Recommended", "Saved", "Read"]),
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

module.exports = User_Book;
