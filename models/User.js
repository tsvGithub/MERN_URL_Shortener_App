const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  password: String,
  // links: [{ type: Types.ObjectId, ref: "Link" }],
  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
    },
  ],
});
module.exports = mongoose.model("User", UserSchema);
