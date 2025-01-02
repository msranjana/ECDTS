<template>
  <v-container fluid>
    <v-row justify="center" align="center" style="height: 100vh;">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Sign Up</v-card-title>
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
            <v-btn text @click="$emit('switch-to-login')">Already have an account? Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { apiService } from '../services/apiService'; // Import the API service

export default {
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      role: null,
      roles: ['parent', 'admin'],
      rules: {
        required: value => !!value || 'Required.',
      },
      successMessage: '', // To hold success messages
      errorMessage: '', // To hold error messages
    };
  },
  methods: {
    async signup() {
      console.log('Attempting to sign up with username:', this.username); // Log the username being used for signup
      
      // Validate inputs
      if (!this.username || !this.password || !this.role) {
        this.errorMessage = 'Please fill in all fields.';
        return;
      }

      try {
        const response = await apiService.signup(this.username, this.password, this.role);

        // Check if the response status indicates success
        if (response.status === 201) {
          this.successMessage = 'Signup successful! You can now log in.';
          console.log('Signup successful:', response.data); // Log success response
        } else {
          console.warn('Unexpected response status:', response.status);
          this.errorMessage = 'Unexpected error occurred. Please try again.';
        }
      } catch (error) {
        console.error('Signup Error:', error);
        
        // Handle error messages from the backend or provide a default message
        if (error.response) {
          console.error('Error response data:', error.response.data); // Log error response data for more context
          this.errorMessage = error.response.data.error || 'Error signing up.Please try again.';
        } else if (error.request) {
          console.error('No response received:', error.request); // Log if no response was received
          this.errorMessage = 'No response from server. Please check your network connection.';
        } else {
          console.error('Error setting up request:', error.message); // Log any other errors
          this.errorMessage = 'Error signing up. Please try again.';
        }
      }
    },
  },
};
</script>
<style scoped>
/* Add any additional styles here */
</style>

<!-- <template>
  <v-container>
    <v-row justify="center" align="center" style="height: 100vh;">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Sign Up</v-card-title>
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
                :items="['parent', 'admin']"
                label="Role"
                :rules="[rules.required]"
                required
              ></v-select>
              <v-alert v-if="errorMessage" type="error" dismissible>
                {{ errorMessage }}
              </v-alert>
              <v-alert v-if="successMessage" type="success" dismissible>
                {{ successMessage }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="signup">Sign Up</v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="$emit('switch-to-login')">Already have an account? Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { apiService } from '../services/apiService';

const username = ref('');
const password = ref('');
const role = ref('');
const valid = ref(false);
const rules = { required: value => !!value || 'Required.' };
const errorMessage = ref('');
const successMessage = ref('');

async function signup() {
  if (!username.value || !password.value || !role.value) {
    errorMessage.value = 'Please fill in all fields.';
    return;
  }

  try {
    const response = await apiService.signup(username.value, password.value, role.value);

    if (response.data.success) {
      successMessage.value = 'User registered successfully. You can now login.';
      errorMessage.value = '';
    } else {
      errorMessage.value = response.data.error || 'Signup failed.';
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.error || 'Unable to sign up. Please try again later.';
  }
}
</script>
 -->
