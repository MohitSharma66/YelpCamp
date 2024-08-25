const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { places, descriptors } = require('./seedHelpers.js');
const cities = require('./cities.js');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDB = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({}); //to remove reviews from profile after re-seeding the database
    for(let i = 0; i < 175; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66a7f97c7da2687ccd9a28cf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: `https://res.cloudinary.com/dbgnfh8ef/image/upload/v1722798391/YelpCamp/pvstfhrqmgdrgvpme2os.png`,
                    filename: 'YelpCamp/pvstfhrqmgdrgvpme2os'
                },
                {
                    url: `https://res.cloudinary.com/dbgnfh8ef/image/upload/v1722798392/YelpCamp/hvfaqemoq7b2rr91ec7s.png`,
                    filename: 'YelpCamp/hvfaqemoq7b2rr91ec7s'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, voluptatem quo adipisci earum quis cupiditate voluptates. Neque, natus aspernatur. Corporis nulla iure quibusdam nostrum hic rerum animi possimus debitis reiciendis.',
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})