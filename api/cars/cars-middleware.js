const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  const {id} = req.params;
  Cars.getById(id)
    .then(cars => {
      if (!cars) {
        res.status(404).json({ message: `car with id ${id} is not found` })
      } else {
        next()
      }
    })
}

const checkCarPayload = (req, res, next) => {
  const newCar = req.body;
  if (!newCar.vin) {
    res.status(400).json({ message: `vin is missing` })
  } else if (!newCar.make) {
    res.status(400).json({ message: `make is missing` })
  } else if (!newCar.model) {
    res.status(400).json({ message: `model is missing` })
  } else if (!newCar.mileage) {
    res.status(400).json({ message: `mileage is missing` })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const {vin} = req.body;
  if (!vinValidator.validate(vin)) {
    res.status(400).json({ message: `vin ${vin} is invalid` })
  } else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  const {vin} = req.body;
  Cars.getByVin(vin)
    .then(car => {
      if (car) {
        res.status(400).json({ message: `vin ${vin} already exists` })
      } else {
        next()
      }
    })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
}