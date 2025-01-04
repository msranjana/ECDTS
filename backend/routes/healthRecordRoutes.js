const express = require('express');
const router = express.Router();
const healthRecordController = require('../controllers/healthRecordController');

// Create a new health record
router.post('/', healthRecordController.createHealthRecord);

// Get all health records
router.get('/all', healthRecordController.getAllHealthRecords);

// Get a health record by ID
router.get('/:health_id', healthRecordController.getHealthRecordById);

// Update a health record
router.put('/:health_id', healthRecordController.updateHealthRecord);

// Delete a health record
router.delete('/:health_id', healthRecordController.deleteHealthRecord);

module.exports = router;
