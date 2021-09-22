const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');


const consumerSchema = new mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: Number
});

const consumerModel = mongoose.model('Consumer', consumerSchema);

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

exports.Customer = consumerModel;