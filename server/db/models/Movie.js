const Sequelize = require("sequelize");
const db = require("../db");

const Movie = db.define("movie", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
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
      "https://media.istockphoto.com/vectors/poster-template-with-retro-banner-design-for-presentation-concert-vector-id996101744?b=1&k=20&m=996101744&s=612x612&w=0&h=fHQFQ0stKZm0yagV9i0aYUdH2Wje-Js19-AqRSxhZ3k=",
    validate: {
      notEmpty: true,
    }
  },
  productType: {
    type: Sequelize.STRING,
    defaultValue: "movie",
  },
});

module.exports = Movie;
