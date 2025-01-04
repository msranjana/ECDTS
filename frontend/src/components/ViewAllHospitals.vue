<template>
  <div class="view-hospitals">
    <h2>All Hospitals Records</h2>

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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Create a reactive reference for hospitals data
const hospitals = ref([]);
const newHospital = ref({
  hospital_name: '',
  location: '',
  hospital_contact: ''
});
const editingHospital = ref(null);

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

onMounted(fetchHospitals);
</script>

<style scoped>
.view-hospitals {
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
  background-color: #26a69a;
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
  background-color: #00796b;
  color: #fff;
}
</style>