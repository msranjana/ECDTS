<template>
  <div class="parent-dashboard">
    <!-- Header Section -->
    <header class="dashboard-header">
      <div class="header-container">
        <h1>Parent Dashboard</h1>
      </div>
    </header>

    <!-- Navigation Menu -->
    <nav class="dashboard-nav">
      <router-link to="/parent/manage-children" class="nav-link">Manage My Child's Details</router-link>
      <router-link to="/parent/manage-vaccines" class="nav-link">Manage My Child's Vaccination Records</router-link>
    </nav>

    <!-- Main Content -->
    <main class="dashboard-content">
      <!-- Welcome Section -->
      <section class="welcome-section">
        <h2>Welcome, {{ parent?.username }}</h2>
      </section>

      <!-- Children Section -->
      <section class="children-section">
        <div v-if="children.length > 0" class="children-list">
          <ul>
            <li v-for="child in children" :key="child.child_id" class="child-item">
              <span>{{ child.child_name }} - {{ child.age }} years old</span>
              <button class="secondary-button" @click="editChild(child)">Edit</button>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Please add your child's details.</p>
          <form @submit.prevent="addChild" class="add-child-form">
            <v-text-field v-model="newChildName" label="Child's Name" required></v-text-field>
            <v-text-field v-model="newChildDob" label="Date of Birth" type="date" @change="calculateAge" required></v-text-field>
            <v-text-field v-model="newChildAge" label="Child's Age" type="number" readonly></v-text-field>
            <v-text-field v-model="newChildGender" label="Gender" required></v-text-field>
            <v-text-field v-model="newParentName" label="Parent's Name" required></v-text-field>
            <v-text-field v-model="newParentContact" label="Parent's Contact" required></v-text-field>
            <v-textarea v-model="newAddress" label="Address" required></v-textarea>
            <v-btn type="submit" color="primary">Add Child</v-btn>
          </form>
        </div>
      </section>
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

// Reactive variables for parent and children data
const parent = ref(null);
const children = ref([]);
const newChildName = ref('');
const newChildDob = ref('');
const newChildAge = ref('');
const newChildGender = ref('');
const newParentName = ref('');
const newParentContact = ref('');
const newAddress = ref('');

// Router instance
const router = useRouter();

// Fetch parent and children details
const fetchParentDetails = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/parent/profile');
    parent.value = response.data.parent;
    children.value = response.data.children; // Populate children from database
  } catch (error) {
    console.error('Error fetching parent details:', error);
  }
};

// Calculate age based on DOB
const calculateAge = () => {
  if (newChildDob.value) {
    const dob = new Date(newChildDob.value);
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs);
    newChildAge.value = Math.abs(ageDate.getUTCFullYear() - 1970);
  }
};

// Add child details
const addChild = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/parent/child-details', {
      child_name: newChildName.value,
      dob: newChildDob.value,
      age: newChildAge.value,
      gender: newChildGender.value,
      parent_name: newParentName.value,
      parent_contact: newParentContact.value,
      address: newAddress.value,
    });
    
    // Add the new child to the frontend children list
    children.value.push({
      child_id: response.data.child_id,
      child_name: newChildName.value,
      dob: newChildDob.value,
      age: newChildAge.value,
      gender: newChildGender.value,
      parent_name: newParentName.value,
      parent_contact: newParentContact.value,
      address: newAddress.value,
    });

    // Clear the form fields
    newChildName.value = '';
    newChildDob.value = '';
    newChildAge.value = '';
    newChildGender.value = '';
    newParentName.value = '';
    newParentContact.value = '';
    newAddress.value = '';
  } catch (error) {
    console.error('Error adding child details:', error);
  }
};

// Navigation actions
const editChild = (child) => router.push(`/parent/edit-child/${child.child_id}`);

// Fetch data on component mount
onMounted(fetchParentDetails);
</script>

<style scoped>
/* General Layout */
.parent-dashboard {
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
  background-color: rgba(38, 166, 154, 0.8);
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Navigation Styling */
.dashboard-nav {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 15px;
  background-color: white;
  border-bottom: 1px solid #ddd;
}

.nav-link {
  text-decoration: none;
  color: #26a69a;
  font-weight: bold;
  padding: 10px 15px;
  border: 1px solid #26a69a;
  border-radius: 5px;
  transition: 0.3s;
}

.nav-link:hover {
  background-color: #26a69a;
  color: white;
}

/* Main Content */
.dashboard-content {
  margin: 80px auto 80px;
  width: 90%;
  max-width: 800px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.welcome-section {
  margin-bottom: 30px;
}

.children-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.children-list ul {
  list-style: none;
  padding: 0;
}

.child-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.child-item:last-child {
  border-bottom: none;
}

/* Add Child Form */
.add-child-form {
  max-width: 400px;
  margin: 0 auto;
}

/* Buttons */
.primary-button {
  background-color: #26a69a;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.primary-button:hover {
  background-color: #00796b;
}

.secondary-button {
  background-color: white;
  color: #26a69a;
  border: 1px solid #26a69a;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.secondary-button:hover {
  background-color: #26a69a;
  color: white;
}

/* Footer Styling */
.dashboard-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #26a69a;
  color: #fff;
  text-align: center;
  padding: 10px 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>
