<template>
  <div id="app">
    <component :is="currentComponent" @switch-to-signup="showSignup" @switch-to-login="showLogin" />
  </div>
</template>

<script>
// Import both components
import Login from './components/UserLogin.vue';
import Signup from './components/SignUp.vue';

export default {
  data() {
    return {
      currentComponent: 'Login', // Start with the Login component
    };
  },
  components: {
    Login,
    Signup,
  },
  methods: {
    showSignup() {
      this.currentComponent = 'Signup'; // Switch to Signup component
    },
    showLogin() {
      this.currentComponent = 'Login'; // Switch back to Login component
    },
  },
};
</script>

<style scoped>
/* Improve global styling for better performance */
#app {
  background-color: #f5f5f5; /* Light gray background */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

/* Flexbox to center the login and signup forms */
.v-card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  border-radius: 8px; /* Rounded corners */
  max-width: 400px; /* Limit card width */
  width: 100%;
  margin: 20px;
}

/* Padding and spacing for the container */
.v-container {
  padding: 20px;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  /* Adjust for smaller screens */
  #app {
    padding: 10px; /* Reduce padding on small screens */
  }

  .v-card {
    width: 100%; /* Allow card to take full width on small screens */
    margin: 10px 0;
  }
}
</style>
