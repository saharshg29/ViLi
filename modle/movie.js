const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const genre = require('./genre')
const mongoose = require('mongoose');


const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genres: {
        type: [genre.schema]
    },
    numberInStock: {
        type: Number,
        default: 0,
        min: 0
    },
    dailyRentalRate: {
        type: Number,
        default: 0,
        min: 0
    }
})


const movieModel = mongoose.model('Movies', moviesSchema);

exports.valuser = function validateUser(user) {
    try {
        const schema = {
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required()
        };

        return Joi.valid(user, schema);
    }
    catch (err) {
        console.log(err)
    }
};

exports.Movies = movieModel;