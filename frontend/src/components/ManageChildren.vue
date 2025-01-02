<template>
    <div>
       <h2>Manage Children</h2>
       <form @submit.prevent="addChild">
         <input v-model="childName" placeholder="Child Name" required />
         <input type="date" v-model="dob" placeholder="Date of Birth" required />
         <input type="number" v-model="age" placeholder="Age" required />
         <select v-model="gender">
           <option value="">Select Gender</option> 
           <option value="male">Male</option> 
           <option value="female">Female</option> 
           <option value="other">Other</option> 
         </select> 
         <!-- Additional fields for parent details -->
         <input v-model="parentName" placeholder="Parent Name" required />
         <input v-model="parentContact" placeholder="Parent Contact" required />
         <input v-model="address" placeholder="Address" required />
         <button type="submit">Add Child</button> 
       </form>
  
       <!-- List of children -->
       <ul> 
         <li v-for="child in children" :key="child.child_id">{{ child.child_name }}</li> 
       </ul> 
    </div> 
  </template>
  
  <script setup>
  // Import necessary modules and define reactive variables.
  import { ref } from 'vue';
  import axios from 'axios';
  
  const childName = ref('');
  const dob = ref('');
  const age = ref('');
  const gender = ref('');
  const parentName= ref('');
  const parentContact= ref('');
  const address= ref('');
  const children= ref([]);
  
  // Function to add a child.
  async function addChild() {
     try {
         const response= await axios.post('/api/children', {
             child_name: childName.value,
             dob: dob.value,
             age: age.value,
             gender: gender.value,
             parent_name: parentName.value,
             parent_contact: parentContact.value,
             address: address.value,
         });
         
         fetchChildren(); // Refresh list after adding a new child.
         clearForm();
     } catch (error) {
         console.error('Error adding child:', error);
     }
  }
  
  // Function to fetch all children.
  async function fetchChildren() {
     try {
         const response= await axios.get('/api/children'); // Fetch all children from API.
         children.value= response.data; 
     } catch (error) {
         console.error('Error fetching children:', error);
     }
  }
  
  // Function to clear form inputs.
  function clearForm() {
     childName.value= '';
     dob.value= '';
     age.value= '';
     gender.value= '';
     parentName.value= '';
     parentContact.value= '';
     address.value= '';
  }
  
  // Fetch children when component mounts.
  fetchChildren(); 
  </script>
  
  <style scoped>

  
  </style>
  