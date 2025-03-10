const express = require('express');
const router = express.Router();
const { createMovie, getAllMovies, getMovieById, 
    updateMovie, deleteMovie, 
    searchMovies, filterMoviesByGenre, 
    filterMoviesByYear, uploadPoster,uploadTrailer } = require('../Controllers/movieController');
    const upload = require('../Utils/multer');



// Create a new movie
router.post('/create-movie', createMovie);

// Get all movies (with filtering, sorting, and pagination)
router.get('/all-movies', getAllMovies);

// Get a single movie by ID
router.get('/movie/:id', getMovieById);

// Update a movie by ID
router.put('/update-movie/:id', updateMovie);

// Delete a movie by ID
router.delete('/delete-movie/:id', deleteMovie);

// Search movies by title
router.get('/movies/search', searchMovies);

// Filter movies by genre
router.get('/movies/filter/genre', filterMoviesByGenre);

// Filter movies by release year
router.get('/movies/filter/year', filterMoviesByYear);   
// Upload movie poster
router.post('/movies/poster/:movieId', upload.single('file'), uploadPoster);           
router.post('/movies/trailer/:movieId', upload.single('file'), uploadTrailer);     

module.exports = router;   