//We can use express-validator as well
const BaseJoi = require('joi');
const sanitizeHTML = require('sanitize-html');

//Check the JOI Docs
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, { //sanitizeHTMl removes all HTML tags from input
                    allowedTags: [], //no HTML tags are allowed we can set it up to say include only h1 or something
                    allowedAttributes: {} //same here (no attributes are allowed like href or src are not allowed)
                });
                if(clean !== value) return helpers.error('string.escapeHTML', { value });
                return clean;
            }
        }
    }
})

const Joi = BaseJoi.extend(extension);

module.exports.campgroundSchema = Joi.object({  //this only runs when we add info from postman
    campground: Joi.object({           //in the web app errors are already being handled when adding new campgrounds
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        //image: Joi.string().required(),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(0).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()  //this .required() is necessary after review to make sure it throws an error when it is not included
})