const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImg: {
    type: String,
    required: true,
    default: "default_profile_image.jpg",
  }, //REMEMBER TO UPDATE IMG ADDRESS HERE
});

module.exports = mongoose.model("User", userSchema);
