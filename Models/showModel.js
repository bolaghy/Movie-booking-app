const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theater_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
  show_time: { type: Date, required: true },
  available_seats: { type: Number, required: true },
});

module.exports = mongoose.model('Show', showSchema);