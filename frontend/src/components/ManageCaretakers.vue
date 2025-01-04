<template>
  <div class="manage-caretakers">
    <h2>Manage Caretakers</h2>
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
    const response = await axios.post(`${API_BASE_URL}/caretakers`, {
      ct_name: ct_name.value,
      ct_contact: ct_contact.value,
      gender: gender.value,
      hospital_id: hospital_id.value,
      qualification: qualification.value,
      role: role.value,
    });
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
</script>

<style scoped>
.manage-caretakers {
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
