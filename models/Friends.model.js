const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const friendsSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "La lista tiene que ir asignada al usuario"],
    },

    _friends: {
      type: [String],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Friends = model("Friends", friendsSchema);

module.exports = Friends;
