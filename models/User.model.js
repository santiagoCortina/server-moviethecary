const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: String,

    email: {
      type: String,
      required: [true, "Por favor incluye un email"],
      unique: [true, "Credenciales incorrecta, email invalido"],
    },

    password: {
      type: String,
      required: [true, "El password es requerido"],
    },

    profile_pic: {
      type: String,
      default:
        "https://res.cloudinary.com/dhgfid3ej/image/upload/v1558806705/asdsadsa_iysw1l.jpg",
    },

    playlists: {
      type: [Schema.Types.ObjectId],
      ref: "Playlist",
    },

    friends: {
      type: [Schema.Types.ObjectId],
      ref: "Friends",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
