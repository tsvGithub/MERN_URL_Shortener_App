const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: "Link" }],
});
module.exports = model("User", UserSchema);
