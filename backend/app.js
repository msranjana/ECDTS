const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const vaccineRoutes = require('./routes/vaccineRoutes'); // Adjust path as necessary
const caretakerRoutes = require('./routes/caretakerRoutes'); // Adjust path as necessary
const physicalRecordRoutes = require('./routes/physicalRecordRoutes');
const childrenRoutes = require('./routes/childrenRoutes'); // Ensure this is imported
const healthRecordRoutes = require('./routes/healthRecordRoutes'); // Add this line
const vaccineRecordRoutes = require('./routes/vaccineRecordRoutes');
const userRoutes = require('./routes/userRoutes');
const parentRoutes = require('./routes/parentRoutes'); // Ensure this is imported

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Register routes
app.use('/api/vaccine', vaccineRoutes);
app.use('/api/caretakers', caretakerRoutes);
app.use('/api/physical-records', physicalRecordRoutes);
app.use('/api/children', childrenRoutes); // Ensure this is registered
app.use('/api/health-records', healthRecordRoutes); // Add this line
app.use('/api/vaccine-records', vaccineRecordRoutes);
app.use('/api/parent', parentRoutes); // Ensure this is registered

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
