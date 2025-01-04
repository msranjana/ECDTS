const express = require('express');
const router = express.Router();
const { createHospital, getAllHospitals, updateHospital, deleteHospital } = require('../controllers/hospitalController');  // Ensure path is correct

// Routes
router.post('/', createHospital);   // Create a new hospital
router.get('/', getAllHospitals);   // Get all hospitals
router.put('/:hospital_id', updateHospital);  // Update hospital by ID
router.delete('/:hospital_id', deleteHospital); // Delete hospital by ID

module.exports = router;
