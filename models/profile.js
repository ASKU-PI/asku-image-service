const mongoose = require("mongoose");
const { Schema } = mongoose;

const Profile = new Schema({
  id: { type: String, required: true },
  photo: { url: String },
});

module.exports = mongoose.model("Profile", Profile);
