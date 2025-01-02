const pool = require('../config/db.config');

// Create a new vaccine record.
const createVaccine = async (req, res) => {
  const { v_name, v_type, mfg_company } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO vaccine (v_name, v_type, mfg_company) VALUES (?, ?, ?)',
      [v_name, v_type, mfg_company]
    );
    res.status(201).json({ message: 'Vaccine added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding vaccine:', error);
    res.status(500).json({ error: 'An error occurred while adding the vaccine.' });
  }
};

// Get all vaccine records.
const getAllVaccines = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM vaccine');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching vaccines:', error);
    res.status(500).json({ error: 'An error occurred while fetching vaccines.' });
  }
};

// Get a specific vaccine by ID.
const getVaccineById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM vaccine WHERE v_id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching vaccine:', error);
    res.status(500).json({ error: 'An error occurred while fetching the vaccine.' });
  }
};

// Update a vaccine record.
const updateVaccine = async (req, res) => {
  const { id } = req.params;
  const { v_name, v_type, mfg_company } = req.body;

  try {
    const [result] = await pool.execute(
      'UPDATE vaccine SET v_name = ?, v_type = ?, mfg_company = ? WHERE v_id = ?',
      [v_name, v_type, mfg_company, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }

    res.status(200).json({ message: 'Vaccine updated successfully' });
  } catch (error) {
    console.error('Error updating vaccine:', error);
    res.status(500).json({ error: 'An error occurred while updating the vaccine.' });
  }
};

// Delete a vaccine record.
const deleteVaccine = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute('DELETE FROM vaccine WHERE v_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }

    res.status(200).json({ message: 'Vaccine deleted successfully' });
  } catch (error) {
    console.error('Error deleting vaccine:', error);
    res.status(500).json({ error: 'An error occurred while deleting the vaccine.' });
  }
};

module.exports = {
  createVaccine,
  getAllVaccines,
  getVaccineById,
  updateVaccine,
  deleteVaccine,
};
