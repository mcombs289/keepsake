const Sequelize = require("sequelize");
const db = require("../db");

const Book = db.define("book", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  genre: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://thebookcoverdesigner.com/wp-content/uploads/2019/05/Book-Cover-11aa.jpg",
    validate: {
      notEmpty:true,
    },
  },
  productType: {
    type: Sequelize.STRING,
    defaultValue: "book",
  },
});

module.exports = Book;
