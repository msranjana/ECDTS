const express = require('express');
const router = express.Router();
const {
    createHealthRecord,
    getAllHealthRecords,
    getHealthRecordById,
    updateHealthRecord,
    deleteHealthRecord
} = require('../controllers/healthRecordController');

// Create a new health record
router.post('/', createHealthRecord);

// Get all health records
router.get('/', getAllHealthRecords);

// Get a health record by ID
router.get('/:health_id', getHealthRecordById);

// Update a health record by ID
router.put('/:hr_id', updateHealthRecord);

// Delete a health record by ID
router.delete('/:hr_id', deleteHealthRecord);

module.exports = router;
