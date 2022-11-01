const Sequelize = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Review.findTvAvgRating = async function (tvId) {
  const tvReviews = await this.findAll({
    where: {
      tvId: tvId,
    },
  });
  const averageTvRating =
    tvReviews.reduce((accum, current) => {
      return (accum += current.rating);
    }, 0) / tvReviews.length;
  return averageTvRating;
};

Review.findMovieAvgRating = async function (movieId) {
  const movieReviews = await this.findAll({
    where: {
      movieId: movieId,
    },
  });
  const averageMovieRating =
    movieReviews.reduce((accum, current) => {
      return (accum += current.rating);
    }, 0) / movieReviews.length;
  return averageMovieRating;
};

Review.findBookAvgRating = async function (bookId) {
  const bookReviews = await this.findAll({
    where: {
      bookId: bookId,
    },
  });
  const averageBookRating =
    bookReviews.reduce((accum, current) => {
      return (accum += current.rating);
    }, 0) / bookReviews.length;
  return averageBookRating;
};

module.exports = Review;
