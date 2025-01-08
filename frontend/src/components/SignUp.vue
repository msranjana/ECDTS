<template>
  <header class="dashboard-header">
      <div class="header-container">
        <h1>EarlyCare - An Early Child Development Tracking System</h1>
      </div>
      <div class="profile-menu">
          <button class="back-to-dashboard" @click="goToDashboard">Back to Homepage</button> <!-- Add this line -->
          
        </div>
    </header>
  <v-container fluid>
    <v-row justify="center" align="center" style="height: 100vh;">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Sign Up Page </v-card-title>
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
              <v-select
                v-model="role"
                :items="roles"
                label="Select Role"
                :rules="[rules.required]"
                required
              ></v-select>
              <v-alert v-if="successMessage" type="success" dismissible>{{ successMessage }}</v-alert>
              <v-alert v-if="errorMessage" type="error" dismissible>{{ errorMessage }}</v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="signup">Sign Up</v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="switchToLogin">Already have an account? Login</v-btn>
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

const router = useRouter();
const valid = ref(false);
const username = ref('');
const password = ref('');
const role = ref(null);
const roles = ['parent', 'admin'];
const rules = { required: value => !!value || 'Required.' };
const successMessage = ref('');
const errorMessage = ref('');

async function signup() {
  if (!username.value || !password.value || !role.value) {
    errorMessage.value = 'Please fill in all fields.';
    return;
  }

  try {
    const response = await apiService.signup(username.value, password.value, role.value);

    if (response.status === 201) {
      successMessage.value = 'Signup successful! You can now log in.';
    } else {
      errorMessage.value = 'Unexpected error occurred. Please try again.';
    }
  } catch (error) {
    if (error.response) {
      errorMessage.value = error.response.data.error || 'Error signing up. Please try again.';
    } else if (error.request) {
      errorMessage.value = 'No response from server. Please check your network connection.';
    } else {
      errorMessage.value = 'Error signing up. Please try again.';
    }
  }
}

const switchToLogin = () => {
  router.push({ name: 'login' });
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
