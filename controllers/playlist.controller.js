const { json } = require("express/lib/response");
const Playlist = require("../models/Playlist.model");

exports.createProcess = (req, res, next) => {
  const playlist = { ...req.body };
  Playlist.create(playlist)
    .then((result) => res.status(200).json({ result }))
    .catch((err) => res.status(400).json({ errorMessage: err }));
};

exports.enlistProcess = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user_id = _id;
    const result = await Playlist.find({
      _user: user_id,
    });
    return res.status(200).json({ result });
  } catch (err) {
    console.log("EL ERROR:", err);
    return res.status(400).json({ errorMessage: err });
  }
};

exports.detailProcess = async (req, res, next) => {
  try {
    const { playlist_id } = req.params;
    const result = await Playlist.findById(playlist_id);
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ errorMessage: err });
  }
};

exports.deleteProcess = async (req, res, next) => {
  try {
    const { playlist_id } = req.params;
    await Playlist.findByIdAndDelete(playlist_id);
    return res.status(200).json({ result: "Playlist deleted successfully" });
  } catch (err) {
    return res.status(400).json({ errorMessage: err });
  }
};

exports.updateProces = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const playlist_id = data.id;
    const newMovie = data._movies;
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlist_id,
      { $push: { _movies: newMovie } },
      { new: true }
    );
    return res.status(200).json({
      result: "Playlist updated successfully",
    });
  } catch (err) {
    return res.status(400).json({ errorMessage: err });
  }
};

exports.updateDeleteProcess = async (req, res, next) => {
  try {
    const { playlist_id } = req.params;
    const { movie_id } = req.body;
    const found = await Playlist.findOne({ _id: playlist_id });
    const index = found._movies.findIndex((item) => item.id === movie_id);
    if (index != -1) {
      found._movies.splice(index, 1);
      const playlist = await Playlist.findByIdAndUpdate(
        found._id,
        { ...found },
        { new: true }
      );
      return res.status(200).json({ result: "Movie deleted successfully" });
    } else {
      return res
        .status(200)
        .json({ result: "The movie was not in the playlist" });
    }
  } catch (err) {
    return res.status(400).json({ errorMessage: err });
  }
};
