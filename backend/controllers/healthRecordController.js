const pool = require('../config/db.config');

// Create a new health record
const createHealthRecord = async (req, res) => {
    const { child_id, hospital_id, ct_id, diagnosis, treatment, check_up_date } = req.body;

    try {
        const [result] = await pool.execute(
            'INSERT INTO health_record (child_id, hospital_id, ct_id, diagnosis, treatment, check_up_date) VALUES (?, ?, ?, ?, ?, ?)',
            [child_id, hospital_id, ct_id, diagnosis, treatment, check_up_date]
        );
        res.status(201).json({ message: 'Health record added successfully', id: result.insertId });
    } catch (error) {
        console.error('Error adding health record:', error.message);

        // Check if the error is due to a foreign key constraint
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            try {
                // Check if the referenced records exist
                const [child] = await pool.execute('SELECT * FROM children WHERE child_id = ?', [child_id]);

                if (child.length === 0) {
                    return res.status(400).json({ error: 'Referenced child not found' });
                }

                // Retry the insert operation
                const [retryResult] = await pool.execute(
                    'INSERT INTO health_record (child_id, hospital_id, ct_id, diagnosis, treatment, check_up_date) VALUES (?, ?, ?, ?, ?, ?)',
                    [child_id, hospital_id, ct_id, diagnosis, treatment, check_up_date]
                );
                return res.status(201).json({ message: 'Health record added successfully', id: retryResult.insertId });
            } catch (retryError) {
                console.error('Error retrying health record insert:', retryError.message);
                return res.status(500).json({ error: 'An error occurred while retrying the health record insert.', details: retryError.message });
            }
        }

        res.status(500).json({ error: 'An error occurred while adding the health record.', details: error.message });
    }
};

// Get all health records
const getAllHealthRecords = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM health_record');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching health records:', error);
        res.status(500).json({ error: 'An error occurred while fetching health records.' });
    }
};

// Get a health record by ID
const getHealthRecordById = async (req, res) => {
  const { health_id } = req.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM health_record WHERE health_id = ?', [health_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Health Record not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching health record:', error);
    res.status(500).json({ error: 'An error occurred while fetching the health record.' });
  }
};

// Update a health record
const updateHealthRecord = async (req, res) => {
    const { hr_id } = req.params;
    const { child_id, hospital_id, ct_id, diagnosis, treatment, check_up_date } = req.body;

    try {
        const [result] = await pool.execute(
            'UPDATE health_record SET child_id=?, hospital_id=?, ct_id=?, diagnosis=?, treatment=?, check_up_date=? WHERE hr_id=?',
            [child_id, hospital_id, ct_id, diagnosis, treatment, check_up_date, hr_id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ error: 'Health record not found' });

        res.json({ message: 'Health record updated successfully' });
    } catch (error) {
        console.error('Error updating health record:', error);
        res.status(500).json({ error: 'An error occurred while updating the health record.' });
    }
};

// Delete a health record
const deleteHealthRecord = async (req, res) => {
    const { hr_id } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM health_record WHERE hr_id=?', [hr_id]);

        if (result.affectedRows === 0) return res.status(404).json({ error: 'Health record not found' });

        res.json({ message: 'Health record deleted successfully' });
    } catch (error) {
        console.error('Error deleting health record:', error);
        res.status(500).json({ error: 'An error occurred while deleting the health record.' });
    }
};

module.exports = { createHealthRecord, getAllHealthRecords, getHealthRecordById, updateHealthRecord, deleteHealthRecord };
