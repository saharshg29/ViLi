const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({
    genreID: Number,
    name: String
});

const genreModel = mongoose.model('Genre', genreSchema);

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

exports.schema = genreSchema;
exports.Genre = genreModel;