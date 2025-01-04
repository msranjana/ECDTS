const express = require('express');
const router = express.Router();
const {
    createCaretaker,
    getAllCaretakers,
    updateCaretaker,
    deleteCaretaker
} = require('../controllers/caretakerController');

// Create a new caretaker
router.post('/', createCaretaker);

// Get all caretakers
router.get('/', getAllCaretakers);

// Update a caretaker by ID
router.put('/:caretakerID', updateCaretaker);

// Delete a caretaker by ID
router.delete('/:caretakerID', deleteCaretaker);

module.exports = router;
