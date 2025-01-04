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
router.put('/:ct_id', updateCaretaker);

// Delete a caretaker by ID
router.delete('/:ct_id', deleteCaretaker);

module.exports = router;
