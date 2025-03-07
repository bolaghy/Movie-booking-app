const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const salt = 10;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  created_at: { type: Date, default: Date.now },
});

// hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.comparePassword = async function (plaintextPassword) {
  return await bcrypt.compare(plaintextPassword, this.password);
};


module.exports = mongoose.model('User', userSchema);