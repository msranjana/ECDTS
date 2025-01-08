// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; // Ensure this path is correct
import 'vuetify/styles'; // Import Vuetify CSS styles
import router from './router'; // Import your router instance
import { BootstrapVue3, BIcon, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

const app = createApp(App);
app.use(router); // Ensure this line is present

app.use(vuetify); // Use Vuetify in your Vue app
app.use(BootstrapVue3);
app.component('BIcon', BIcon);
app.component('BIconArrowUp', BIconArrowUp);
app.component('BIconArrowDown', BIconArrowDown);
app.mount('#app');
