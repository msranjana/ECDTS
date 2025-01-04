<template>
  <div class="parent-dashboard">
    <header class="dashboard-header">
      <h1>Parent Dashboard</h1>
    </header>

    <nav class="dashboard-nav">
      <router-link to="/parent/manage-children" class="nav-link">Manage My Child's Details</router-link>
      <router-link to="/parent/manage-vaccines" class="nav-link">Manage My Child's Vaccination Records</router-link>
      <!-- Add more links as needed -->
    </nav>

    <main class="dashboard-content">
      <div v-if="parent">
        <h2>Welcome, {{ parent.username }}</h2>
        <p>Email: {{ parent.email }}</p>
        <button @click="editProfile">Edit Profile</button>
      </div>
      <div v-if="children.length > 0">
        <h2>My Children</h2>
        <ul>
          <li v-for="child in children" :key="child.child_id">
            {{ child.child_name }} - {{ child.age }} years old
            <button @click="editChild(child)">Edit</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No children available.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const parent = ref(null);
const children = ref([]);
const router = useRouter();

const fetchParentDetails = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/parent/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    parent.value = response.data.parent;
    children.value = response.data.children;
  } catch (error) {
    console.error('Error fetching parent details:', error);
  }
};

const editProfile = () => {
  router.push('/parent/edit-profile');
};

const editChild = (child) => {
  router.push(`/parent/edit-child/${child.child_id}`);
};

onMounted(fetchParentDetails);
</script>

<style scoped>
/* General layout styling */
.parent-dashboard {
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
  padding: 20px 0;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Navigation menu styling */
.dashboard-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #b2dfdb;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.nav-link {
  text-decoration: none;
  color: #26a69a;
  font-size: 1.1rem;
  padding: 10px 20px;
  border: 1px solid #26a69a;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.nav-link:hover {
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
  .dashboard-nav {
    flex-direction: column;
    align-items: center;
  }

  .nav-link {
    width: 100%;
    text-align: center;
  }
}
</style>
