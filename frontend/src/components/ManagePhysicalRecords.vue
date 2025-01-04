<template>
  <div class="manage-physical-records">
    <!-- Header Section -->
    <header class="dashboard-header">
      <div class="header-container">
        <h1>EarlyCare</h1>
        <div class="profile-menu">
          <button class="profile-button" @click="goToDashboard">Back to Dashboard</button>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="dashboard-content">
      <h2><strong>Manage Physical Records</strong></h2>

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
    </main>

    <!-- Footer Section -->
    <footer class="dashboard-footer">
      <p>&copy; 2025 EarlyCare. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const records = ref([]);
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
const router = useRouter();

watch([() => newRecord.value.height, () => newRecord.value.weight], ([newHeight, newWeight]) => {
  if (newHeight && newWeight) {
    const heightInMeters = newHeight / 100;
    newRecord.value.bmi = (newWeight / (heightInMeters * heightInMeters)).toFixed(2);
  } else {
    newRecord.value.bmi = '';
  }
});

const fetchRecords = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/physical-records/all');
    records.value = response.data || [];
  } catch (error) {
    console.error('Error fetching physical records data:', error);
    records.value = [];
  }
};

const fetchChildDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/children/${newRecord.value.child_id}`);
    const child = response.data;
    newRecord.value.age = calculateAge(child.dob);
  } catch (error) {
    console.error('Error fetching child details:', error);
    newRecord.value.age = '';
  }
};

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

const addRecord = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/physical-records', newRecord.value);
    console.log('Physical record added:', response.data);
    fetchRecords();
    clearForm();
  } catch (error) {
    console.error('Error adding physical record:', error);
  }
};

const editRecord = (record) => {
  editingRecord.value = { ...record };
  Object.assign(newRecord.value, record);
};

const updateRecord = async () => {
  try {
    const response = await axios.put(`http://localhost:5000/api/physical-records/${editingRecord.value.physical_id}`, newRecord.value);
    console.log('Physical record updated:', response.data);
    fetchRecords();
    clearForm();
    editingRecord.value = null;
  } catch (error) {
    console.error('Error updating physical record:', error);
  }
};

const deleteRecord = async (recordID) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/physical-records/${recordID}`);
    console.log('Physical record deleted:', response.data);
    fetchRecords();
  } catch (error) {
    console.error('Error deleting physical record:', error);
  }
};

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

const goToDashboard = () => {
  router.push('/admin-dashboard');
};

onMounted(fetchRecords);
</script>

<style scoped>
/* General Layout */
.manage-physical-records {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: #f4f7f9;
}

/* Header Styling */
.dashboard-header {
  position: fixed; /* Fix the header at the top */
  top: 0;
  left: 0;
  width: 100%; /* Stretch the header across the entire screen width */
  height: 60px;
  background-color: rgba(38, 166, 154, 0.8); /* Make the header transparent */
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px; /* Add padding for spacing */
  z-index: 1000; /* Ensure it stays above other elements */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Add a shadow for better visibility */
}

.header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.profile-menu {
  position: relative;
}

.profile-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
  padding: 10px;
  display: none;
}

.profile-menu:hover .dropdown-menu {
  display: block;
}

/* Main Content Styling */
.dashboard-content {
  margin-top: 80px; /* Space for the header */
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 80px; /* Space for the footer */
}

.dashboard-content > * {
  margin-bottom: 20px;
}

/* Footer Styling */
.dashboard-footer {
  position: fixed; /* Make the footer fixed */
  bottom: 0;       /* Stick to the bottom */
  left: 0;         /* Align with the viewport's left */
  width: 100%;     /* Stretch across the entire width */
  height: 40px;
  background-color:  rgba(38, 166, 154, 0.8);
  color: #fff;
  text-align: center;
  padding: 10px 20px; /* Add some padding for better spacing */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* Add a shadow for better visibility */
  z-index: 1000; /* Ensure it stays above other elements */
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-content {
    width: 100%;
  }

  .dashboard-footer {
    width: 100%;
  }
}

.back-to-dashboard {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #007bff; /* Updated color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-to-dashboard:hover {
  background-color: #0056b3; /* Updated color */
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
  border: 1px solid #ced4da; /* Updated color */
  border-radius: 5px;
}

form button {
  padding: 10px 20px;
  background-color: #28a745; /* Updated color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #218838; /* Updated color */
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
  background-color: #343a40; /* Updated color */
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
  background-color: #ffc107; /* Updated color */
  color: #fff;
}
</style>
