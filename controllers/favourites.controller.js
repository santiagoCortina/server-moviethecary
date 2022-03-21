const User = require("../models/User.model");
const Favourites = require("../models/Favourites.model");
const { getUserLogged } = require("./auth.controller");

exports.addFavouriteProcess = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { movie } = req.body;
    const found = await Favourites.findOne({ _user: _id });
    if (!found) {
      // AUN NO TIENE FAVORITAS, HAY QUE CREARLO Y AÑADIRLA
      const _movies = [];
      _movies.push(movie);
      console.log(_movies);
      await Favourites.create({ _user: _id, _movies });
      return res.status(200).json({
        result: "Lista de favoritas creada e inicializada correctamente",
      });
    } else {
      console.log(found._movies);
      if (found._movies.includes(movie)) {
        return res.status(400).json({ errorMessage: "Ya está en la lista" });
      } else {
        const favouritesList = await Favourites.findByIdAndUpdate(
          found._id,
          { $push: { _movies: movie } },
          { new: true }
        );
        return res
          .status(200)
          .json({ result: "Añadida a favoritos exitosamente" });
      }
    }
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.enlistFavouritesProcess = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const found = await Favourites.findOne({ _user: _id });
    if (!found) {
      return res
        .status(200)
        .json({ result: "Todavia no tienes peliculas favoritas" });
    } else {
      return res.status(200).json({ result: found._movies });
    }
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.dropMovieProcess = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { movie_id } = req.body;
    const found = await Favourites.findOne({ _user: _id });
    const index = found._movies.findIndex((item) => item.id === movie_id);
    if (index != -1) {
      found._movies.splice(index, 1);
      const favouritesList = await Favourites.findByIdAndUpdate(
        found._id,
        { ...found },
        { new: true }
      );
      return res
        .status(200)
        .json({ result: "Película eliminada de favoritos exitosamente" });
    } else {
      return res
        .status(200)
        .json({ result: "La pelicula no estaba en favoritos" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errorMessage: error });
  }
};
