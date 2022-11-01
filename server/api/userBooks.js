const router = require("express").Router();
const {
  models: { User_Book },
} = require("../db");
module.exports = router;

router.get("/favoriteBook/:userId", async (req, res, next) => {
  try {
    const books = await User_Book.findOne({
      where: {
        userId: req.params.userId,
        favorite: true,
      },
    });
    res.json(books);
  } catch (err) {
    next(err);
  }
});

router.get("/savedBooks/:userId", async (req, res, next) => {
  try {
    const books = await User_Book.findOne({
      where: {
        userId: req.params.userId,
        status: "Saved",
      },
    });
    res.json(books);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/:bookId", async (req, res, next) => {
  try {
    const userBook = await User_Book.findOne({
      where: {
        userId: req.params.userId,
        bookId: req.params.bookId,
      },
    });
    res.json(userBook);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId/:bookId", async (req, res, next) => {
  try {
    const userBook = await User_Book.findOne({
      where: {
        userId: req.params.userId,
        bookId: req.params.bookId,
      },
    });
    res.send(await userBook.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await User_Book.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId/:bookId", async (req, res, next) => {
  try {
    const userBook = await User_Book.findOne({
      where: {
        userId: req.params.userId,
        bookId: req.params.bookId,
      },
    });
    await userBook.destroy();
    res.send(userBook);
  } catch (error) {
    next(error);
  }
});
