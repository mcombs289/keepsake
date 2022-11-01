const router = require("express").Router();
const {
  models: { User, Connection },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allConnections = await Connection.findAll();
    res.json(allConnections);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const friends = await Connection.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.json(friends);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/:friendId", async (req, res, next) => {
  try {
    const friends = await Connection.findAll({
      where: {
        userId: req.params.userId,
        friendId: req.params.friendId,
      },
    });
    res.json(friends);
  } catch (error) {
    next(error);
  }
});

router.post("/:userId/:friendId", async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.params.userId, {
      include: {
        model: User,
        as: "friend",
      },
    });
    await currentUser.addFriend(req.params.friendId);
    res.json(currentUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId/:friendId", async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.params.userId, {
      include: {
        model: User,
        as: "friend",
      },
    });
    await currentUser.removeFriend(req.params.friendId);
    res.json(currentUser);
  } catch (error) {
    next(error);
  }
});
