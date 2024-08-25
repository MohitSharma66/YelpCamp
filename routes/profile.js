const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const profile = require('../controllers/profile');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.use(express.urlencoded({ extended: true }));

router.route('/:id')
    .get(isLoggedIn, profile.showProfile)
    .put(isLoggedIn, upload.single('image'), profile.updateProfile);

router.get('/:id/edit', isLoggedIn, profile.editProfile);

module.exports = router;