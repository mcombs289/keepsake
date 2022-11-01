const router = require("express").Router();
const {
  models: { Review },
} = require("../db");
const User = require("../db/models/User");
const Movie = require("../db/models/Movie");
const Book = require("../db/models/Book");
const Tv = require("../db/models/Tv");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: [User, Movie, Book, Tv] });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Review.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.get("/tv/:tvId", async (req, res, next) => {
  try {
    const tvReviews = await Review.findAll({
      where: {
        tvId: req.params.tvId,
      },
      include: [User],
    });
    res.json(tvReviews);
  } catch (error) {
    next(error);
  }
});

router.get("/movie/:movieId", async (req, res, next) => {
  try {
    const movieReviews = await Review.findAll({
      where: {
        movieId: req.params.movieId,
      },
      include: [User],
    });
    res.json(movieReviews);
  } catch (error) {
    next(error);
  }
});

router.get("/book/:bookId", async (req, res, next) => {
  try {
    const bookReviews = await Review.findAll({
      where: {
        bookId: req.params.bookId,
      },
      include: [User],
    });
    res.json(bookReviews);
  } catch (error) {
    next(error);
  }
});

router.get("/avgStarTv/:tvId", async (req, res, next) => {
  try {
    const averageTvRating = await Review.findTvAvgRating(req.params.tvId);
    res.json(averageTvRating);
  } catch (error) {
    next(error);
  }
});

router.get("/avgStarMovie/:movieId", async (req, res, next) => {
  try {
    const averageMovieRating = await Review.findMovieAvgRating(
      req.params.movieId
    );
    res.json(averageMovieRating);
  } catch (error) {
    next(error);
  }
});

router.get("/avgStarBooks/:bookId", async (req, res, next) => {
  try {
    const averageBookRating = await Review.findBookAvgRating(req.params.bookId);
    res.json(averageBookRating);
  } catch (error) {
    next(error);
  }
});
