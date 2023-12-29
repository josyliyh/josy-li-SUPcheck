const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations-controllers');

console.log("routes is running" ,router)
// Route for getting all locations
router.get('/', locationsController.getAllLocations);

// Route for getting a single location by ID
router.get('/:id', locationsController.getOneLocation);

// Route for getting weather info by location ID
router.get('/:id/weather', locationsController.getLocationAndWeather);

// Route for getting image by location ID
router.get('/:id/image', locationsController.getLocationImage);



  
module.exports = router;
