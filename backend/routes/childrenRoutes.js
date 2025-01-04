const express = require('express');
const router = express.Router();
const { getAllChildren, createChild, updateChild, deleteChild, getChildById } = require('../controllers/childrenController'); // Adjust path as necessary

// Routes
router.get('/all', getAllChildren); // Get all children
router.post('/', createChild); // Create a new child
router.put('/:childID', updateChild); // Update child by ID
router.delete('/:childID', deleteChild); // Delete child by ID
router.get('/:child_id', getChildById); // Get child details by ID

module.exports = router;
