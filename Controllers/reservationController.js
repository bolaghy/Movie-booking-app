const Show = require('../Models/reservationModel');
const showJoiSchema = require('../Validators/reservationValidator');



const createShow = async (req, res) => {
    try {
      const { error } = showJoiSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const show = new Show(req.body);
      await show.save();  

      // Populate movie and theater details
    const populatedShow = await Show.findById(show._id)
    .populate('movie_id', 'title') // Populate only the 'title' field from the Movie model
    .populate('theater_id', 'name'); // Populate only the 'name' field from the Theater model


      res.status(201).json({ success: true, message: 'Show created successfully', data: populatedShow });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Show creation failed', error: err.message });
    }
  };
                                        
  const getShows = async (req, res) => {
    try {
      const shows = await Show.find().populate('movie_id').populate('theater_id');
      res.status(200).json({ success: true, message: 'Shows fetched successfully', data: shows });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch shows', error: err.message });
    }
  };
  
  const getShowById = async (req, res) => {
    try {
      const show = await Show.findById(req.params.id).populate('movie_id').populate('theater_id');
      if (!show) {
        return res.status(404).json({ success: false, message: 'Show not found' });
      }
      res.status(200).json({ success: true, message: 'Show fetched successfully', data: show });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch show', error: err.message });
    }
  };
  
  const updateShow = async (req, res) => {
    try {
      const { error } = showJoiSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const show = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!show) {
        return res.status(404).json({ success: false, message: 'Show not found' });
      }
      
      res.status(200).json({ success: true, message: 'Show updated successfully', data: show });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to update show', error: err.message });
    }
  };
  
  const deleteShow = async (req, res) => {
    try {
      const show = await Show.findByIdAndDelete(req.params.id);
      if (!show) {
        return res.status(404).json({ success: false, message: 'Show not found' });
      }
      res.status(200).json({ success: true, message: 'Show deleted successfully', data: show });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to delete show', error: err.message });
    }
  };
  

  const reserveSeat = async (req, res) => {
  try {
    const { showId, seatNumber } = req.params;

    // Find the show
    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ success: false, message: 'Show not found' });
    }

    // Check if the seat is available
    if (!show.available_seats.includes(seatNumber)) {
      return res.status(400).json({ success: false, message: 'Seat not available' });
    }

    // Reserve the seat
    show.available_seats = show.available_seats.filter((seat) => seat !== seatNumber); // Remove from available seats
    show.select_seat.push(seatNumber); // Add to reserved seats
    await show.save();

    // Send response
    res.status(200).json({
      success: true,
      message: `Seat ${seatNumber} reserved successfully`,
      data: show,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to reserve seat', error: err.message });
  }
};
  module.exports = {
   
    createShow,
    getShows,
    getShowById,
    updateShow,
    deleteShow,
    reserveSeat
  };                           