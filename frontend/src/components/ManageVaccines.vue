<template>
  <div class="manage-vaccines">
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
      <h2><strong>Manage Vaccine Details</strong></h2>

      <!-- Form to add or update a vaccine -->
      <form @submit.prevent="editingVaccine ? updateVaccine() : addVaccine()">
        <input v-model="newVaccine.v_name" placeholder="Vaccine Name" required />
        <input v-model="newVaccine.v_type" placeholder="Vaccine Type" required />
        <input v-model="newVaccine.mfg_company" placeholder="Manufacturer Company" required />
        <button type="submit">{{ editingVaccine ? 'Update Vaccine' : 'Add Vaccine' }}</button>
      </form>

      <!-- Display the data in a table -->
      <table class="vaccines-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Manufacturer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vaccine in vaccines" :key="vaccine.v_id">
            <td>{{ vaccine.v_id }}</td>
            <td>{{ vaccine.v_name }}</td>
            <td>{{ vaccine.v_type }}</td>
            <td>{{ vaccine.mfg_company }}</td>
            <td>
              <button @click="editVaccine(vaccine)">Edit</button>
              <button @click="deleteVaccine(vaccine.v_id)">Delete</button>
            </td>
          </tr>
          <tr v-if="vaccines && vaccines.length === 0">
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

// Create a reactive reference for vaccines data
const vaccines = ref([]); // Initialize as an empty array
const newVaccine = ref({
  v_name: '',
  v_type: '',
  mfg_company: ''
});
const editingVaccine = ref(null);
const router = useRouter();

// Fetch vaccines data when the component is mounted
const fetchVaccines = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/vaccine/all');
    vaccines.value = response.data || []; // Ensure response data is an array
  } catch (error) {
    console.error('Error fetching vaccines data:', error);
    vaccines.value = []; // Set to empty array on error
  }
};

// Add a new vaccine
const addVaccine = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/vaccine', newVaccine.value);
    console.log('Vaccine added:', response.data);
    fetchVaccines(); // Refresh the list
    clearForm();
  } catch (error) {
    console.error('Error adding vaccine:', error);
  }
};

// Edit a vaccine
const editVaccine = (vaccine) => {
  editingVaccine.value = { ...vaccine };
  Object.assign(newVaccine.value, vaccine);
};

// Update a vaccine
const updateVaccine = async () => {
  try {
    const response = await axios.put(`http://localhost:5000/api/vaccine/${editingVaccine.value.v_id}`, newVaccine.value);
    console.log('Vaccine updated:', response.data);
    fetchVaccines(); // Refresh the list
    clearForm();
    editingVaccine.value = null;
  } catch (error) {
    console.error('Error updating vaccine:', error);
  }
};

// Delete a vaccine
const deleteVaccine = async (vaccineID) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/vaccine/${vaccineID}`);
    console.log('Vaccine deleted:', response.data);
    fetchVaccines(); // Refresh the list
  } catch (error) {
    console.error('Error deleting vaccine:', error);
  }
};

// Clear the form
const clearForm = () => {
  newVaccine.value = {
    v_name: '',
    v_type: '',
    mfg_company: ''
  };
};

const goToDashboard = () => {
  router.push('/admin-dashboard');
};

onMounted(() => {
  fetchVaccines();
});
</script>

<style scoped>
.manage-vaccines {
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

.vaccines-table {
  width: 100%;
  border-collapse: collapse;
}

.vaccines-table th,
.vaccines-table td {
  border: 1px solid #dee2e6;
  padding: 10px;
  text-align: left;
}

.vaccines-table th {
  background-color: #343a40; /* Updated color */
  color: #fff;
  font-weight: bold;
}

.vaccines-table tr:nth-child(even) {
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
