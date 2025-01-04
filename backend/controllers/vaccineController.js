const Vaccine = require('../models/Vaccine');
const pool = require('../config/db.config');

// Get all vaccines
const getAllVaccines = async (req, res) => {
  try {
    const [vaccines] = await pool.query("SELECT * FROM vaccine");
    res.json(vaccines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vaccines', error });
  }
};

// Add a new vaccine
const addVaccine = async (req, res) => {
  const { v_name, v_type, mfg_company } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO vaccine (v_name, v_type, mfg_company) VALUES (?, ?, ?)",
      [v_name, v_type, mfg_company]
    );
    res.status(201).json({ message: 'Vaccine added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding vaccine:', error);
    res.status(500).json({ message: 'Error adding vaccine', error });
  }
};

// Update a vaccine
const updateVaccine = async (req, res) => {
  const { id } = req.params;
  const { v_name, v_type, mfg_company } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE vaccine SET v_name = ?, v_type = ?, mfg_company = ? WHERE v_id = ?",
      [v_name, v_type, mfg_company, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }
    res.status(200).json({ message: 'Vaccine updated successfully' });
  } catch (error) {
    console.error('Error updating vaccine:', error);
    res.status(500).json({ message: 'Error updating vaccine', error });
  }
};

// Delete a vaccine
const deleteVaccine = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM vaccine WHERE v_id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }
    res.status(200).json({ message: 'Vaccine deleted successfully' });
  } catch (error) {
    console.error('Error deleting vaccine:', error);
    res.status(500).json({ message: 'Error deleting vaccine', error });
  }
};

module.exports = {
  getAllVaccines,
  addVaccine,
  updateVaccine,
  deleteVaccine
};