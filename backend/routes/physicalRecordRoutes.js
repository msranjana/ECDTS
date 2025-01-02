const express = require('express');
const {
  createPhysicalRecord,
  getAllPhysicalRecords,
  getPhysicalRecordById,
  updatePhysicalRecord,
  deletePhysicalRecord,
} = require('../controllers/physicalRecordController');

const router = express.Router();

// Define routes
router.post('/', createPhysicalRecord);
router.get('/', getAllPhysicalRecords);
router.put('/:id', updatePhysicalRecord);
router.delete('/:id', deletePhysicalRecord);

module.exports = router; // Ensure the router is exported correctly
