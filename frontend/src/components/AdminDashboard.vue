<template>
  <div class="admin-dashboard">
    <!-- Header Section -->
    <header class="dashboard-header">
      <div class="header-container">
        <h1>EarlyCare - An Early Child Development Tracking System</h1>
      </div>
    </header>

    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <nav class="sidebar-nav">
        <h2>Admin Dashboard</h2>
        <router-link to="/admin/manage-vaccines" class="nav-link">Manage Vaccines</router-link>
        <router-link to="/admin/manage-children" class="nav-link">Manage Children</router-link>
        <router-link to="/admin/manage-physical-records" class="nav-link">Manage Physical Records</router-link>
        <router-link to="/admin/manage-vaccine-records" class="nav-link">Manage Vaccine Records</router-link>
        <router-link to="/admin/view-caretakers" class="nav-link">Manage Caretakers</router-link>
        <router-link to="/admin/view-hospitals" class="nav-link">Manage Hospitals</router-link>
        <router-link to="/admin/manage-health-records" class="nav-link">Manage Health Records</router-link>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="dashboard-content">
      <h2 class="summary-title">Short Summary Card</h2>
      <div class="summary-card">
        <div class="summary-item">
          <h3>Total Children Registered</h3>
          <p>{{ children.length }}</p>
        </div>
        <div class="summary-item">
          <h3>Total Caretakers</h3>
          <p>{{ caretakers.length }}</p>
        </div>
        <div class="summary-item">
          <h3>Average BMI</h3>
          <p>{{ averageBMI }}</p>
        </div>
        <div class="summary-item">
          <h3>Total Health Records</h3>
          <p>{{ healthRecords.length }}</p>
        </div>
      </div>

      <!-- Pie Chart Section -->
      <div class="chart-container">
        <h3 class="chart-title">Gender Distribution of Registered Children</h3>
        <canvas id="genderChart"></canvas>
      </div>
      <!-- ...existing code... -->
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
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register all necessary components for Chart.js
Chart.register(...registerables, ChartDataLabels);

// Define reactive properties
const children = ref([]);
const caretakers = ref([]);
const healthRecords = ref([]);
const vaccinationsAdministered = ref(0);
const vaccinationsPending = ref(0);
const averageBMI = ref(0);
const boysCount = ref(0);
const girlsCount = ref(0);

// Fetch data from the backend when the component is mounted
onMounted(async () => {
  try {
    const childrenResponse = await axios.get('http://localhost:5000/api/children/all');
    children.value = childrenResponse.data;

    const caretakerResponse = await axios.get('http://localhost:5000/api/caretakers');
    caretakers.value = caretakerResponse.data;

    const healthRecordResponse = await axios.get('http://localhost:5000/api/health-records');
    healthRecords.value = healthRecordResponse.data;

    const vaccinationResponse = await axios.get('http://localhost:5000/api/vaccine-records');
    const vaccinations = vaccinationResponse.data;
    vaccinationsAdministered.value = vaccinations.filter(v => v.status === 'administered').length;
    vaccinationsPending.value = vaccinations.filter(v => v.status === 'pending').length;

    if (healthRecords.value.length > 0) {
      const totalBMI = healthRecords.value.reduce((sum, record) => {
        const bmi = parseFloat(record.bmi);
        console.log(`BMI Value: ${bmi}`); // Debugging information
        return sum + (isNaN(bmi) ? 0 : bmi);
      }, 0);
      averageBMI.value = (totalBMI / healthRecords.value.length).toFixed(2);
      console.log(`Total BMI: ${totalBMI}, Average BMI: ${averageBMI.value}`); // Debugging information
    } else {
      averageBMI.value = 'N/A';
    }

    boysCount.value = children.value.filter(child => child.gender.toLowerCase() === 'male').length;
    girlsCount.value = children.value.filter(child => child.gender.toLowerCase() === 'female').length;

    // Create the pie chart
    const ctx = document.getElementById('genderChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Boys', 'Girls'],
        datasets: [{
          data: [boysCount.value, girlsCount.value],
          backgroundColor: ['#36A2EB', '#FF6384']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                const percentage = ((context.raw / total) * 100).toFixed(2);
                return `${context.label}: ${context.raw} (${percentage}%)`;
              }
            }
          },
          datalabels: {
            color: '#fff',
            formatter: (value, context) => {
              const total = context.chart.data.datasets[0].data.reduce((sum, value) => sum + value, 0);
              const percentage = ((value / total) * 100).toFixed(2);
              return `${percentage}%`;
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<style scoped>
/* General Layout */
.admin-dashboard {
  display: flex;
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

/* Sidebar Styling */
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  width: 250px;
  height: calc(100vh - 60px);
  background-color: #ffffff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sidebar h2 {
  font-size: 1.2rem;
  color: #26a69a;
  margin-bottom: 15px;
  text-align: center;
}

.sidebar .nav-link {
  text-decoration: none;
  color: #333;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
}

.sidebar .nav-link:hover {
  background-color: #e0f7fa;
  color: #00796b;
}

.sidebar .nav-link.active {
  background-color: #26a69a;
  color: #fff;
}

.sidebar .nav-link-icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

/* Main Content Styling */
.dashboard-content {
  margin-left: 270px; /* Space for the sidebar */
  margin-top: 80px; /* Space for the header */
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: calc(100% - 270px);
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
  .sidebar {
    position: fixed;
    width: 100%;
    height: auto;
    top: 60px;
    left: 0;
    display: flex;
    flex-direction: column;
  }

  .dashboard-content {
    margin-left: 0;
    width: 100%;
  }

  .dashboard-footer {
    margin-left: 0;
    width: 100%;
  }
}

.summary-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #26a69a;
}

.summary-card {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.summary-item {
  flex: 1;
  min-width: 200px;
  text-align: center;
}

.summary-item h3 {
  margin-bottom: 10px;
  color: #26a69a;
}

.summary-item p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.chart-container {
  width: 30%;
  margin: 0 auto;
  margin-top: 20px;
}

.chart-title {
  text-align: center;
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #26a69a;
}
</style>