const pool = require('../config/db.config');

// Create a new caretaker
const createCaretaker = async (req, res) => {
    const { ct_name, ct_contact, gender, hospital_id, qualification, role } = req.body;

    try {
        const [result] = await pool.execute(
            'INSERT INTO care_taker (ct_name, ct_contact, gender, hospital_id, qualification, role) VALUES (?, ?, ?, ?, ?, ?)',
            [ct_name || null, ct_contact || null, gender || null, hospital_id || null, qualification || null, role || null]
        );
        res.status(201).json({ message: 'Caretaker added successfully', id: result.insertId });
    } catch (error) {
        console.error('Error adding caretaker:', error.message);
        res.status(500).json({ error: 'An error occurred while adding the caretaker.', details: error.message });
    }
};

// Get all caretakers
const getAllCaretakers = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM care_taker');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching caretakers:', error);
        res.status(500).json({ error: 'An error occurred while fetching caretakers.' });
    }
};

// Update a caretaker
const updateCaretaker = async (req, res) => {
    const { ct_id } = req.params;
    const { name, contact_info } = req.body;

    try {
        const [result] = await pool.execute(
            'UPDATE care_taker SET name=?, contact_info=? WHERE ct_id=?',
            [name, contact_info, ct_id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ error: 'Caretaker not found' });

        res.json({ message: 'Caretaker updated successfully' });
    } catch (error) {
        console.error('Error updating caretaker:', error);
        res.status(500).json({ error: 'An error occurred while updating the caretaker.' });
    }
};

// Delete a caretaker
const deleteCaretaker = async (req, res) => {
    const { ct_id } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM care_taker WHERE ct_id=?', [ct_id]);

        if (result.affectedRows === 0) return res.status(404).json({ error: 'Caretaker not found' });

        res.json({ message: 'Caretaker deleted successfully' });
    } catch (error) {
        console.error('Error deleting caretaker:', error);
        res.status(500).json({ error: 'An error occurred while deleting the caretaker.' });
    }
};

module.exports = { createCaretaker, getAllCaretakers, updateCaretaker, deleteCaretaker };
