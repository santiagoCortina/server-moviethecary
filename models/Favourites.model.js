const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const favouriteSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [
        true,
        "La lista de favoritos tiene que ir asignada al usuario",
      ],
    },

    _movies: {
      type: [
        {
          id: Number,
          title: String,
          overview: String,
          poster_path: String,
          release_date: String,
          vote_average: Number,
        },
      ],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Fav = model("Fav", favouriteSchema);

module.exports = Fav;
