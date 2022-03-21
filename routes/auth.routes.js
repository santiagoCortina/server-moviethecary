const router = require("express").Router();
const {
  signupProcess,
  loginProcess,
  logoutProcess,
  getUserLogged,
} = require("../controllers/auth.controller");

const { verifyToken } = require('../middleware/util.mid')

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Session = require("../models/Session.model");



router.post("/signup", signupProcess);

router.post("/login", loginProcess);

router.post("/logout", logoutProcess);

router.get('/getUser', verifyToken, getUserLogged);

module.exports = router;
