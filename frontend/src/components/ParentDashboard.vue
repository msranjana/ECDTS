<template>
    <div class="parent-dashboard">
      <!-- Sidebar Section -->
      <aside class="sidebar">
        <ul>
          <h2>Parent Dashboard</h2>
          <br>
          <li>
            <router-link to="/" class="sidebar-link">Home Page</router-link>
          </li>
          <li>
            <a href="http://localhost:8081/parent-dashboard" class="sidebar-link">Verify Child Info</a>
          </li>
          <li>
            <a href="http://localhost:8081/login" class="sidebar-link">Logout </a>
          </li>
        </ul>
      </aside>
  
      <!-- Main Content Section -->
      <div class="main-content">
        <!-- Header Section -->
        <header class="dashboard-header">
          <div class="header-container">
            <h1>EarlyCare - An Early Child Development Tracking System</h1>
          </div>
          
        </header>
  
        <!-- Main Content -->
        <main class="dashboard-content">
          <!-- Grid Container -->
          <div class="grid-container">
            <!-- Section 1: Search Child Section -->
            <section class="grid-item">
              <h3>Search here for Child Details</h3>
              <br>
              <v-text-field
                v-model="searchChildId"
                label="Enter Child ID"
                outlined
                clearable
              ></v-text-field>
              <button class="primary-button" @click="searchChild">Search</button>
              <div v-if="childDetails" class="child-details">
                <h3>Child Info</h3>
                <p><strong>Child ID:</strong> {{ childDetails.child_id }}</p>
                <p><strong>Name:</strong> {{ childDetails.child_name }}</p>
                <p><strong>Age:</strong> {{ childDetails.age }}</p>
                <p><strong>Gender:</strong> {{ childDetails.gender }}</p>
                <p><strong>Parent Name:</strong> {{ childDetails.parent_name }}</p>
                <p><strong>Contact:</strong> {{ childDetails.parent_contact }}</p>
                <p><strong>Address:</strong> {{ childDetails.address }}</p>
              </div>
            </section>
  
            <!-- Section 2 -->
            <section class="grid-item">
  <h3>Emergency Contacts</h3>
  <p>Please keep these contacts handy in case of urgent situations.</p>
  
  <!-- Emergency Contact for Hospitals -->
  <div class="contact-section">
    <h3>Hospitals</h3>
    <div class="contact-item">
      <strong>Hospital Name:</strong> <span>Aj Hospital, Mangalore</span>
    </div>
    <div class="contact-item">
      <strong>Phone:</strong> <span>23456777</span>
    </div>
    <br>
    <div class="contact-item">
      <strong>Hospital Name:</strong> <span>Omega Hospital, Mangalore</span>
    </div>
    <div class="contact-item">
      <strong>Phone:</strong> <span>567876555</span>
    </div>
  </div>
  
  <!-- Emergency Contact for Doctors -->
  <div class="contact-section">
    <h3>Doctors</h3>
    <div class="contact-item">
      <strong>Doctor Name:</strong> <span>Dr.Jane Doe, Pediatrician</span>
    </div>
    <div class="contact-item">
      <strong>Phone:</strong> <span>6888886543</span>
    </div>
    <br>
    <div class="contact-item">
      <strong>Doctor Name:</strong> <span>Dr.John , Pediatrician</span>
    </div>
    <div class="contact-item">
      <strong>Phone:</strong> <span>6789998744</span>
    </div>
  </div>
</section>
  
            <!-- Section 3 -->
<section class="grid-item">
  <h3>Parenting Resources for New Parents</h3>
  <p>Welcome to the adventure of parenthood! As a new parent, you're embarking on an exciting and sometimes overwhelming journey. Here are some trusted links to help you along:</p>
  <ul>
    <li>
      <a href="https://www.parenting.com/" target="_blank">Parenting.com</a> - Articles on child development & practical tips for new parents.
    </li>
    <li>
      <a href="https://www.babychakra.com/blog" target="_blank">BabyChakra Blog</a> - A platform offering parenting tips, baby care, and expert advice.
    </li>
    <li>
      <a href="https://www.momjunction.com/" target="_blank">MomJunction</a> - Indian website with parenting articles, baby names, health tips, and much more.
    </li>
    <li>
      <a href="https://www.indiaparenting.com/" target="_blank">IndiaParenting</a> - Indian resource with a focus on parenting advice, child development, and family health.
    </li>
    <li>
      <a href="https://www.babycenter.in/" target="_blank">BabyCenter India</a> - Offers advice on pregnancy, baby care, and early childhood development from an Indian perspective.
    </li>
    
  </ul>
  
  <p>Take your time to explore these resources ♡</p>
</section>

          </div>
        </main>
  
        <!-- Footer Section -->
        <footer class="dashboard-footer">
          <p>&copy; 2025 EarlyCare. All rights reserved.</p>
        </footer>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Reactive variables for parent and children data
const searchChildId = ref("");
const childDetails = ref(null);

// Search for child details by child ID
const searchChild = async () => {
  console.log("Search button clicked"); // Debugging step
  if (!searchChildId.value) {
    alert("Please enter a child ID.");
    return;
  }

  try {
    console.log(`Fetching details for child ID: ${searchChildId.value}`); // Debugging step
    const response = await axios.get(
      `http://localhost:5000/api/children/${searchChildId.value}`
    );
    childDetails.value = response.data; // Store the fetched child details
    console.log("Child details fetched:", childDetails.value); // Debugging step
  } catch (error) {
    console.error("Error fetching child details:", error); // Debugging step
    if (error.response && error.response.status === 404) {
      alert("Child not found.");
    } else {
      alert("An error occurred while searching for the child. Please try again later.");
    }
    childDetails.value = null;
  }
};

// Fetch parent details on component mount (optional, if needed)
onMounted(() => {
  // You can add logic here to fetch initial parent/child details if required
});


</script>

<style scoped>
/* General Layout */
.parent-dashboard {
  display: flex;
  font-family: 'Arial', sans-serif;
  background-color: #f4f7f9;
  height: 100vh;
}

/* Sidebar Styling */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  background-color: #18b4a4;
  padding: 20px;
  height: 100%;
  color: white;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar-link {
  display: block;
  color: white;
  text-decoration: none;
  padding: 10px 0;
  font-size: 20px;
}

.sidebar-link:hover {
  background-color: #0ca291;
  border-radius: 4px;
}

/* Main Content */
.main-content {
  margin-left: 250px;
  width: calc(100% - 250px);
  padding: 20px;
  background-color: white;
  border-radius: 8px;
}

/* Fixed Header */
.dashboard-header {
  position: fixed;
  top: 0;
  left: 250px;
  width: calc(100% - 250px);
  height: 60px;
  background-color: #26a69a;
  color: #fff;
  text-align: center;
  line-height: 60px;
  z-index: 1000;
}

.header-container h1 {
  margin: 0;
  font-size: 24px;
}

/* Grid Layout */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 80px; /* For fixed header */
}

.grid-item {
  background-color: #e0f7fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Footer Styling */
.dashboard-footer {
  position: fixed;
  bottom: 0;
  left: 250px;
  width: calc(100% - 250px);
  background-color: #26a69a;
  color: white;
  text-align: center;
  padding: 10px;
  z-index: 1000;
}


/* Child Details Section Styling */

.child-details {
  background-color: #fff;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  text-align: left; /* Align all content to the left */
}

/* Header Styling */
.child-details h3 {
  font-size: 1.5rem;
  color: #26a69a;
  margin-bottom: 15px;
  font-weight: 600;
  text-align: left; /* Align header to left */
}

.child-details p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 10px;
  text-align: left; /* Align text to left */
}

.child-details p strong {
  color: #00796b;
  font-weight: bold;
}

.child-details p:last-child {
  margin-bottom: 0; /* Remove bottom margin for the last element */
}
.contact-section {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #e0f7fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-item {
  margin-bottom: 10px;
  font-size: 16px;
  text-align: left;
}

.contact-item strong {
  color: #00796b;
}

.contact-item span {
  color: #333;
}

/* Search Button Styling */
.primary-button {
  background-color: #26a69a;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: auto; /* Adjusts width based on content */
  margin-top: 10px;
  display: inline-block;
}

.primary-button:hover {
  background-color: #0ca291; /* Darker shade on hover */
  transform: translateY(-2px); /* Subtle lift effect */
}

.primary-button:focus {
  outline: none;
  box-shadow: 0 0 4px 2px rgba(38, 166, 154, 0.5); /* Focus state */
}

.primary-button:disabled {
  background-color: #c1c1c1;
  cursor: not-allowed;
}

.primary-button:active {
  background-color: #00796b; /* Darker color on click */
  transform: translateY(0); /* Removes lift effect when pressed */
}

/* Section 3 Styles */
.grid-item {
  
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.grid-item h2 {
  font-size: 1.8rem;
  color: #26a69a;
  text-align: left;
  margin-bottom: 15px;
  text-align: left; /* Align all content to the left */

}

.grid-item p {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: left; /* Align all content to the left */

}

.grid-item ul {
  list-style: none;
  padding-left: 0;
  text-align: left; /* Align all content to the left */

}

.grid-item ul li {
  margin-bottom: 15px;
  text-align: left; /* Align all content to the left */

}

.grid-item ul li a {
  text-decoration: none;
  font-size: 1rem;
  color: #00796b;
  font-weight: 500;
  transition: color 0.3s ease;
  text-align: left; /* Align all content to the left */

}

.grid-item ul li a:hover {
  color: #004d40;
  text-align: left; /* Align all content to the left */

}

.grid-item p:last-child {
  font-style: italic;
  color: #555;
  margin-top: 5px;

}

.grid-item a {
  cursor: pointer;
}



</style>

