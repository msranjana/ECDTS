const pool = require('../config/db.config');

// Create a new vaccine record
const createVaccineRecord = async (req, res) => {
    const { v_id, child_id, administered_date, next_due_date, status } = req.body;

    try {
        // Check if the referenced records exist
        const [vaccine] = await pool.execute('SELECT * FROM vaccine WHERE v_id = ?', [v_id]);
        const [child] = await pool.execute('SELECT * FROM children WHERE child_id = ?', [child_id]);

        if (vaccine.length === 0) {
            return res.status(400).json({ error: 'Referenced vaccine not found' });
        }

        if (child.length === 0) {
            return res.status(400).json({ error: 'Referenced child not found' });
        }

        // Insert the new vaccine record
        const [result] = await pool.execute(
            'INSERT INTO vaccine_record (v_id, child_id, administered_date, next_due_date, status) VALUES (?, ?, ?, ?, ?)',
            [v_id, child_id, administered_date, next_due_date, status]
        );
        res.status(201).json({ message: 'Vaccine record added successfully', id: result.insertId });
    } catch (error) {
        console.error('Error adding vaccine record:', error);
        res.status(500).json({ error: 'An error occurred while adding the vaccine record.', details: error.message || error });
    }
};

// Get all vaccine records
const getAllVaccineRecords = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM vaccine_record');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching vaccine records:', error);
        res.status(500).json({ error: 'An error occurred while fetching vaccine records.' });
    }
};

// Update a vaccine record
const updateVaccineRecord = async (req, res) => {
    const { vrec_id } = req.params;
    const { v_id, child_id, administered_date, next_due_date, status } = req.body;

    try {
        const [result] = await pool.execute(
            'UPDATE vaccine_record SET v_id=?, child_id=?, administered_date=?, next_due_date=?, status=? WHERE vrec_id=?',
            [v_id, child_id, administered_date, next_due_date, status, vrec_id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ error: 'Vaccine record not found' });

        res.json({ message: 'Vaccine record updated successfully' });
    } catch (error) {
        console.error('Error updating vaccine record:', error);
        res.status(500).json({ error: 'An error occurred while updating the vaccine record.' });
    }
};

// Delete a vaccine record
const deleteVaccineRecord = async (req, res) => {
    const { vrec_id } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM vaccine_record WHERE vrec_id=?', [vrec_id]);

        if (result.affectedRows === 0) return res.status(404).json({ error: 'Vaccine record not found' });

        res.json({ message: 'Vaccine record deleted successfully' });
    } catch (error) {
        console.error('Error deleting vaccine record:', error);
        res.status(500).json({ error: 'An error occurred while deleting the vaccine record.' });
    }
};

module.exports = { createVaccineRecord, getAllVaccineRecords, updateVaccineRecord, deleteVaccineRecord };
