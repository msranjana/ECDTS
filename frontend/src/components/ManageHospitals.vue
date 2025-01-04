<template>
  <div class="manage-hospitals">
    <!-- Header Section -->
    <header class="dashboard-header">
      <div class="header-container">
        <h1>EarlyCare</h1>
        <div class="profile-menu">
          <button class="profile-button">Admin ▼</button>
          <ul class="dropdown-menu">
            <li><a href="#profile">Profile</a></li>
            <li><a href="#logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="dashboard-content">
      <button class="back-to-dashboard" @click="goToDashboard">Back to Dashboard</button>
      <h2>Manage Hospital Records</h2>
      <!-- List of hospitals -->
      <ul v-if="hospitals.length > 0">
        <li v-for="hospital in hospitals" :key="hospital.hospital_id">
          {{ hospital.hospital_name }}
          <!-- Add buttons for edit and delete if needed -->
        </li>
      </ul>
      <p v-else>No hospitals available.</p> <!-- Display message when no hospitals are available -->
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
import { useRouter } from 'vue-router';
import { API_BASE_URL } from '../config'; // Ensure the correct import path

const hospitals = ref([]);
const router = useRouter();

const fetchHospitals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hospitals`);
    if (response.data.length === 0) {
      console.log('No hospitals found');
    }
    hospitals.value = response.data;
  } catch (error) {
    console.error('Error fetching hospitals:', error);
  }
};

const goToDashboard = () => {
  router.push('/admin-dashboard');
};

fetchHospitals();
</script>

<style scoped>
/* General Layout */
.manage-hospitals {
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
}

.no-data {
  text-align: center;
  font-style: italic;
  color: #666;
}
</style>
