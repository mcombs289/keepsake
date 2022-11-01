const router = require("express").Router();
const {
  models: { Tv, Review, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await Tv.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Tv.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const tv = await Tv.findByPk(req.params.id, {
      include: {
        model: Review,
        include: [User],
      },
    });
    res.json(tv);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const tv = await Tv.findByPk(req.params.id);
    await tv.destroy();
    res.json(tv);
  } catch (error) {
    next(error);
  }
});
