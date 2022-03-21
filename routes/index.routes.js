const router = require("express").Router();
const authRoutes = require("./auth.routes");
const playlistRoutes = require("./playlist.routes");
const friendsRoutes = require("./friends.routes");
const favouritesRoutes = require("./favourites.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/playlist", playlistRoutes);
router.use("/friends", friendsRoutes);
router.use("/favourites", favouritesRoutes);

module.exports = router;
