const express = require('express');
const router = express.Router();
const {
    createHospital,
    getAllHospitals,
    updateHospital,
    deleteHospital
} = require('../controllers/hospitalController');

// Create a new hospital entry
router.post('/', createHospital);

// Get all hospitals records
router.get('/', getAllHospitals);

// Update hospital details by ID
router.put('/:hospitalID', updateHospital);

// Delete hospital by ID
router.delete('/:hospitalID', deleteHospital);

module.exports = router;
