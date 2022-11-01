const router = require("express").Router();
const {
  models: { User_Movie },
} = require("../db");

router.get("/favoriteMovie/:userId", async (req, res, next) => {
  try {
    const movies = await User_Movie.findOne({
      where: {
        userId: req.params.userId,
        favorite: true,
      },
    });
    res.json(movies);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/:movieId", async (req, res, next) => {
  try {
    const userMovie = await User_Movie.findOne({
      where: {
        userId: req.params.userId,
        movieId: req.params.movieId,
      },
    });
    res.json(userMovie);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId/:movieId", async (req, res, next) => {
  try {
    const userMovie = await User_Movie.findOne({
      where: {
        userId: req.params.userId,
        movieId: req.params.movieId,
      },
    });
    res.send(await userMovie.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await User_Movie.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId/:movieId", async (req, res, next) => {
  try {
    const userMovie = await User_Movie.findOne({
      where: {
        userId: req.params.userId,
        movieId: req.params.movieId,
      },
    });
    await userMovie.destroy();
    res.send(userMovie);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
