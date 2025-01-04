<template>
  <div class="admin-dashboard">
    <header class="dashboard-header">
      <h1>EarlyCare</h1>
    </header>

    <nav class="main-nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <a href="#about-us" class="nav-link">About Us</a>
      <router-link to="/contact-us" class="nav-link">Contact Us</router-link>
      <router-link to="/admin-dashboard" class="nav-link">Admin Dashboard</router-link>
    </nav>

    <div class="about-us-and-picture" id="about-us">
      <section class="about-us">
        <h2>About Us</h2>
        <p>
          Enabling seamless oversight and management of health, vaccination, and developmental records. Designed for accuracy and process efficiency, it streamlines administrative tasks for better decision-making.
        </p>
      </section>
      <section class="kids-picture">
        <img src="https://media.istockphoto.com/id/1366097101/photo/shot-of-an-adorable-baby-covered-in-a-towel-after-bath-time.jpg?b=1&s=612x612&w=0&k=20&c=T3tYgayNRS7koziVRIjYbAphxviBfCHT9FaE26X1e9Q=" alt="Kid's Picture" />
      </section>
    </div>

    <nav class="dashboard-nav">
      <div class="nav-column">
        <router-link to="/admin/manage-vaccines" class="nav-link">Manage Vaccines</router-link>
        <router-link to="/admin/manage-children" class="nav-link">Manage Children</router-link>
        <router-link to="/admin/manage-physical-records" class="nav-link">Manage Physical Records</router-link>
        <router-link to="/admin/manage-vaccine-records" class="nav-link">Manage Vaccine Records</router-link>
      </div>
      <div class="nav-column">
        <router-link to="/admin/view-caretakers" class="nav-link">Manage Caretakers</router-link>
        <router-link to="/admin/view-hospitals" class="nav-link">Manage Hospitals</router-link>
        <router-link to="/admin/manage-health-records" class="nav-link">Manage Health Records</router-link>

      </div>
    </nav>

      <main class="dashboard-content">
        <!-- Nested router-view to render content dynamically -->
        <router-view></router-view>
      </main>
  </div>
</template>

<script setup>
// Admin-specific logic can go here if needed.
import { ref, onMounted } from 'vue';
import axios from 'axios';

const children = ref([]);

// Fetch children data from the backend when the component is mounted
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/children');
    children.value = response.data; // Store fetched children data
  } catch (error) {
    console.error('Error fetching children data:', error);
  }
});
</script>

<style scoped>
/* General layout styling */
.admin-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #e0f7fa;
  font-family: 'Arial', sans-serif;
}

/* Header styling */
.dashboard-header {
  background-color: #26a69a;
  color: #fff;
  width: 100%;
  padding: 9px 0; /* Decreased height */
  text-align: center;
  font-size: 2rem; /* Adjusted font size */
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensure the header is on top */
  position: sticky; /* Make the header stick to the top */
  top: 0; /* Position it at the top */
}

/* Main navigation menu styling */
.main-nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #b2dfdb;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.main-nav .nav-link {
  text-decoration: none;
  color: #26a69a;
  font-size: 1.1rem;
  padding: 10px 20px;
  border: 1px solid #26a69a;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.main-nav .nav-link:hover {
  background-color: #00796b;
  color: #fff;
  transform: scale(1.05);
}

/* About Us and Kid's picture section */
.about-us-and-picture {
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
}

.about-us {
  flex: 1;
  margin-right: 20px;
  text-align: center;
}

.about-us h2 {
  color: #26a69a;
  margin-bottom: 10px;
}

.about-us p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
}

.kids-picture {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.kids-picture img {
  max-width: 100%;
  border-radius: 8px;
}

/* Dashboard navigation menu styling */
.dashboard-nav {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #b2dfdb;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.nav-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.dashboard-nav .nav-link {
  text-decoration: none;
  color: #26a69a;
  font-size: 1.1rem;
  padding: 10px 20px;
  border: 1px solid #26a69a;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.dashboard-nav .nav-link:hover {
  background-color: #00796b;
  color: #fff;
  transform: scale(1.05);
}

/* Main content area */
.dashboard-content {
  padding: 20px;
  width: 90%;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

/* Responsive design */
@media (max-width: 768px) {
  .main-nav,
  .dashboard-nav {
    flex-direction: column;
    align-items: center;
  }

  .nav-link {
    width: 100%;
    text-align: center;
  }

  .about-us-and-picture {
    flex-direction: column;
    align-items: center;
  }

  .about-us {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .nav-column {
    width: 100%;
  }
}
</style>
