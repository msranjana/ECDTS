const pool = require('../config/db.config');

// Get all children
const getAllChildren = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM children");
        return res.json(rows);
    } catch (err) {
        console.error('Error fetching children:', err);
        return res.sendStatus(500);
    }
};

// Create a new child
const createChild = async (req, res) => {
    const { child_name, dob, age, gender, parent_name, parent_contact, address } = req.body;

    try {
        const [result] = await pool.query(
            "INSERT INTO children (child_name, dob, age, gender, parent_name, parent_contact, address) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [child_name, dob, age, gender, parent_name, parent_contact, address]
        );
        return res.status(201).json({ message: 'Child added successfully', id: result.insertId });
    } catch (err) {
        console.error('Error adding child:', err);
        return res.sendStatus(500);
    }
};

// Update child details by ID
const updateChild = async (req, res) => {
    const { childID } = req.params;
    const { child_name, dob, age, gender, parent_name, parent_contact, address } = req.body;

    try {
        const formattedDob = new Date(dob).toISOString().split('T')[0]; // Format the date to 'YYYY-MM-DD'
        const [result] = await pool.query(
            "UPDATE children SET child_name = ?, dob = ?, age = ?, gender = ?, parent_name = ?, parent_contact = ?, address = ? WHERE child_id = ?",
            [child_name, formattedDob, age, gender, parent_name, parent_contact, address, childID]
        );
        if (result.affectedRows === 0) return res.sendStatus(404);
        return res.json({ message: 'Child updated successfully' });
    } catch (err) {
        console.error('Error updating child:', err);
        return res.sendStatus(500);
    }
};

// Delete child by ID
const deleteChild = async (req, res) => {
    const { childID } = req.params;

    try {
        const [result] = await pool.query(
            "DELETE FROM children WHERE child_id = ?",
            [childID]
        );
        if (result.affectedRows === 0) return res.sendStatus(404);
        return res.json({ message: 'Child deleted successfully' });
    } catch (err) {
        console.error('Error deleting child:', err);
        return res.sendStatus(500);
    }
};

// Get child by ID
const getChildById = async (req, res) => {
    const { child_id } = req.params;
  
    try {
      const [rows] = await pool.execute('SELECT * FROM children WHERE child_id = ?', [child_id]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Child not found' });
      }
  
      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching child details:', error);
      res.status(500).json({ error: 'An error occurred while fetching child details.' });
    }
  };

module.exports = {
    getAllChildren,
    createChild,
    updateChild,
    deleteChild,
    getChildById
};