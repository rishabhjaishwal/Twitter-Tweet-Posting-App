const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    activeStatus: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false },
);

/**
 * @description Used before user model save operation
 */
userSchema.pre('save', function (next) {
  try {
    const user = this;
    if (user.password) {
      const isHash = bcrypt.getRounds(user.password);
      if (!isHash) {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
      }
      next();
    } else {
      next();
    }
  } catch (err) {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
