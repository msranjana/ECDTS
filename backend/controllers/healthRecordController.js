const pool = require('../config/db.config');

// Create a new health record
const createHealthRecord = async (req, res) => {
  const { child_id, hospital_id, ct_id, diagnosis, treatment, check_up_date } = req.body;

  if (!child_id || !hospital_id || !ct_id || !diagnosis || !treatment || !check_up_date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO health_record (child_id, hospital_id, ct_id, diagnosis, treatment, check_up_date) VALUES (?, ?, ?, ?, ?, ?)',
      [child_id, hospital_id, ct_id, diagnosis, treatment, check_up_date]
    );

    res.status(201).json({ message: 'Health Record added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding health record:', error);
    res.status(500).json({ error: 'An error occurred while adding the health record.' });
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
  const { health_id } = req.params;
  const { child_id, hospital_id, ct_id, diagnosis, treatment, check_up_date } = req.body;

  if (!child_id || !hospital_id || !ct_id || !diagnosis || !treatment || !check_up_date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.execute(
      'UPDATE health_record SET child_id = ?, hospital_id = ?, ct_id = ?, diagnosis = ?, treatment = ?, check_up_date = ? WHERE health_id = ?',
      [child_id, hospital_id, ct_id, diagnosis, treatment, check_up_date, health_id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Health Record not found' });

    res.json({ message: 'Health Record updated successfully' });
  } catch (error) {
    console.error('Error updating health record:', error);
    res.status(500).json({ error: 'An error occurred while updating the health record.' });
  }
};

// Delete a health record
const deleteHealthRecord = async (req, res) => {
  const { health_id } = req.params;

  if (!health_id) {
    return res.status(400).json({ error: 'Health ID is required' });
  }

  try {
    const [result] = await pool.execute('DELETE FROM health_record WHERE health_id = ?', [health_id]);

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Health Record not found' });

    res.json({ message: 'Health Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting health record:', error);
    res.status(500).json({ error: 'An error occurred while deleting the health record.' });
  }
};

module.exports = {
  createHealthRecord,
  getAllHealthRecords,
  getHealthRecordById,
  updateHealthRecord,
  deleteHealthRecord
};
