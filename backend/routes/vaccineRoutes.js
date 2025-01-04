const express = require('express');
const router = express.Router();
const vaccineController = require('../controllers/vaccineController');

// Create a new vaccine record
router.post('/', vaccineController.addVaccine);

// Get all vaccines records
router.get('/all', vaccineController.getAllVaccines);

// Update a vaccine record
router.put('/:id', vaccineController.updateVaccine);

// Delete a vaccine record
router.delete('/:id', vaccineController.deleteVaccine);

module.exports = router;
