const Campground = require('../models/campground');
const User = require('../models/user');
const { cloudinary } = require('../cloudinary');
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}

//For validations if we add a new campground with missing fields from postman, there is no error so to fix it we use JOI Validations
//Validations on the server side if something makes it past client side
    //we can even set multiple middlewares to protect routes
    //if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400) //this error is caught by catchAsync and sent down
    //to our error handler down at the bottom , ExpressError just defines a message that we can send and a statusCode
    //we have to throw an error ourselves by res.status().send()
    //thanks to passport user is added on to req anything that is being authenticated by passport is stored in req
    //we add user id to author field in the campground model

module.exports.renderNewForm = (req, res) => { //we moved this into a middleware in a separate file because we want to use it in campground routes
    //as well as the review routes
    //if(!req.isAuthenticated()) {
        //req.flash('error', 'You Must Be Signed In!')
        //return res.redirect('/login'); //we return this otherwise the code below also runs
    //}
    res.render('campgrounds/new')  //above /:id because it will recognize new as an id as well
}

module.exports.createCampground = async (req, res) => { //The isAuthor middleware is designed 
    //to ensure that the user trying to modify or delete a campground is indeed the author of that campground. It doesn't apply 
    //to creating new campgrounds, which is why it isn't used with the POST / route. because before creating a campground there is no author of it
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    const user = await User.findById(req.user._id);
    user.campgrounds.push(campground._id);
    await user.save();
    req.flash('success', 'Successfully made a new Campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async (req, res) => { //this sends the error caught via next to our error handler at the bottom
    const { id } = req.params;
    const campground = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author' //here we are populating each review of this campground and the populating author of each review on this campground 
            //and then populating author of this campground
            //It then contains an author object we can only take their usernames to limit the size of the db
        }
    }).populate('author');
    if(!campground) {
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground = async (req, res) => {
    //This is the authorization check we are adding a middleware here instead of that
    // const camp = await Campground.findById(id);
    // if(!camp.author.equals(req.user._id)) {
    //     req.flash('error', 'You do not have permission to do that!');
    //     return res.redirect(`/campgrounds/${id}`);
    // }
    const { id } = req.params;
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
    campground.geometry = geoData.features[0].geometry;
    // Adding new images
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs); //we can't push these directly req.files.map(f => ({ url: f.path, filename: f.filename })) as in our model
    //campground.images is an array of objects not an array of arrays as .map returns an array
    await campground.save();

    // Deleting selected images
    if (req.body.deleteImages && req.body.deleteImages.length > 0) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename); 
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }

    req.flash('success', 'Successfully Updated Campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}


module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
}