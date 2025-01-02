//backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); 
const childrenRoutes = require('./routes/childrenRoutes'); 
const vaccineRoutes = require('./routes/vaccineRoutes'); 
const physicalRecordRoutes = require('./routes/physicalRecordRoutes'); 
const healthRecordRoutes = require('./routes/healthRecordRoutes'); 
const caretakerRoutes = require('./routes/caretakerRoutes'); 
const hospitalRoutes = require('./routes/hospitalRoutes');
const vaccineRecordRoutes = require('./routes/vaccineRecordRoutes'); // Import the new routes

const app = express();
app.use(cors());
app.use(bodyParser.json()); 
app.use('/api/users', userRoutes);
app.use('/api/children', childrenRoutes); 
app.use('/api/vaccine', vaccineRoutes); 

//console.log('/api/physical-records:', physicalRecordRoutes);


app.use('/api/physical-records', physicalRecordRoutes); 
app.use('/api/health-records', healthRecordRoutes); 
app.use('/api/caretakers', caretakerRoutes); 
app.use('/api/hospitals', hospitalRoutes);
//console.log(physicalRecordRoutes); // Should output the router function

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
