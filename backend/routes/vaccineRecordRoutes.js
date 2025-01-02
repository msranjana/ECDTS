const express = require('express');
const router = express.Router();
const {
    createVaccineRecord,
    getAllVaccineRecords,
    updateVaccineRecord,
    deleteVaccineRecord
} = require('../controllers/vaccineRecordController');

// Create a new vaccine record
router.post('/', createVaccineRecord);

// Get all vaccine records
router.get('/', getAllVaccineRecords);

// Update a vaccine record by ID
router.put('/:vrec_id', updateVaccineRecord);

// Delete a vaccine record by ID
router.delete('/:vrec_id', deleteVaccineRecord);

module.exports = router;
