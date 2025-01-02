const express = require('express');
const router = express.Router();
const { createChild, getAllChildren, updateChild, deleteChild } = require('../controllers/childrenController');

router.post('/', createChild); // Create a new child
router.get('/', getAllChildren); // Read all children
router.put('/:child_id', updateChild); // Update a specific child by ID
router.delete('/:child_id', deleteChild); // Delete a specific child by ID

module.exports = router;
