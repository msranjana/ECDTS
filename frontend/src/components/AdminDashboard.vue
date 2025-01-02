<template>
  <div>
    <h1>Admin Dashboard</h1>
    <router-link to="/admin/manage-vaccines">Manage Vaccines</router-link><br/>
    <router-link to="/admin/manage-children">View All Children</router-link><br/>
    <router-link to="/admin/manage-physical-records">Manage Physical Records</router-link><br/>
    <router-link to="/admin/manage-health-records">Manage Health Records</router-link><br/>
    <router-link to="/admin/manage-caretakers">Manage Caretakers</router-link><br/>
    <router-link to="/admin/manage-hospitals">Manage Hospitals</router-link><br/>
    <router-link to="/admin/manage-vaccine-records">Manage Vaccine Records</router-link><br/>
    
    <!-- Router view for nested components -->
    <router-view></router-view> 
  </div>
</template>

<script setup>
// Logic specific to admin dashboard can go here.
//const userRole = JSON.parse(localStorage.getItem('user')).role;
// const isAdmin = userRole === 'admin';
</script>

<style scoped>
/* Add styles here */
</style>
