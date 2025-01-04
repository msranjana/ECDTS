<template>
  <div class="manage-health-records">
    <h2>All Health Records</h2>

    <!-- Form to add or update a health record -->
    <form @submit.prevent="editingRecord ? updateRecord() : addRecord()">
      <input v-model="newRecord.child_id" placeholder="Child ID" required />
      <input v-model="newRecord.hospital_id" placeholder="Hospital ID" required />
      <input v-model="newRecord.ct_id" placeholder="Caretaker ID" required />
      <input v-model="newRecord.diagnosis" placeholder="Diagnosis" required />
      <input v-model="newRecord.treatment" placeholder="Treatment" required />
      <input v-model="newRecord.check_up_date" placeholder="Check-up Date" type="date" required />
      <button type="submit">{{ editingRecord ? 'Update Record' : 'Add Record' }}</button>
    </form>

    <!-- Display the data in a table -->
    <table class="records-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Child ID</th>
          <th>Hospital ID</th>
          <th>Caretaker ID</th>
          <th>Diagnosis</th>
          <th>Treatment</th>
          <th>Check-up Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records" :key="record.health_id">
          <td>{{ record.health_id }}</td>
          <td>{{ record.child_id }}</td>
          <td>{{ record.hospital_id }}</td>
          <td>{{ record.ct_id }}</td>
          <td>{{ record.diagnosis }}</td>
          <td>{{ record.treatment }}</td>
          <td>{{ record.check_up_date }}</td>
          <td>
            <button @click="editRecord(record)">Edit</button>
            <button @click="deleteRecord(record.health_id)">Delete</button>
          </td>
        </tr>
        <tr v-if="records && records.length === 0">
          <td colspan="8" class="no-data">No data available</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Create a reactive reference for health records data
const records = ref([]); // Initialize as an empty array
const newRecord = ref({
  child_id: '',
  hospital_id: '',
  ct_id: '',
  diagnosis: '',
  treatment: '',
  check_up_date: ''
});
const editingRecord = ref(null);

// Fetch health records data when the component is mounted
const fetchRecords = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/health-records/all');
    records.value = response.data || []; // Ensure response data is an array
  } catch (error) {
    console.error('Error fetching health records data:', error);
    records.value = []; // Set to empty array on error
  }
};

// Add a new health record
const addRecord = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/health-records', newRecord.value);
    console.log('Health record added:', response.data);
    fetchRecords(); // Refresh the list
    clearForm();
  } catch (error) {
    console.error('Error adding health record:', error);
  }
};

// Edit a health record
const editRecord = (record) => {
  editingRecord.value = { ...record };
  Object.assign(newRecord.value, record);
};

// Update a health record
const updateRecord = async () => {
  try {
    const response = await axios.put(`http://localhost:5000/api/health-records/${editingRecord.value.health_id}`, newRecord.value);
    console.log('Health record updated:', response.data);
    fetchRecords(); // Refresh the list
    clearForm();
    editingRecord.value = null;
  } catch (error) {
    console.error('Error updating health record:', error);
  }
};

// Delete a health record
const deleteRecord = async (recordID) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/health-records/${recordID}`);
    console.log('Health record deleted:', response.data);
    fetchRecords(); // Refresh the list
  } catch (error) {
    console.error('Error deleting health record:', error);
  }
};

// Clear the form
const clearForm = () => {
  newRecord.value = {
    child_id: '',
    hospital_id: '',
    ct_id: '',
    diagnosis: '',
    treatment: '',
    check_up_date: ''
  };
};

onMounted(() => {
  fetchRecords();
});
</script>

<style scoped>
.manage-health-records {
  margin: 20px auto;
  max-width: 1200px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #0056b3;
}

.records-table {
  width: 100%;
  border-collapse: collapse;
}

.records-table th,
.records-table td {
  border: 1px solid #dee2e6;
  padding: 10px;
  text-align: left;
}

.records-table th {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
}

.records-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.no-data {
  text-align: center;
  font-style: italic;
  color: #666;
}

button {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
  color: #fff;
}
</style>
