<template>
  <div class="manage-caretakers">
    <!-- Header Section -->
    <header class="dashboard-header">
      <div class="header-container">
        <h1>EarlyCare</h1>
        <div class="profile-menu">
          <button class="back-to-dashboard" @click="goToDashboard">Back to Dashboard</button> <!-- Add this line -->
          
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="dashboard-content">
      <h2><strong>Manage Caretaker Records</strong></h2>
      <form @submit.prevent="addCaretaker">
        <input v-model="ct_name" placeholder="Caretaker Name" required />
        <input v-model="ct_contact" placeholder="Contact Number" required />
        <input v-model="gender" placeholder="Gender" required />
        <input v-model="hospital_id" placeholder="Hospital ID" required />
        <input v-model="qualification" placeholder="Qualification" required />
        <input v-model="role" placeholder="Role" required />
        <button type="submit">Add Caretaker</button>
      </form>

      <!-- List of caretakers -->
      <ul v-if="caretakers.length > 0">
        <li v-for="caretaker in caretakers" :key="caretaker.ct_id">
          {{ caretaker.ct_name }}
          <!-- Add buttons for edit and delete if needed -->
        </li>
      </ul>
      <p v-else>No caretakers available.</p> <!-- Display message when no caretakers are available -->
    </main>

    <!-- Footer Section -->
    <footer class="dashboard-footer">
      <p>&copy; 2025 EarlyCare. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '../config'; // Ensure the correct import path

const ct_name = ref('');
const ct_contact = ref('');
const gender = ref('');
const hospital_id = ref('');
const qualification = ref('');
const role = ref('');
const caretakers = ref([]);

// Function to add a caretaker.
async function addCaretaker() {
  try {
    // Validate fields
    const caretakerData = {
      ct_name: ct_name.value || null,
      ct_contact: ct_contact.value || null,
      gender: gender.value || null,
      hospital_id: hospital_id.value || null,
      qualification: qualification.value || null,
      role: role.value || null
    };

    const response = await axios.post(`${API_BASE_URL}/caretakers`, caretakerData);
    console.log('Caretaker added successfully:', response.data);
    fetchCaretakers(); // Refresh the list after adding a new caretaker.
    clearForm();
  } catch (error) {
    console.error('Error adding caretaker:', error);
  }
}

// Function to fetch all caretakers.
async function fetchCaretakers() {
  try {
    const response = await axios.get(`${API_BASE_URL}/caretakers`);
    if (response.data.length === 0) {
      console.log('No caretakers found');
    }
    caretakers.value = response.data; 
  } catch (error) {
    console.error('Error fetching caretakers:', error);
  }
}

// Function to clear form inputs.
function clearForm() {
  ct_name.value = '';
  ct_contact.value = '';
  gender.value = '';
  hospital_id.value = '';
  qualification.value = '';
  role.value = '';
}

// Fetch caretakers when component mounts.
fetchCaretakers();

const goToDashboard = () => {
  window.location.href = '/admin-dashboard'; // Add this function
};
</script>

<style scoped>
.manage-caretakers {
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
  font-weight: bold; /* Make the text bold */
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

.caretakers-table {
  width: 100%;
  border-collapse: collapse;
}

.caretakers-table th,
.caretakers-table td {
  border: 1px solid #dee2e6;
  padding: 10px;
  text-align: left;
}

.caretakers-table th {
  background-color: #343a40; /* Updated color */
  color: #fff;
  font-weight: bold;
}

.caretakers-table tr:nth-child(even) {
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
