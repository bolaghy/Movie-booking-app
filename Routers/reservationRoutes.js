const express = require('express');
const router = express.Router();
const { createShow, getShows, getShowById, updateShow, deleteShow,reserveSeat } = require('../Controllers/reservationController');



router.post('/create-show', createShow);
router.get('/all-shows', getShows);
router.get('/show/:id', getShowById);
router.put('/update-show/:id', updateShow);    
router.delete('/delete-show/:id', deleteShow);
router.put('/reserve-seat/:showId/:seatNumber', reserveSeat);

module.exports = router;