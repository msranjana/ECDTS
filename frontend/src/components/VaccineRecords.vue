<template>
  <div class="manage-vaccine-records">
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
      <h2><strong>Manage Vaccine Records</strong></h2>

      <!-- Form to add or update a vaccine record -->
      <form @submit.prevent="editingRecord ? updateVaccineRecord() : addVaccineRecord()">
        <input v-model="newRecord.v_id" placeholder="Vaccine ID" required />
        <input v-model="newRecord.child_id" placeholder="Child ID" required />
        <input v-model="newRecord.administered_date" type="date" placeholder="Administered Date" required />
        <input v-model="newRecord.next_due_date" type="date" placeholder="Next Due Date" required />
        <!-- Status field is read-only and automatically managed by the backend -->
        <input v-model="newRecord.status" placeholder="Status" readonly />
        <button type="submit">{{ editingRecord ? 'Update Record' : 'Add Record' }}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Vaccine ID</th>
            <th>Child ID</th>
            <th>Administered Date</th>
            <th>Next Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in vaccineRecords" :key="record.vrec_id">
            <td>{{ record.vrec_id }}</td>
            <td>{{ record.v_id }}</td>
            <td>{{ record.child_id }}</td>
            <td>{{ record.administered_date }}</td>
            <td>{{ record.next_due_date }}</td>
            <td>{{ record.status }}</td>
            <td>
              <button @click="editVaccineRecord(record)">Edit</button>
              <button @click="deleteVaccineRecord(record.vrec_id)">Delete</button>
            </td>
          </tr>
          <tr v-if="vaccineRecords.length === 0">
            <td colspan="7" class="no-data">No data available</td>
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

<script>
import axios from 'axios';

export default {
  name: 'ManageVaccineRecords',
  data() {
    return {
      vaccineRecords: [],
      newRecord: {
        v_id: '',
        child_id: '',
        administered_date: '',
        next_due_date: '',
        status: '' // Add status field
      },
      editingRecord: null
    };
  },
  methods: {
    async fetchVaccineRecords() {
      try {
        const response = await axios.get('http://localhost:5000/api/vaccine-records');
        this.vaccineRecords = response.data;
      } catch (error) {
        console.error('Error fetching vaccine records:', error);
      }
    },
    async addVaccineRecord() {
      try {
        const response = await axios.post('http://localhost:5000/api/vaccine-records', this.newRecord);
        console.log('Vaccine record added:', response.data);
        this.fetchVaccineRecords();
        this.clearForm();
      } catch (error) {
        console.error('Error adding vaccine record:', error);
      }
    },
    editVaccineRecord(record) {
      this.editingRecord = { ...record };
      Object.assign(this.newRecord, record);
    },
    async updateVaccineRecord() {
      try {
        const response = await axios.put(`http://localhost:5000/api/vaccine-records/${this.editingRecord.vrec_id}`, this.newRecord);
        console.log('Vaccine record updated:', response.data);
        this.fetchVaccineRecords();
        this.clearForm();
        this.editingRecord = null;
      } catch (error) {
        console.error('Error updating vaccine record:', error);
      }
    },
    async deleteVaccineRecord(vrec_id) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/vaccine-records/${vrec_id}`);
        console.log('Vaccine record deleted:', response.data);
        this.fetchVaccineRecords();
      } catch (error) {
        console.error('Error deleting vaccine record:', error);
      }
    },
    clearForm() {
      this.newRecord = {
        v_id: '',
        child_id: '',
        administered_date: '',
        next_due_date: '',
        status: '' // Clear status field
      };
    },
    goToDashboard() {
      this.$router.push('/admin-dashboard');
    }
  },
  mounted() {
    this.fetchVaccineRecords();
  }
};
</script>

<style scoped>
.manage-vaccine-records {
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

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #dee2e6;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #343a40; /* Updated color */
  color: #fff;
  font-weight: bold;
}

tr:nth-child(even) {
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