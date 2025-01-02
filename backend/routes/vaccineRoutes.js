const express = require('express');
const router = express.Router();
const {
    createVaccine,
    getAllVaccines,
    updateVaccine,
    deleteVaccine
} = require('../controllers/vaccineController');

// Create a new vaccine record
router.post('/', createVaccine);

// Get all vaccines records
router.get('/', getAllVaccines);

// Update a vaccine record
router.put('/:v_id', updateVaccine);

// Delete a vaccine record
router.delete('/:v_id', deleteVaccine);

module.exports = router;
