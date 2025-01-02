const pool = require('../config/db.config'); // Adjust path as necessary

// Create a new child
async function createChild(req, res) {
    const { child_name, dob, age, gender, parent_name, parent_contact, address, tracking_end_date } = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO children (child_name, dob, age, gender, parent_name, parent_contact, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [child_name, dob, age, gender, parent_name, parent_contact, address, tracking_end_date]
        );
        res.status(201).json({ message: 'Child added successfully', id: result.insertId });
    } catch (error) {
        console.error('Error adding child:', error);
        res.status(500).json({ error: 'An error occurred while adding the child.' });
    }
}

// Read all children
async function getAllChildren(req, res) {
    try {
        const [rows] = await pool.execute('SELECT * FROM children');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching children:', error);
        res.status(500).json({ error: 'An error occurred while fetching children.' });
    }
}

// Update a child
async function updateChild(req, res) {
    const { id } = req.params;
    const { child_name, dob, age, gender, parent_name, parent_contact, address } = req.body;
    try {
        const [result] = await pool.execute(
            'UPDATE children SET child_name = ?, dob = ?, age = ?, gender = ?, parent_name = ?, parent_contact = ?, address = ? WHERE child_id = ?',
            [child_name, dob, age, gender, parent_name, parent_contact, address, id]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Child updated successfully' });
        } else {
            res.status(404).json({ error: 'Child not found' });
        }
    } catch (error) {
        console.error('Error updating child:', error);
        res.status(500).json({ error: 'An error occurred while updating the child.' });
    }
}

// Delete a child
async function deleteChild(req, res) {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM children WHERE child_id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Child deleted successfully' });
        } else {
            res.status(404).json({ error: 'Child not found' });
        }
    } catch (error) {
        console.error('Error deleting child:', error);
        res.status(500).json({ error: 'An error occurred while deleting the child.' });
    }
}

module.exports = { createChild, getAllChildren, updateChild, deleteChild };
