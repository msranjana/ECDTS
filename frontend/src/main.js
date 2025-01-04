// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; // Ensure this path is correct
import 'vuetify/styles'; // Import Vuetify CSS styles
import router from './router'; // Import your router instance

const app = createApp(App);
app.use(router); // Ensure this line is present

app.use(vuetify); // Use Vuetify in your Vue app
app.mount('#app');
