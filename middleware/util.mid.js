const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

//Midellware
exports.verifyToken = (req, res, next) => {
  const { headload, signature } = req.cookies;

  if (!headload || !signature)
    return res.status(401).json({ errorMessage: "Unauthorized" });

  jwt.verify(`${headload}.${signature}`, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    User.findById(decoded.userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        res.status(401).json({ errorMessage: "Token invalido.", error });
      });
  });
};

//Util/Helper
exports.createJWT = (user) => {
  return jwt
    .sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    )
    .split(".");
};

exports.cleanRes = (data) => {
  const { password, __v, updatedAt, ...cleanedData } = data;
  return cleanedData;
};
