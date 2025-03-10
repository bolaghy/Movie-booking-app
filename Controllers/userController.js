require('dotenv').config();
const { registerSchema, loginSchema } = require('../Validators/userValidator');
const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../Utils/uploadPhotoVideo');


// Register a new user
const register = async (req, res) => {
  try {
    // Validate request body
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, phone_number,role } = req.body;
    
    // Create the user
    const user = new User({
      name,
      email,
      password,
      phone_number,
      role: role || 'user', // Default to 'user' if no role is provided
    });
    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully', data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registeration fail" ,error: err.message});
  }
};

// Login a user
const login = async (req, res) => {
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
      
     

     
 
    // Compare passwords
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(400).json({success: false, message: "Wrong Email or Password"});
    }

    


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ success: true, 
      message: 'Login succefully', 
      data: user._id, name:user.name, Email:user.email, Role:user.role,  token  });
    } catch (err) {    
      res.status(500).json({ success: false, message: "Registeration fail" ,error: err.message});
    }
};

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtering
    const filter = {};
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: 'i' }; // Case-insensitive search
    }
    if (req.query.email) {
      filter.email = { $regex: req.query.email, $options: 'i' };
    }

    // Sorting
    const sort = {};
    if (req.query.sortBy) {
      const sortFields = req.query.sortBy.split(':');
      sort[sortFields[0]] = sortFields[1] === 'desc' ? -1 : 1;
    }

    // Fetch users with filtering, sorting, and pagination
    const users = await User.find(filter)
      .select('-password')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Get the total number of users
    const totalUsers = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message});
  }
}; 

const updateProfilePicture = async (req, res) => {
  try {
    const { userId } = req.params;
    const file = req.file.path; // Path to the uploaded file (using Multer)

    // Upload file to Cloudinary
    const profilePictureUrl = await uploadFile(file, 'profile_pictures');

    // Update user profile picture
    const user = await User.findByIdAndUpdate(
      userId,
      { profile_picture: profilePictureUrl },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Profile picture updated successfully', data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update profile picture', error: err.message });
  }
};

const updateCoverPhoto = async (req, res) => {
  try {
    const { userId } = req.params;
    const file = req.file.path; // Path to the uploaded file (using Multer)

    // Upload file to Cloudinary
    const coverPhotoUrl = await uploadFile(file, 'cover_photos');

    // Update user cover photo
    const user = await User.findByIdAndUpdate(
      userId,
      { cover_photo: coverPhotoUrl },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Cover photo updated successfully', data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update cover photo', error: err.message });
  }
};


module.exports = { register, login, getAllUsers, updateProfilePicture, updateCoverPhoto};
