const express = require('express');
const genre = express.Router();
const model = require('../modle/genre');

genre.get('/', (req, res) => {
    res.send('Homepage')
});


genre.post('/', (req, res) => {
    console.log('posting')
    var { genreID, name } = req.body;
    let postData = new model.Genre({
        genreID: genreID,
        name: name
    });

    res.send(postData);

    postData.save()
        .then(console.log('Posted successfully'))
        .catch(err => console.error(`${err}`));
})


genre.patch('/:id', (req, res) => {
    let loadedData = model.Genre.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { new: true }
    )
        .then(console.log('Updated Sucessfully'))
        .catch(err => console.error(`${err}`));
})


genre.delete('/:id', (req, res) => {
    let deletedData = model.Genre.findByIdAndDelete(req.params.id)
        .then(console.log(" Deleted Sucessfully"))
        .catch(err => console.error(`${err}`));
    console.log(deletedData);
})

module.exports = genre;