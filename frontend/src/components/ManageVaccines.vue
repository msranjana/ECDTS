<template>
  <div class="manage-vaccines">
    <h2>All Vaccine Records</h2>

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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Create a reactive reference for vaccines data
const vaccines = ref([]); // Initialize as an empty array
const newVaccine = ref({
  v_name: '',
  v_type: '',
  mfg_company: ''
});
const editingVaccine = ref(null);

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

onMounted(() => {
  fetchVaccines();
});
</script>

<style scoped>
.manage-vaccines {
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
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #0056b3;
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
  background-color: #007bff;
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
  background-color: #0056b3;
  color: #fff;
}
</style>
