const Review = require('../models/review');
const User = require('../models/user');
const Campground = require('../models/campground');

module.exports.createReview = async(req, res) => {
    const { id } = req.params;
    const review = new Review(req.body.review);
    review.author = req.user._id;
    const campground = await Campground.findById(id);
    campground.reviews.push(review); //We push review not just its id
    review.campground = id; //don't .push campground as campground field in the review model is not an array
    //review.campground is a objectId thus we equate it with the campground id
    await review.save();
    await campground.save();
    const user = await User.findById(req.user._id);
    user.reviews.push(review._id);
    await user.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${id}`);
}

module.exports.deleteReview = async (req, res) => { //we also have campground id here to delete the reference of the deleted review to the campground
    const { id, reviewId } = req.params;
    //Just google how to delete an item from an array in mongoose and you will find the pull method
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId}}) //with pull we can delete an array based
    //on a condition from a bigger array
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}