const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const playlistSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "La playlist tiene que ir asignada al usuario"],
    },

    title: {
      type: String,
      required: [true, "Tu playlist debe de tener un titulo"],
    },

    _movies: {
      type: [{
        id:Number,
        title:String,
        overview:String,
        poster_path:String,
        release_date:String,
        vote_average:Number
      }],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Playlist = model("Playlist", playlistSchema);

module.exports = Playlist;
