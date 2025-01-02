<template>
    <div>
       <h2>Manage Vaccines</h2>
       <form @submit.prevent="addVaccine">
         <input v-model="vaccineName" placeholder="Vaccine Name" required />
         <input v-model="vaccineType" placeholder="Vaccine Type" required />
         <input v-model="mfgCompany" placeholder="Manufacturer Company" required />
         <button type="submit">Add Vaccine</button>
       </form>
  
       <ul>
         <li v-for="vaccine in vaccines" :key="vaccine.v_id">{{ vaccine.v_name }}</li> <!-- Display vaccine names -->
       </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const vaccineName = ref('');
  const vaccineType = ref('');
  const mfgCompany = ref('');
  const vaccines = ref([]);
  
  async function addVaccine() {
     try {
         const response = await axios.post('/api/vaccine', {
             v_name: vaccineName.value,
             v_type: vaccineType.value,
             mfg_company: mfgCompany.value,
         });
         fetchVaccines(); // Refresh the list after adding a new vaccine.
         clearForm();
     } catch (error) {
         console.error('Error adding vaccine:', error);
     }
  }
  
  async function fetchVaccines() {
     try {
         const response = await axios.get('/api/vaccine'); // Fetch all vaccines from API.
         vaccines.value = response.data; 
     } catch (error) {
         console.error('Error fetching vaccines:', error);
     }
  }
  
  function clearForm() {
     vaccineName.value = '';
     vaccineType.value = '';
     mfgCompany.value = '';
  }
  
  fetchVaccines(); // Fetch vaccines when component mounts.
  </script>
  
  <style scoped>
  /* Add styles here */
  </style>
  