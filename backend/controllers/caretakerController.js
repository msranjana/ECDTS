const pool = require('../config/db.config');

// Create a new caretaker
const createCaretaker = async (req, res) => {
    const { ct_name, ct_contact, gender, hospital_id, qualification, role } = req.body;

    try {
        const [result] = await pool.query(
            "INSERT INTO care_taker (ct_name, ct_contact, gender, hospital_id, qualification, role) VALUES (?, ?, ?, ?, ?, ?)",
            [ct_name, ct_contact, gender, hospital_id, qualification, role]
        );
        return res.send(`Caretaker ${ct_name} added successfully.`);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
};

// Get all caretakers
const getAllCaretakers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM care_taker");
        if (rows.length === 0) return res.status(404).json({ message: 'No caretakers found' });
        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
};

// Update caretaker details by ID
const updateCaretaker = async (req, res) => {
    const { ct_name, ct_contact, gender, hospital_id, qualification, role } = req.body;
    const { caretakerID } = req.params;

    try {
        const [result] = await pool.query(
            "UPDATE care_taker SET ct_name = ?, ct_contact = ?, gender = ?, hospital_id = ?, qualification = ?, role = ? WHERE ct_id = ?",
            [ct_name, ct_contact, gender, hospital_id, qualification, role, caretakerID]
        );
        if (result.affectedRows === 0) return res.sendStatus(404);
        return res.send(`Caretaker ${caretakerID} updated successfully.`);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
};

// Delete caretaker by ID
const deleteCaretaker = async (req, res) => {
    const { caretakerID } = req.params;

    try {
        const [result] = await pool.query(
            "DELETE FROM care_taker WHERE ct_id = ?",
            [caretakerID]
        );
        if (result.affectedRows === 0) return res.sendStatus(404);
        return res.send(`Caretaker ${caretakerID} deleted successfully.`);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
};

module.exports = {
    createCaretaker,
    getAllCaretakers,
    updateCaretaker,
    deleteCaretaker
};
