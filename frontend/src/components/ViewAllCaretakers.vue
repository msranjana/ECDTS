<template>
  <div class="view-caretakers">
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
      <h2><strong>Manage Caretaker Records</strong></h2>

      <!-- Form to add or update a caretaker -->
      <form @submit.prevent="editingCaretaker ? updateCaretaker() : addCaretaker()">
        <input v-model="newCaretaker.ct_name" placeholder="Caretaker Name" required />
        <input v-model="newCaretaker.ct_contact" placeholder="Contact Number" required />
        <input v-model="newCaretaker.gender" placeholder="Gender" required />
        <input v-model="newCaretaker.hospital_id" placeholder="Hospital ID" required />
        <input v-model="newCaretaker.qualification" placeholder="Qualification" required />
        <input v-model="newCaretaker.role" placeholder="Role" required />
        <button type="submit">{{ editingCaretaker ? 'Update Caretaker' : 'Add Caretaker' }}</button>
      </form>

      <!-- Display the data in a table -->
      <table class="caretakers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Hospital ID</th>
            <th>Qualification</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="caretaker in caretakers" :key="caretaker.ct_id">
            <td>{{ caretaker.ct_id }}</td>
            <td>{{ caretaker.ct_name }}</td>
            <td>{{ caretaker.ct_contact }}</td>
            <td>{{ caretaker.gender }}</td>
            <td>{{ caretaker.hospital_id }}</td>
            <td>{{ caretaker.qualification }}</td>
            <td>{{ caretaker.role }}</td>
            <td>
              <button @click="editCaretaker(caretaker)">Edit</button>
              <button @click="deleteCaretaker(caretaker.ct_id)">Delete</button>
            </td>
          </tr>
          <tr v-if="caretakers.length === 0">
            <td colspan="8" class="no-data">No data available</td>
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

// Create a reactive reference for caretakers data
const caretakers = ref([]);
const newCaretaker = ref({
  ct_name: '',
  ct_contact: '',
  gender: '',
  hospital_id: '',
  qualification: '',
  role: ''
});
const editingCaretaker = ref(null);

// Fetch caretakers data when the component is mounted
const fetchCaretakers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/caretakers');
    caretakers.value = response.data;  // Store the response data
  } catch (error) {
    console.error('Error fetching caretakers data:', error);
  }
};

// Add a new caretaker
const addCaretaker = async () => {
  try {
    // Validate fields
    const caretakerData = {
      ct_name: newCaretaker.value.ct_name || null,
      ct_contact: newCaretaker.value.ct_contact || null,
      gender: newCaretaker.value.gender || null,
      hospital_id: newCaretaker.value.hospital_id || null,
      qualification: newCaretaker.value.qualification || null,
      role: newCaretaker.value.role || null
    };

    const response = await axios.post('http://localhost:5000/api/caretakers', caretakerData);
    console.log('Caretaker added:', response.data);
    fetchCaretakers(); // Refresh the list
    clearForm();
  } catch (error) {
    console.error('Error adding caretaker:', error);
  }
};

// Edit a caretaker
const editCaretaker = (caretaker) => {
  editingCaretaker.value = { ...caretaker };
  Object.assign(newCaretaker.value, caretaker);
};

// Update a caretaker
const updateCaretaker = async () => {
  try {
    const response = await axios.put(`http://localhost:5000/api/caretakers/${editingCaretaker.value.ct_id}`, newCaretaker.value);
    console.log('Caretaker updated:', response.data);
    fetchCaretakers(); // Refresh the list
    clearForm();
    editingCaretaker.value = null;
  } catch (error) {
    console.error('Error updating caretaker:', error);
  }
};

// Delete a caretaker
const deleteCaretaker = async (caretakerID) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/caretakers/${caretakerID}`);
    console.log('Caretaker deleted:', response.data);
    fetchCaretakers(); // Refresh the list
  } catch (error) {
    console.error('Error deleting caretaker:', error);
  }
};

// Clear the form
const clearForm = () => {
  newCaretaker.value = {
    ct_name: '',
    ct_contact: '',
    gender: '',
    hospital_id: '',
    qualification: '',
    role: ''
  };
};

const goToDashboard = () => {
  window.location.href = '/admin-dashboard';
};

onMounted(fetchCaretakers);
</script>

<style scoped>
.view-caretakers {
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
