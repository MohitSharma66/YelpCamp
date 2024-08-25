const User = require('../models/user');
const { cloudinary } = require('../cloudinary');

module.exports.showProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
        .populate({
            path: 'campgrounds',
            populate: {
                path: 'author'
            }
        })
        .populate({
            path: 'reviews',
            populate: {
                path: 'campground',
                model: 'Campground'
            }
        });
    res.render('profile/show', { user });
}

module.exports.editProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('profile/edit', { user });
}

module.exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }); // `req.body` instead of `req.body.user`
    if (req.file) {
        if (user.image && user.image.filename) {
            await cloudinary.uploader.destroy(user.image.filename); //if there is already a profile image and user tries to update it, we delete the existing profile image
        }
        user.image = { url: req.file.path, filename: req.file.filename }; //no need to push images as there is no array
    }
    if(user.deleteImage && user.deleteImage.filename) {
        await cloudinary.uploader.destroy(user.deleteImage.filename);
        user.deleteImage = undefined; //delete the deleteImage field from the user document after deleting the image from cloudinary
        await user.updateOne({image: null});
    }
    await user.save();
    req.flash('success', 'Data saved successfully');
    res.redirect(`/profile/${id}`);
}
