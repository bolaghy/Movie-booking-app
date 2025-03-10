const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  genre: { type: String, required: true },
  poster: { type: String }, 
  trailer: { type: String },
  release_date: { type: Date, required: true },
  poster_url: { type: String },
});

module.exports = mongoose.model('Movie', movieSchema);