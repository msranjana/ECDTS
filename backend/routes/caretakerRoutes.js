const express = require('express');
const router = express.Router();
const {
    createCaretaker,
    getAllCaretakers,
    updateCaretaker,
    deleteCaretaker
} = require('../controllers/caretakerController');

// Create a new caretaker record
router.post('/', createCaretaker);

// Get all caretakers records
router.get('/', getAllCaretakers);

// Update a caretaker's details by ID
router.put('/:ctid', updateCaretaker);

// Delete a caretaker's record by ID
router.delete('/:ctid', deleteCaretaker);

module.exports = router;
