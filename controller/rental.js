const express = require('express');
const rental = express.Router();
const model = require('../modle/rental');

rental.get('/rental', async (req, res) => {
    const rentals = await model.Rentals.find().sort('-dateOut');
    res.send(rentals);
});

rental.post('/rental', async (req, res) => {
    // const {err} = model.valRental(req.body);
    // if (err) return console.error(err);

    const customer = await model.user.findById(req.body.customerID);
    if (!customer) return res.status(400).send('Invalid Customer.');

    const movie = await model.movie.findById(req.body.movieID);
    if (!movie) return res.status(400).send('Invalid Movie');

    if (movie.numberInStock === 0) return res.status(400).send('movie in stock')

    let rental = new model.Rentals({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },

        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental)

})

module.exports = rental;