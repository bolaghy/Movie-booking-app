require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a file to Cloudinary
const uploadFile = async (file, folder = 'uploads') => {
  try {
    const result = await cloudinary.uploader.upload(file, { folder });
    return result.secure_url; // Return the Cloudinary URL
  } catch (error) {
    throw new Error('Failed to upload file to Cloudinary');
  }
};

// Delete a file from Cloudinary
const deleteFile = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('Failed to delete file from Cloudinary');
  }
};

module.exports = { uploadFile, deleteFile };