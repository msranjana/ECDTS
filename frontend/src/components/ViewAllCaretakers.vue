<template>
  <div class="view-caretakers">
    <h2>All Caretaker Records</h2>

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
    const response = await axios.post('http://localhost:5000/api/caretakers', newCaretaker.value);
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

onMounted(fetchCaretakers);
</script>

<style scoped>
.view-caretakers {
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
  background-color: #007bff;
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
  background-color: #0056b3;
  color: #fff;
}
</style>
