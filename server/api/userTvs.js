const router = require("express").Router();
const {
  models: { User_Tv },
} = require("../db");

router.get("/:userId/:tvId", async (req, res, next) => {
  try {
    const userTv = await User_Tv.findOne({
      where: {
        userId: req.params.userId,
        tvId: req.params.tvId,
      },
    });
    res.json(userTv);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId/:tvId", async (req, res, next) => {
  try {
    const userTv = await User_Tv.findOne({
      where: {
        userId: req.params.userId,
        tvId: req.params.tvId,
      },
    });
    res.send(await userTv.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await User_Tv.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId/:tvId", async (req, res, next) => {
  try {
    const userTv = await User_Tv.findOne({
      where: {
        userId: req.params.userId,
        tvId: req.params.tvId,
      },
    });
    await userTv.destroy();
    res.send(userTv);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
