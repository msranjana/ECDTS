<template>
  <div class="view-children">
    <button class="back-to-dashboard" @click="goToDashboard">Back to Dashboard</button>
    <h2>Manage Children Records</h2>

    <!-- Form to add or update a child -->
    <form @submit.prevent="editingChild ? updateChild() : addChild()">
      <input v-model="newChild.child_name" placeholder="Child Name" required />
      <input v-model="newChild.dob" @change="calculateAge" placeholder="Date of Birth" required />
      <input v-model="newChild.age" placeholder="Age" required readonly />
      <input v-model="newChild.gender" placeholder="Gender" required />
      <input v-model="newChild.parent_name" placeholder="Parent Name" required />
      <input v-model="newChild.parent_contact" placeholder="Parent Contact" required />
      <input v-model="newChild.address" placeholder="Address" required />
      <button type="submit">{{ editingChild ? 'Update Child' : 'Add Child' }}</button>
    </form>

    <!-- Display the data in a table -->
    <table class="children-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Parent Name</th>
          <th>Parent Contact</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="child in children" :key="child.child_id">
          <td>{{ child.child_id }}</td>
          <td>{{ child.child_name }}</td>
          <td>{{ child.dob }}</td>
          <td>{{ child.age }}</td>
          <td>{{ child.gender }}</td>
          <td>{{ child.parent_name }}</td>
          <td>{{ child.parent_contact }}</td>
          <td>{{ child.address }}</td>
          <td>
            <button @click="editChild(child)">Edit</button>
            <button @click="deleteChild(child.child_id)">Delete</button>
          </td>
        </tr>
        <tr v-if="children && children.length === 0">
          <td colspan="9" class="no-data">No data available</td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const children = ref([]);
const newChild = ref({
  child_name: '',
  dob: '',
  age: '',
  gender: '',
  parent_name: '',
  parent_contact: '',
  address: ''
});
const editingChild = ref(null);
const router = useRouter();

const fetchChildren = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/children/all');
    children.value = response.data || [];
  } catch (error) {
    console.error('Error fetching children data:', error);
    children.value = [];
  }
};

const addChild = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/children', newChild.value);
    console.log('Child added:', response.data);
    fetchChildren();
    clearForm();
  } catch (error) {
    console.error('Error adding child:', error);
  }
};

const editChild = (child) => {
  editingChild.value = { ...child };
  Object.assign(newChild.value, child);
};

const updateChild = async () => {
  try {
    const response = await axios.put(`http://localhost:5000/api/children/${editingChild.value.child_id}`, newChild.value);
    console.log('Child updated:', response.data);
    fetchChildren();
    clearForm();
    editingChild.value = null;
  } catch (error) {
    console.error('Error updating child:', error);
  }
};

const deleteChild = async (childID) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/children/${childID}`);
    console.log('Child deleted:', response.data);
    fetchChildren();
  } catch (error) {
    console.error('Error deleting child:', error);
  }
};

const calculateAge = () => {
  const dob = new Date(newChild.value.dob);
  const ageDifMs = Date.now() - dob.getTime();
  const ageDate = new Date(ageDifMs);
  newChild.value.age = Math.abs(ageDate.getUTCFullYear() - 1970);
};

const clearForm = () => {
  newChild.value = {
    child_name: '',
    dob: '',
    age: '',
    gender: '',
    parent_name: '',
    parent_contact: '',
    address: ''
  };
};

const goToDashboard = () => {
  router.push('/admin-dashboard');
};

onMounted(fetchChildren);
</script>

<style scoped>
.view-children {
  margin: 20px auto;
  max-width: 1200px;
  background: #f9f9f9; /* Updated color */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
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

form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

form button {
  padding: 10px 20px;
  background-color: #2aa626;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #24c92c;
}

.children-table {
  width: 100%;
  border-collapse: collapse;
}

.children-table th,
.children-table td {
  border: 1px solid #dee2e6;
  padding: 10px;
  text-align: left;
}

.children-table th {
  background-color: #343a40; /* Updated color */
  color: #fff;
  font-weight: bold;
}

.children-table tr:nth-child(even) {
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
