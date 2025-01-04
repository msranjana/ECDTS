<template>
  <v-container>
    <v-row justify="center" align="center" style="height: 100vh;">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
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
            <v-btn text @click="$emit('switch-to-signup')">Don't have an account? Sign Up</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '../services/apiService';

// Setup reactive variables
const router = useRouter(); // Uncommented to use router
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

      errorMessage.value = 'success';

      // Display the success message (pop-up)
      alert('Login successful!');

      // Redirect based on user role
      // if (role === 'admin') {
      //   console.log("Redirecting to admin-dashboard");
      //   await router.push('http://localhost:8082/admin-dashboard'); // Redirect to the admin dashboard
      // } else if (role === 'parent') {
      //   console.log("Redirecting to children-management");
      //   await router.push('http://localhost:8082/parent-dashboard');
      // } else {
      //   await router.push('/user-dashboard'); // Fallback for other roles
      // }
      if (role === 'admin') {
  console.log("Redirecting to admin-dashboard");
  await router.push({ name: 'admin-dashboard' }); // Use the named route
} else if (role === 'parent') {
  console.log("Redirecting to children-management");
  await router.push({ name: 'children-management' }); // Use the named route
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
      errorMessage.value = 'Unable to connect to the server. Please try again later.';
    }
  }
}

</script>

<style scoped>
/* Add any additional styles here */
</style>

