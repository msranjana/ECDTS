const express = require('express');
const router = express.Router();
const physicalRecordController = require('../controllers/physicalRecordController');

// Create a new physical record
router.post('/', physicalRecordController.createPhysicalRecord);

// Get all physical records
router.get('/all', physicalRecordController.getAllPhysicalRecords);

// Update a physical record
router.put('/:physical_id', physicalRecordController.updatePhysicalRecord);

// Delete a physical record
router.delete('/:physical_id', physicalRecordController.deletePhysicalRecord);

module.exports = router;
