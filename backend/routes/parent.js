const express = require('express');
const router = express.Router();
const pool = require('../config/db.config'); // Ensure this path is correct

// ...existing code...

// Endpoint to fetch child details by ID
router.get('/child-details/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM children WHERE child_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Child not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching child details:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
