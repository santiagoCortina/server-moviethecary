const User = require("../models/User.model");
const Friends = require("../models/Friends.model");
const { getUserLogged } = require("./auth.controller");

exports.addFriendProcess = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { email } = req.body;
    const found = await Friends.findOne({ _user: _id });
    if (!found) {
      // NO SE ENCONTRO UNA LISTA DE AMIGOS, HAY QUE CREARLA
      const _friends = [];
      _friends.push(email);
      await Friends.create({ _user: _id, _friends });
      return res.status(200).json({
        result: "Lista de amigos creada e inicializada correctamente.",
      });
    } else {
      // DEBERIA DE REVISAR SI YA ESTÁ EL AMIGO
      if (found._friends.includes(email)) {
        return res.status(400).json({ errorMessage: "YA SON AMIGOS" });
      } else {
        const friendsList = await Friends.findByIdAndUpdate(
          found._id,
          { $push: { _friends: email } },
          { new: true }
        );
        return res.status(200).json({ result: "Amigo añadido exitosamente." });
      }
    }
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.enlistFriendsProcess = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const found = await Friends.findOne({ _user: _id });
    if (!found) {
      return res.status(200).json({ result: "You do not follow anybody" });
    } else {
      return res.status(200).json({ result: found._friends });
    }
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.deleteFriendProcess = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { email } = req.body;
    const found = await Friends.findOne({ _user: _id });
    const index = found._friends.indexOf(email);
    if (index != -1) {
      const friendsList = await Friends.findByIdAndUpdate(
        found._id,
        { $pull: { _friends: { $in: [email] } } },
        { new: true }
      );
      return res.status(200).json({ result: "Friend deleted correctly" });
    } else {
      return res.status(200).json({ result: "No eran amigos" });
    }
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.findFriendProcess = async (req, res, next) => {
  try {
    const { email } = req.body;
    const users = await User.find({ email: { $regex: email, $options: "i" } });
    return res.status(200).json({ result: users });
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};
