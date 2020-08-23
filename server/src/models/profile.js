const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    profilePic: { type: String },
    designation: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false },
);

const User = mongoose.model('profile', profileSchema);

module.exports = User;
