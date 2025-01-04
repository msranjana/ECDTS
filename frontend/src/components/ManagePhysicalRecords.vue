<template>
  <div class="manage-physical-records">
    <h2>All Physical Records</h2>

    <!-- Form to add or update a physical record -->
    <form @submit.prevent="editingRecord ? updateRecord() : addRecord()">
      <input v-model="newRecord.child_id" @change="fetchChildDetails" placeholder="Child ID" required />
      <input v-model="newRecord.hospital_id" placeholder="Hospital ID" required />
      <input v-model="newRecord.ct_id" placeholder="Caretaker ID" required />
      <input v-model="newRecord.height" placeholder="Height (cm)" required />
      <input v-model="newRecord.weight" placeholder="Weight (kg)" required />
      <input v-model="newRecord.check_up_date" placeholder="Check-up Date" type="date" required />
      <input v-model="newRecord.age" placeholder="Age" required readonly />
      <input v-model="newRecord.bmi" placeholder="BMI" readonly />
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
          <th>Height</th>
          <th>Weight</th>
          <th>Check-up Date</th>
          <th>Age</th>
          <th>BMI</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records" :key="record.physical_id">
          <td>{{ record.physical_id }}</td>
          <td>{{ record.child_id }}</td>
          <td>{{ record.hospital_id }}</td>
          <td>{{ record.ct_id }}</td>
          <td>{{ record.height }}</td>
          <td>{{ record.weight }}</td>
          <td>{{ record.check_up_date }}</td>
          <td>{{ record.age }}</td>
          <td>{{ record.bmi }}</td>
          <td>
            <button @click="editRecord(record)">Edit</button>
            <button @click="deleteRecord(record.physical_id)">Delete</button>
          </td>
        </tr>
        <tr v-if="records && records.length === 0">
          <td colspan="10" class="no-data">No data available</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

// Create a reactive reference for physical records data
const records = ref([]); // Initialize as an empty array
const newRecord = ref({
  child_id: '',
  hospital_id: '',
  ct_id: '',
  height: '',
  weight: '',
  check_up_date: '',
  age: '',
  bmi: ''
});
const editingRecord = ref(null);

// Watch for changes in height and weight to calculate BMI
watch([() => newRecord.value.height, () => newRecord.value.weight], ([newHeight, newWeight]) => {
  if (newHeight && newWeight) {
    const heightInMeters = newHeight / 100;
    newRecord.value.bmi = (newWeight / (heightInMeters * heightInMeters)).toFixed(2);
  } else {
    newRecord.value.bmi = '';
  }
});

// Fetch physical records data when the component is mounted
const fetchRecords = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/physical-records/all');
    records.value = response.data || []; // Ensure response data is an array
  } catch (error) {
    console.error('Error fetching physical records data:', error);
    records.value = []; // Set to empty array on error
  }
};

// Fetch child details when child ID is entered
const fetchChildDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/children/${newRecord.value.child_id}`);
    const child = response.data;
    newRecord.value.age = calculateAge(child.dob);
  } catch (error) {
    console.error('Error fetching child details:', error);
    newRecord.value.age = ''; // Clear age on error
  }
};

// Calculate age based on date of birth
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Add a new physical record
const addRecord = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/physical-records', newRecord.value);
    console.log('Physical record added:', response.data);
    fetchRecords(); // Refresh the list
    clearForm();
  } catch (error) {
    console.error('Error adding physical record:', error);
  }
};

// Edit a physical record
const editRecord = (record) => {
  editingRecord.value = { ...record };
  Object.assign(newRecord.value, record);
};

// Update a physical record
const updateRecord = async () => {
  try {
    const response = await axios.put(`http://localhost:5000/api/physical-records/${editingRecord.value.physical_id}`, newRecord.value);
    console.log('Physical record updated:', response.data);
    fetchRecords(); // Refresh the list
    clearForm();
    editingRecord.value = null;
  } catch (error) {
    console.error('Error updating physical record:', error);
  }
};

// Delete a physical record
const deleteRecord = async (recordID) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/physical-records/${recordID}`);
    console.log('Physical record deleted:', response.data);
    fetchRecords(); // Refresh the list
  } catch (error) {
    console.error('Error deleting physical record:', error);
  }
};

// Clear the form
const clearForm = () => {
  newRecord.value = {
    child_id: '',
    hospital_id: '',
    ct_id: '',
    height: '',
    weight: '',
    check_up_date: '',
    age: '',
    bmi: ''
  };
};

onMounted(() => {
  fetchRecords();
});
</script>

<style scoped>
.manage-physical-records {
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
  color: #26a69a;
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
  background-color: #26a69a;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #00796b;
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
  background-color: #26a69a;
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
  background-color: #00796b;
  color: #fff;
}
</style>
