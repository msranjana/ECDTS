const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const vaccineRoutes = require('./routes/vaccineRoutes'); // Adjust path as necessary
const caretakerRoutes = require('./routes/caretakerRoutes'); // Adjust path as necessary
const physicalRecordRoutes = require('./routes/physicalRecordRoutes');
const childrenRoutes = require('./routes/childrenRoutes');
const healthRecordRoutes = require('./routes/healthRecordRoutes'); // Add this line

app.use(bodyParser.json());

// Register routes
app.use('/api/vaccine', vaccineRoutes);
app.use('/api/caretakers', caretakerRoutes);
app.use('/api/physical-records', physicalRecordRoutes);
app.use('/api/children', childrenRoutes);
app.use('/api/health-records', healthRecordRoutes); // Add this line

// ...existing code...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
