// backend/controllers/parentController.js
const pool = require('../config/db.config');

exports.getParentProfile = async (req, res) => {
  if (!req.session.username) {
    return res.status(401).send({ message: 'Not logged in' });
  }

  const parentName = req.session.username;  // Get logged-in parent's name
  
  try {
    // Fetch parent details (if necessary)
    const parentQuery = 'SELECT * FROM parents WHERE username = ?';
    const parentResult = await db.query(parentQuery, [parentName]);

    if (parentResult.length === 0) {
      return res.status(404).send({ message: 'Parent not found' });
    }

    // Fetch children linked to the parent
    const childrenQuery = 'SELECT * FROM children WHERE parent_name = ?';
    const childrenResult = await db.query(childrenQuery, [parentName]);

    res.status(200).send({ parent: parentResult[0], children: childrenResult });
  } catch (error) {
    console.error('Error fetching parent details:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
