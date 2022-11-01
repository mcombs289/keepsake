const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/books", require("./books"));
router.use("/tvs", require("./tvs"));
router.use("/movies", require("./movies"));
router.use("/reviews", require("./reviews"));
router.use("/userBooks", require("./userBooks"));
router.use("/userMovies", require("./userMovies"));
router.use("/userTvs", require("./userTvs"));
router.use("/friends", require("./friends"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
