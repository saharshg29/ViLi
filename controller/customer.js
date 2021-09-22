const express = require('express');
const model = require('../modle/consumer')

const customer = express.Router();

customer.get('/', (req, res) => {
    res.send('On users Homepage')
})

customer.post('/', (req, res) => {
    var { isActive, name, phone } = req.body;
    let postData = new model.Customer({
        isActive: isActive,
        name: name,
        phone: phone
    });
    postData.save()
        .then(console.log('Posted successfully'))
        .catch(err => console.error(`${err}`));

    res.send(postData)
})


customer.patch('/:id', (req, res) => {
    let loadedData = model.Customer.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { new: true }
    )
        .then(console.log('Updated Sucessfully'))
        .catch(err => console.error(`${err}`));

})


customer.delete('/:id', (req, res) => {
    let deletedData = model.Customer.findByIdAndDelete(req.params.id)
        .then(() => console.log(" Deleted Sucessfully"))
        .catch(err => console.error(`${err}`));
    console.log(deletedData);
})

module.exports = customer;