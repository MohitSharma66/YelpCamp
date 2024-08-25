const { campgroundSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const { reviewSchema } = require('./schemas'); 
const Review = require('./models/review');

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next(); //we store the returnTo in the locals as when a session is cleared whenever we visit a new page
};

module.exports.isLoggedIn = (req, res, next) => {
    //req.user stores information of the user passport gives us this functionality, it contains deserialized information of the user
    //session has serialized information of the user
    //It contains the id, username and the email of the user
    if(!req.isAuthenticated()) {
        //the url when the user fails authentication is stored as after the user is verified that's where we want to redirect the user
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You Must Be Signed In!')
        return res.redirect('/login'); //we return this otherwise the code below also runs
    }
    next();
}

//Validation happens between req and res thus we make a middleware functions and add it to certain route handlers
module.exports.validateCampground = (req, res, next) => { //A middleware function has req, res and next
    //campgroundSchema in schemas.js
    const { error } = campgroundSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    if (!camp) {
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds');
    }
    if (!camp.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}



module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}