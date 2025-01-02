<template>
    <div>
        <h1>Parent Dashboard</h1>
        <router-link to="/parent/manage-children">Manage My Child's Details</router-link>
        <router-link to="/parent/manage-vaccines">Manage My Child's Vaccination Records</router-link>
        <!-- Add more links as needed -->
        <ManageChildren />
        <!-- Other components can be included here -->
    </div>
   </template>
   
   <script setup>
   import ManageChildren from './ManageChildren.vue';
   </script>
   
   <style scoped>
   /* Add styles here */
   </style>
   