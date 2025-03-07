<template>
  <header class="dashboard-header">
      <div class="header-container">
        <h1>EarlyCare - An Early Child Development Tracking System</h1>
      </div>
      <div class="profile-menu">
          <button class="back-to-dashboard" @click="goToDashboard">Back to Homepage</button> <!-- Add this line -->
          
        </div>
    </header>
  <v-container>
    <v-row justify="center" align="center" style="height: 100vh;">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Login Page</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="username"
                label="Username"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :rules="[rules.required]"
                type="password"
                required
              ></v-text-field>
              <v-alert v-if="errorMessage" type="error" dismissible>
                {{ errorMessage }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="login">Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="switchToSignUp">Don't have an account? Sign Up</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <footer class="dashboard-footer">
      <p>&copy; 2025 EarlyCare. All rights reserved.</p>
    </footer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '../services/apiService';

// Setup reactive variables
const router = useRouter();
const valid = ref(false);
const username = ref('');
const password = ref('');
const rules = { required: value => !!value || 'Required.' };
const errorMessage = ref('');

// Login function
async function login() {
  if (!username.value || !password.value) {
    errorMessage.value = 'Please fill in all fields.';
    return;
  }

  try {
    const response = await apiService.login(username.value, password.value);
    console.log("Full Response:", response);
    console.log("Response Data:", response.data);

    if (response.status === 200) {
      const { id, username: loggedInUsername, role } = response.data; // Extract necessary values
      console.log("User Role:", role); // Log the role

      // Save token and user data in localStorage
      localStorage.setItem('id', id);
      localStorage.setItem('username', loggedInUsername);
      localStorage.setItem('role', role);

      console.log('Logged in username:', loggedInUsername); // For debugging
      console.log('User role:', role);

      errorMessage.value = '';

      // Display the success message (pop-up)
      alert('Login successful!');

      // Redirect based on user role
      if (role === 'admin') {
        console.log("Redirecting to admin-dashboard");
        await router.push({ name: 'admin-dashboard' }); // Use the named route
      } else if (role === 'parent') {
        console.log("Redirecting to parent-dashboard");
        window.location.href = 'http://localhost:8081/parent-dashboard'; // Redirect to specific URL
      } else {
        await router.push('/user-dashboard'); // Use relative path as fallback
      }
    } else {
      errorMessage.value = response.data.error || 'Invalid credentials.';
    }
  } catch (error) {
    console.error('Error occurred during login:', error); // Log the error

    // Check if the error contains a response object, and log it
    if (error.response) {
      console.error('Error Response:', error.response);
      errorMessage.value = error.response?.data?.error || 'Unable to login. Please try again later.';
    } else {
      // If there's no response, it may be a network error or something else
      console.error('No response received:', error);
      //errorMessage.value = 'Unable to connect to the server. Please try again later.';
    }
  }
}

const switchToSignUp = () => {
  router.push({ name: 'signup' });
};

const goToDashboard = () => {
  window.location.href = '/'; // Add this function
};
</script>

<style scoped>
/* Add any additional styles here */

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
.profile-menu {
  position: relative;
}

.profile-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
}
</style>

