<template>
  <div class="view-hospitals">
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
      <h2><strong>Manage Hospital Records</strong></h2>

      <!-- Form to add or update a hospital -->
      <form @submit.prevent="editingHospital ? updateHospital() : addHospital()">
        <input v-model="newHospital.hospital_name" placeholder="Hospital Name" required />
        <input v-model="newHospital.location" placeholder="Location" required />
        <input v-model="newHospital.hospital_contact" placeholder="Contact" required />
        <button type="submit">{{ editingHospital ? 'Update Hospital' : 'Add Hospital' }}</button>
      </form>

      <!-- Display the data in a table -->
      <table class="hospitals-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hospital in hospitals" :key="hospital.hospital_id">
            <td>{{ hospital.hospital_id }}</td>
            <td>{{ hospital.hospital_name }}</td>
            <td>{{ hospital.location }}</td>
            <td>{{ hospital.hospital_contact }}</td>
            <td>
              <button @click="editHospital(hospital)">Edit</button>
              <button @click="deleteHospital(hospital.hospital_id)">Delete</button>
            </td>
          </tr>
          <tr v-if="hospitals.length === 0">
            <td colspan="5" class="no-data">No data available</td>
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Create a reactive reference for hospitals data
const hospitals = ref([]);
const newHospital = ref({
  hospital_name: '',
  location: '',
  hospital_contact: ''
});
const editingHospital = ref(null);
const router = useRouter();

// Fetch hospitals data when the component is mounted
const fetchHospitals = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/hospitals');
    hospitals.value = response.data;  // Store the response data
  } catch (error) {
    console.error('Error fetching hospitals data:', error);
  }
};

// Add a new hospital
const addHospital = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/hospitals', newHospital.value);
    console.log('Hospital added:', response.data);
    fetchHospitals(); // Refresh the list
    clearForm();
  } catch (error) {
    console.error('Error adding hospital:', error);
  }
};

// Edit a hospital
const editHospital = (hospital) => {
  editingHospital.value = { ...hospital };
  Object.assign(newHospital.value, hospital);
};

// Update a hospital
const updateHospital = async () => {
  try {
    const response = await axios.put(`http://localhost:5000/api/hospitals/${editingHospital.value.hospital_id}`, newHospital.value);
    console.log('Hospital updated:', response.data);
    fetchHospitals(); // Refresh the list
    clearForm();
    editingHospital.value = null;
  } catch (error) {
    console.error('Error updating hospital:', error);
  }
};

// Delete a hospital
const deleteHospital = async (hospitalID) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/hospitals/${hospitalID}`);
    console.log('Hospital deleted:', response.data);
    fetchHospitals(); // Refresh the list
  } catch (error) {
    console.error('Error deleting hospital:', error);
  }
};

// Clear the form
const clearForm = () => {
  newHospital.value = {
    hospital_name: '',
    location: '',
    hospital_contact: ''
  };
};

const goToDashboard = () => {
  router.push('/admin-dashboard');
};

onMounted(fetchHospitals);
</script>

<style scoped>
.view-hospitals {
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

.hospitals-table {
  width: 100%;
  border-collapse: collapse;
}

.hospitals-table th,
.hospitals-table td {
  border: 1px solid #dee2e6;
  padding: 10px;
  text-align: left;
}

.hospitals-table th {
  background-color: #343a40; /* Updated color */
  color: #fff;
  font-weight: bold;
}

.hospitals-table tr:nth-child(even) {
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