const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary'); //node automatically looks for a index.js file or if theres only one file in that folder no need to specify it's name
const upload = multer({ storage }); //dest: 'uploads/' when uploaded the files go to a uploads folder in this project like below controller as a separate folder

router.route('/')
    .get(catchAsync(campgrounds.index)) //upload.array is now passed in as a middleware
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground)); //we can group same path routes together and chain on .verbs
    //.post(upload.single('image'), (req, res) => { //multer middleware has a method called upload which then has two types single and array 
        //it only looks for these photos in the 'image' section of the form basically the input with name="image"
        //res.send("Okay!"); //every image has different name in the folder in Cloudinary 
        //console.log(req.body, req.file);
        //we can't do res.send(abcde, fgh) as it only shows one thing(abcde and fgh are just two random examples)
    //})

router.get('/new', isLoggedIn, campgrounds.renderNewForm); // /new should be defined before /:id because then new is recognized as an id

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;