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
            <v-btn text @click="switchToLogin">Already have an account? Login</v-btn>
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

</script>

<style scoped>
/* Add any additional styles here */
</style>
