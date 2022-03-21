const router = require("express").Router();
const {
  addFavouriteProcess,
  enlistFavouritesProcess,
  dropMovieProcess,
} = require("../controllers/favourites.controller");
const { verifyToken } = require("../middleware/util.mid");

/*
RUTAS NECESARIAS
1) AÑADIR PELÍCULA A FAVORITAS
2) ENLISTAR FAVORITAS
3) ELIMINAR PELÌCULA DE FAVORITAS
*/

router.post("/addMovie", verifyToken, addFavouriteProcess);

router.get("/", verifyToken, enlistFavouritesProcess);

router.post("/dropMovie", verifyToken, dropMovieProcess);

module.exports = router;
