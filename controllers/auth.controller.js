const User = require("../models/User.model.js");
// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// importar utils/middelware
const { createJWT, cleanRes } = require("../middleware/util.mid");

exports.signupProcess = (req, res, next) => {
  const { email, password, confirmPassword, ...rest } = req.body;

  //validaciones
  if (!email) {
    return res
      .status(400)
      .json({ errorMessage: "El correo es un campo obligatorio" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Tu contraseña debe de tener mas de 8 caracteres",
    });
  }

  if (password != confirmPassword) {
    return res
      .status(400)
      .json({ errorMessage: "Tus contraseñas no coinciden" });
  }

  User.findOne({ email }).then((found) => {
    if (found) {
      return res.status(400).json({ errorMessage: "El correo ya está en uso" });
    }
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        //Acá se crea el usuario
        return User.create({
          email,
          password: hashedPassword,
        })
          .then((user) => {
            //Acá se crea el JWT
            const [header, payload, signature] = createJWT(user);

            res.cookie("headload", `${header}.${payload}`, {
              maxAge: 1000 * 60 * 24,
              httpOnly: true,
              sameSite: true,
            });

            res.cookie("signature", signature, {
              httpOnly: true,
              sameSite: true,
            });

            const newUser = cleanRes(user.toObject());
            res.status(201).json({ user: newUser });
          })
          .catch((error) => {
            console.log(error);
            if (error instanceof mongoose.Error.ValidationError) {
              return res.status(400).json({ errorMessage: error.message });
            }
            if (error.code === 11000) {
              return res.status(400).json({
                errorMessage: "El nombre de usuario ya existe, escoger otro",
              });
            }
            return res.status(500).json({ errorMessage: error.message });
          });
      });
  });
};

exports.loginProcess = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errorMessage: "Credenciales erroneas!" });
    }

    const match = await bcrypt.compareSync(password, user.password);

    if (match) {
      const [header, payload, signature] = createJWT(user);

      res.cookie("headload", `${header}.${payload}`, {
        maxAge: 1000 * 60 * 24,
        httpOnly: true,
        sameSite: true,
      });

      res.cookie("signature", signature, {
        httpOnly: true,
        sameSite: true,
      });

      const newUser = cleanRes(user.toObject());
      res.status(200).json({ user: newUser });
    } else {
      res.status(400).json({ errorMessage: "Credenciales erróneas" });
    }
  } catch (err) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.logoutProcess = (req, res, next) => {
  res.clearCookie("headload");
  res.clearCookie("signature");
  res.status(200).json({ result: "Sesion cerrada exitosamente" });
};

exports.getUserLogged = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    const newUser = cleanRes(user.toObject());
    res.status(200).json({ user: newUser });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};
