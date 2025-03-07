const mongoose = require('mongoose');
const Movie = require('../Models/moviesModel'); 
const movieJoiSchema = require('../Validators/movieValidator'); 

// Create a new movie
const createMovie = async (req, res) => {
  try {
    const { error } = movieJoiSchema.validate(req.body , { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ success: true, message: 'Movie created successfully', data: movie });
} catch (err) {
  res.status(500).json({ success: false, message: "Movie creation failed" ,error: err.message});
}
};

// Get all movies
const getAllMovies = async (req, res) => {
    try {
      // Parse query parameters for pagination, filtering, and sorting
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
      const skip = (page - 1) * limit; // Calculate the number of documents to skip
  
      // Filter by name (if provided)
      const nameFilter = req.query.name || ''; 
      const filter = nameFilter ? { title: { $regex: nameFilter, $options: 'i' } } : {};
  
      // Sort by name (if provided)
      const sortOrder = req.query.sort === 'desc' ? -1 : 1; // Default to ascending order if not provided
      const sort = { title: sortOrder };
  
      // Fetch movies with filtering, sorting, and pagination
      const movies = await Movie.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);
  
      // Get the total number of movies matching the filter for pagination metadata
      const totalMovies = await Movie.countDocuments(filter);
  
      // Calculate total pages
      const totalPages = Math.ceil(totalMovies / limit);
  
      // Send response with movies and pagination metadata
      res.status(200).json({
        movies,
        pagination: {
          currentPage: page,
          totalPages,
          totalMovies,
          limit,
        },
      });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message});
    }
  };

// Get a single movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(201).json({ success: true, message: 'Movie found', data: movie });
} catch (err) {
  res.status(500).json({ success: false, error: err.message});
}
};

// Update a movie by ID
const updateMovie = async (req, res) => {
  try {
    const { error } = movieJoiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(201).json({ success: true, message: 'Movie updated successfully', data: movie });
} catch (err) {
  res.status(500).json({ success: false, message: "Movie failed to update" ,error: err.message});
}
};

// Delete a movie by ID
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(201).json({ success: true, message: 'Movie deleted successfully', data: movie });
} catch (err) {
  res.status(500).json({ success: false, message: "Movie failed to delete" ,error: err.message});
}
};

const searchMovies = async (req, res) => {
    try {
      const nameFilter = req.query.name || '';
      const filter = nameFilter ? { title: { $regex: nameFilter, $options: 'i' } } : {};
  
      const movies = await Movie.find(filter);
      res.status(201).json({ success: true, message: 'Movie found', data: movies });
    } catch (err) {
       res.status(500).json({ success: false, message: "Movie not found" ,error: err.message});
}
  };

  const filterMoviesByGenre = async (req, res) => {
    try {
      const genreFilter = req.query.genre || '';
      const filter = genreFilter ? { genre: genreFilter } : {};
  
      const movies = await Movie.find(filter);
      res.status(201).json({ success: true, message: 'Movie found', data: movies });
    } catch (err) {
       res.status(500).json({ success: false, message: "Movie not found" ,error: err.message});
}
  };
  const filterMoviesByYear = async (req, res) => {
    try {
      const yearFilter = req.query.year ? parseInt(req.query.year) : null;
      const filter = yearFilter
        ? {
            release_date: {
              $gte: new Date(`${yearFilter}-01-01`),
              $lt: new Date(`${yearFilter + 1}-01-01`),
            },
          }
        : {};
  
      const movies = await Movie.find(filter);
      res.status(201).json({ success: true, message: 'Movie found', data: movies });
    } catch (err) {
       res.status(500).json({ success: false, message: "Movie not fount" ,error: err.message});
}
  };

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  searchMovies,
  filterMoviesByGenre,
  filterMoviesByYear
};