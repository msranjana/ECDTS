// backend/routes/childRoutes.js
const express = require('express');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Assuming you have a database query to fetch a child's details
const { db } = require('../config/db.config');  // Adjust path as per your setup

// Route to generate a CSV report for a child
router.get('/generate-child-report/:child_id', async (req, res) => {
  const childId = req.params.child_id;

  try {
    // Fetch child's details (adjust your queries as necessary)
    const childQuery = 'SELECT * FROM children WHERE child_id = ?';
    const child = await db.query(childQuery, [childId]);

    if (child.length === 0) {
      return res.status(404).send({ message: 'Child not found' });
    }

    // Fetch related data (e.g., health records, vaccination records, etc.)
    const healthRecordsQuery = 'SELECT * FROM health_records WHERE child_id = ?';
    const vaccinationRecordsQuery = 'SELECT * FROM vaccination_records WHERE child_id = ?';

    const healthRecords = await db.query(healthRecordsQuery, [childId]);
    const vaccinationRecords = await db.query(vaccinationRecordsQuery, [childId]);

    // Prepare the data for the CSV
    const data = [
      { field: 'Child Name', value: child[0].child_name },
      { field: 'Age', value: child[0].age },
      { field: 'Gender', value: child[0].gender },
      { field: 'Parent Name', value: child[0].parent_name },
      { field: 'Parent Contact', value: child[0].parent_contact },
      { field: 'Address', value: child[0].address },
      { field: 'Health Records', value: JSON.stringify(healthRecords) },  // Convert complex data to string
      { field: 'Vaccination Records', value: JSON.stringify(vaccinationRecords) },  // Convert complex data to string
    ];

    // Create a CSV writer
    const csvPath = path.join(__dirname, `child_report_${childId}.csv`);
    const csv = csvWriter({
      path: csvPath,
      header: [
        { id: 'field', title: 'Field' },
        { id: 'value', title: 'Value' },
      ],
    });

    // Write the data to the CSV file
    await csv.writeRecords(data);

    // Send the file to the client for download
    res.download(csvPath, `child_report_${childId}.csv`, (err) => {
      if (err) {
        console.error('Error sending CSV file:', err);
        res.status(500).send({ message: 'Error generating CSV report' });
      }

      // Optionally, delete the file after sending it to the client
      fs.unlink(csvPath, (err) => {
        if (err) console.error('Error deleting the CSV file:', err);
      });
    });

  } catch (error) {
    console.error('Error generating child report:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
