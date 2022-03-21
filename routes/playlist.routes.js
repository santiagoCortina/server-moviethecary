const router = require("express").Router();
// const Playlist = require("../models/Playlist.model");
const {
  createProcess,
  enlistProcess,
  detailProcess,
  deleteProcess,
  updateProces,
  updateDeleteProcess,
} = require("../controllers/playlist.controller");
const { updateMany } = require("../models/Playlist.model");
const { verifyToken } = require("../middleware/util.mid");

/*

RUTAS NECESARIAS DE PLAYLISTS:
1) ENLISTAR LISTAS
2) CREAR LISTA
3) BORRAR LISTA
4) DETALLE DE UNA LISTA
5) ACTUALIZAR UNA LISTA
6) ACTUALIZAR ELIMINAR ELEMENTO DE LISTA

*/

// CREAR PLAYLIST
router.post("/create", verifyToken, createProcess);

//ENLISTAR LISTAS
router.get("/", verifyToken, enlistProcess);

// DETALLE DE UNA PLAYLIST
router.get("/detail/:playlist_id", verifyToken, detailProcess);

// BORRAR LISTA
router.delete("/delete/:playlist_id", verifyToken, deleteProcess);

// ACTUALIZAR LISTA
router.post("/update", verifyToken, updateProces);

// ACTUALIZAR BORRAR ELEMENTO DE LISTA
router.post("/updateDelete/:playlist_id", verifyToken, updateDeleteProcess);

module.exports = router;
