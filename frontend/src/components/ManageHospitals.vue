<template>
  <div class="manage-hospitals">
    <h2>Manage Hospitals</h2>
    <!-- List of hospitals -->
    <ul v-if="hospitals.length > 0">
      <li v-for="hospital in hospitals" :key="hospital.hospital_id">
        {{ hospital.hospital_name }}
        <!-- Add buttons for edit and delete if needed -->
      </li>
    </ul>
    <p v-else>No hospitals available.</p> <!-- Display message when no hospitals are available -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '../config'; // Ensure the correct import path

const hospitals = ref([]);

// Function to fetch all hospitals.
async function fetchHospitals() {
  try {
    const response = await axios.get(`${API_BASE_URL}/hospitals`);
    if (response.data.length === 0) {
      console.log('No hospitals found');
    }
    hospitals.value = response.data;
  } catch (error) {
    console.error('Error fetching hospitals:', error);
  }
}

// Fetch hospitals when component mounts.
fetchHospitals();
</script>

<style scoped>
.manage-hospitals {
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
