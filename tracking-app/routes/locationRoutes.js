const express = require('express');
const { saveLocation, getLocation } = require('../controllers/locationController');
const router = express.Router();

// Route pour enregistrer une nouvelle position GPS
router.post('/save-location', saveLocation);

// Route pour obtenir une nouvelle position GPS
router.get('/get-locations', getLocation);

module.exports = router;
