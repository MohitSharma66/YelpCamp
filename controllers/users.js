const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => { //A method on passport as well thus when a user is registered he is logged in as well
            //when a user is registered they have to login as well and that's impractical thus we use this method
            if(err) return next(err);      
            req.flash('success', 'Welcome to Yelp-Camp!');
            res.redirect('/campgrounds');
        })
    } catch (err) {
        req.flash('error', err.message); //error template already defined and we pass in this err.message in the template
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;  //After successful login we delete the session variable to prevent it from being reused in the future
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    })
}