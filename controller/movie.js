const express = require('express');
const model = require('../modle/movie')

const movies = express.Router();

movies.get('/', async (req, res) => {
    // res.send('Currently you are on movies section')
    const movies = await model.Movies.find();
    res.send(movies);
})

movies.post('/', (req, res) => {
    let { title, genre, numberInStock, totalRenatalRate } = req.body;
    let postMovies = new model.Movies({
        title,
        genre,
        numberInStock,
        totalRenatalRate
    })

    postMovies.save()
        .then(() => {
            res.send(postMovies)
            console.log('Movie popsted Sucessfully')
        })
        .catch(err => console.error(err));
})

movies.patch('/:id', (req, res) => {
    let { title, numberInStock, dailyRentalRate } = req.body;
    let movie = model.Movies.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { title } || { numberInStock } || { dailyRentalRate } },
        { new: true }
    )
        .then(() => console.log('Movie updated sucessfully'))
        .catch(err => console.error(err));
})

movies.delete('/:id', (req, res) => {
    let movie = model.Movies.findByIdAndDelete(
        { _id: req.params.id }
    )
        .then(() => console.log('Deleted sucessfully'))
        .catch(err => console.error(err));
})

// --------------------- MOVIE GENRES -------------------------------

movies.post('/genre/:id', (req, res) => {
    let { genreID, name } = req.body;
    let newAuthor = {
        genreID,
        name
    }
    let movie = model.Movies.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { genres: newAuthor } },
        { new: true }
    )
        .then(() => console.log('Genre added sucessfully'))
        .catch(err => console.error(err));

})

movies.delete('/genre/:movieid/:genreid', (req, res) => {
    let movie = model.Movies.findById(
        { _id: req.params.movieid }
    );
    let genre = model.Movies.findById(
        { _id: req.params.genreid }
    );

    genre.remove();
})

module.exports = movies;