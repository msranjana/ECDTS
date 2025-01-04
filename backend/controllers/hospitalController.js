const pool = require('../config/db.config');

// Create a new hospital
const createHospital = async (req, res) => {
    const { hospital_name, location, hospital_contact } = req.body;

    try {
        const [result] = await pool.query(
            "INSERT INTO hospital (hospital_name, location, hospital_contact) VALUES (?, ?, ?)",
            [hospital_name, location, hospital_contact]
        );
        return res.send(`Hospital ${hospital_name} added successfully.`);
    } catch (err) {
        console.error('Error creating hospital:', err);
        return res.sendStatus(500);
    }
};

// Get all hospitals
const getAllHospitals = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM hospital");
        return res.json(rows);
    } catch (err) {
        console.error('Error fetching hospitals:', err);
        return res.sendStatus(500);
    }
};

// Update hospital by ID
const updateHospital = async (req, res) => {
    const { hospital_name, location, hospital_contact } = req.body;
    const { hospital_id } = req.params;

    try {
        const [result] = await pool.query(
            "UPDATE hospital SET hospital_name = ?, location = ?, hospital_contact = ? WHERE hospital_id = ?",
            [hospital_name, location, hospital_contact, hospital_id]
        );
        if (result.affectedRows === 0) return res.sendStatus(404);
        return res.send(`Hospital ${hospital_id} updated successfully.`);
    } catch (err) {
        console.error('Error updating hospital:', err);
        return res.sendStatus(500);
    }
};

// Delete hospital by ID
const deleteHospital = async (req, res) => {
    const { hospital_id } = req.params;

    try {
        const [result] = await pool.query("DELETE FROM hospital WHERE hospital_id = ?", [hospital_id]);
        if (result.affectedRows === 0) return res.sendStatus(404);
        return res.send(`Hospital ${hospital_id} deleted successfully.`);
    } catch (err) {
        console.error('Error deleting hospital:', err);
        return res.sendStatus(500);
    }
};

module.exports = {
    createHospital,
    getAllHospitals,
    updateHospital,
    deleteHospital
};
