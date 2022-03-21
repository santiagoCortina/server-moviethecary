// LO VOY A DEJAR CON EL NOMBRE DE FRIENDS PERO MEJOR SON PERSONAS A LAS QUE SIGUES
const router = require("express").Router();
const {
  addFriendProcess,
  enlistFriendsProcess,
  deleteFriendProcess,
  findFriendProcess,
} = require("../controllers/friends.controller");
const { verifyToken } = require("../middleware/util.mid");

/*
RUTAS NECESARIAS
1) SEGUIR PERSONA
2) DEJAR DE SEGUIR PERSONA
3) ENLISTAR PERSONAS SEGUIDAS
4) BUSCAR PERSONAS
*/

// SEGUIR PERSONA
router.post("/addFriend", verifyToken, addFriendProcess);

// DEJAR DE SEGUIR PERSONA
router.post("/deleteFriend", verifyToken, deleteFriendProcess);

// ENLISTAR PERSONAS SEGUIDAS
router.get("/", verifyToken, enlistFriendsProcess);

// BUSCAR PERSONAS
router.post("/searchFriends", verifyToken, findFriendProcess);

module.exports = router;
