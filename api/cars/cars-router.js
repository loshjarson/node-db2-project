const express = require('express');

const mw = require('./cars-middleware')
const Cars = require('./cars-model');

const router = express.Router();

router.get('/', (req,res) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error retrieving cars"})
        })
})

router.get('/:id', mw.checkCarId, (req,res,) => {
    const {id} = req.params
    Cars.getById(id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error retrieving car"})
        })
})

router.post('/',mw.checkCarPayload, mw.checkVinNumberValid, mw.checkVinNumberUnique, (req,res) => {
    const newCar = req.body;
    Cars.create(newCar)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error creating car"})
        })
})

module.exports = router