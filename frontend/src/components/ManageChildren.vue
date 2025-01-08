<template>
  <div class="manage-children">
    <!-- Header Section -->
    <header class="dashboard-header">
      <div class="header-container">
        <h1>EarlyCare</h1>
        <div class="profile-menu">
          <button class="profile-button">Admin </button>
        
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="dashboard-content">
      <button class="back-to-dashboard" @click="goToDashboard">Back to Dashboard</button> <!-- Add this line -->
      <h2>Manage Children Record</h2>
      <form @submit.prevent="editingChild ? updateChild() : addChild()">
        <input v-model="childName" placeholder="Child Name" required />
        <input type="date" v-model="dob" @change="calculateAge" placeholder="Date of Birth" required />
        <input type="number" v-model="age" placeholder="Age" required readonly />
        <select v-model="gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <!-- Removed fields for caretaker details -->
        <button type="submit">{{ editingChild ? 'Update Child' : 'Add Child' }}</button>
      </form>

      <!-- List of children -->
      <ul v-if="children.length > 0">
        <li v-for="child in children" :key="child.child_id">
          {{ child.child_name }}
          <button @click="editChild(child)">Edit</button>
          <button @click="deleteChild(child.child_id)">Delete</button>
        </li>
      </ul>
      <p v-else>No children available.</p> <!-- Display message when no children are available -->
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

const childName = ref('');
const dob = ref('');
const age = ref('');
const gender = ref('');
const children = ref([]);
const editingChild = ref(null);

// Function to add a child.
async function addChild() {
  try {
    const response = await axios.post(`${API_BASE_URL}/children`, {
      child_name: childName.value,
      dob: dob.value,
      age: age.value,
      gender: gender.value,
    });
    console.log('Child added successfully:', response.data);
    fetchChildren(); // Refresh list after adding a new child.
    clearForm();
  } catch (error) {
    console.error('Error adding child:', error);
  }
}

// Function to edit a child.
function editChild(child) {
  editingChild.value = { ...child };
  childName.value = child.child_name;
  dob.value = child.dob.split('T')[0]; // Format the date to 'YYYY-MM-DD'
  age.value = child.age;
  gender.value = child.gender;
}

// Function to update a child.
async function updateChild() {
  try {
    const response = await axios.put(`${API_BASE_URL}/children/${editingChild.value.child_id}`, {
      child_name: childName.value,
      dob: dob.value,
      age: age.value,
      gender: gender.value,
    });
    console.log('Child updated successfully:', response.data);
    fetchChildren(); // Refresh list after updating a child.
    clearForm();
    editingChild.value = null;
  } catch (error) {
    console.error('Error updating child:', error);
  }
}

// Function to delete a child.
async function deleteChild(childID) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/children/${childID}`);
    console.log('Child deleted successfully:', response.data);
    fetchChildren(); // Refresh list after deleting a child.
  } catch (error) {
    console.error('Error deleting child:', error);
  }
}

// Function to fetch all children.
async function fetchChildren() {
  try {
    const response = await axios.get(`${API_BASE_URL}/children`); // Fetch all children from API.
    if (response.data.length === 0) {
      console.log('No children found');
    }
    children.value = response.data;
  } catch (error) {
    console.error('Error fetching children:', error);
  }
}

// Calculate age based on date of birth
const calculateAge = () => {
  const dobDate = new Date(dob.value);
  const ageDifMs = Date.now() - dobDate.getTime();
  const ageDate = new Date(ageDifMs);
  age.value = Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Function to clear form inputs.
function clearForm() {
  childName.value = '';
  dob.value = '';
  age.value = '';
  gender.value = '';
}

// Fetch children when component mounts.
fetchChildren();

const goToDashboard = () => {
  window.location.href = '/admin-dashboard'; // Add this function
};
</script>

<style scoped>
/* General Layout */
.manage-children {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: #f4f7f9;
}

/* Header Styling */
.dashboard-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #26a69a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  background-color: #26a69a;
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

form input,
form select {
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
