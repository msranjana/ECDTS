const express = require('express');
const router = express.Router();
const {
    createHealthRecord,
    getAllHealthRecords,
    updateHealthRecord,
    deleteHealthRecord
} = require('../controllers/healthRecordController');

// Create a new health record
router.post('/', createHealthRecord);

// Get all health records
router.get('/', getAllHealthRecords);

// Update a health record by ID
router.put('/:health_id', updateHealthRecord);

// Delete a health record by ID
router.delete('/:health_id', deleteHealthRecord);

module.exports = router;
