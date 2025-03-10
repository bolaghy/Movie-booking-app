const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, updateProfilePicture,  updateCoverPhoto } = require('../Controllers/userController'); // Import the controller functions
const upload = require('../Utils/multer');

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);

// Update profile picture
router.put('/user/profile-picture/:userId', upload.single('file'), updateProfilePicture);
router.put('/user/cover-picture/:userId', upload.single('file'),  updateCoverPhoto);
             
module.exports = router;   