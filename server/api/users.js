const router = require("express").Router();
const {
  models: { User },
  models: { Movie },
  models: { Book },
  models: { Tv },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "firstName", "lastName", "bio", "image"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [Movie, Book, Tv, { model: User, as: "friend" }],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.id);
    await user.update(req.body);
    user = await User.findByPk(req.params.id, {
      include: [Movie, Book, Tv, { model: User, as: "friend" }],
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json(user);
  } catch (error) {
    next(error);
  }
});
