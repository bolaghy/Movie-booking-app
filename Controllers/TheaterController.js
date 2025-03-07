const Theater = require('../Models/theaterModel'); 
const theaterJoiSchema = require('../Validators/thearterValidator'); 

// Create a new theater
const createTheater = async (req, res) => {
  try {
    const { error } = theaterJoiSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const theater = new Theater(req.body);
    await theater.save();
    res.status(201).json({ success: true, message: 'Theater created successfully', data: theater });
    } catch (err) {
    res.status(500).json({ success: false, message: "Theater creation failed" ,error: err.message});   
    }
};

// Get all theaters with pagination
const getAllTheaters = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Fetch theaters with pagination
    const theaters = await Theater.find()
      .skip(skip)
      .limit(limit);

    // Get the total number of theaters for pagination metadata
    const totalTheaters = await Theater.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalTheaters / limit);

    // Send response with theaters and pagination metadata
    res.status(200).json({
      theaters,
      pagination: {
        currentPage: page,
        totalPages,
        totalTheaters,
        limit,
      },
    });

    } catch (err) {
    res.status(500).json({ success: false, error: err.message});   
    }
};

// Get a single theater by ID
const getTheaterById = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    res.status(201).json({ success: true, message: 'Theater found', data: theater });
    } catch (err) {
    res.status(500).json({ success: false, message: "Theater failed" ,error: err.message});   
    }
};


// Update a theater by ID
const updateTheater = async (req, res) => {
  try {
    const { error } = theaterJoiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    res.status(201).json({ success: true, message: 'Theater updated sucessfully', data: theater });
    } catch (err) {
    res.status(500).json({ success: false, message: "Theater update fail" ,error: err.message});   
    }
};

// Delete a theater by ID
const deleteTheater = async (req, res) => {
  try {
    const theater = await Theater.findByIdAndDelete(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    res.status(201).json({ success: true, message: 'Theater deleted sucessfully', data: theater });
    } catch (err) {
    res.status(500).json({ success: false, message: "Theater delete fail" ,error: err.message});   
    }
};

module.exports = {
  createTheater,
  getAllTheaters,
  getTheaterById,
  updateTheater,
  deleteTheater,
};