const express = require('express');
const router = express.Router();
const { createTheater, getAllTheaters, getTheaterById, updateTheater, 
    deleteTheater } = require('../Controllers/TheaterController');
const {authMiddleware, roleMiddleware} = require('../Middlewares/authMiddleware');

// Create a new theater
router.post('/create-theater', createTheater);

// Get all theaters with pagination
router.get('/all-theater', getAllTheaters);

// Get a single theater by ID
router.get('/theater/:id', getTheaterById);

// Update a theater by ID
router.put('/update-theater/:id', updateTheater);

// Delete a theater by ID
router.delete('/delete-theater/:id', deleteTheater);

module.exports = router;
