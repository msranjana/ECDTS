<template>
  <div>
    <!-- Navbar -->
    <b-navbar toggleable="lg" type="light" variant="primary" fixed="top" class="navbar-theme">
      <b-navbar-brand href="#">EarlyCare</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="http://localhost:8081/">Home</b-nav-item>
          <b-nav-item href="#about-us">About Us</b-nav-item>
          <b-nav-item href="http://localhost:8081/signup">Sign Up</b-nav-item>
          <b-nav-item href="http://localhost:8081/login">Login</b-nav-item>
          <b-nav-item href="#features">Features</b-nav-item>
          <b-nav-item href="#faq">FAQ</b-nav-item>
        </b-navbar-nav>
        <!-- Remove the search bar -->
      </b-collapse>
    </b-navbar>

    <!-- Carousel -->
    <div class="carousel-container">
      <splide :options="{ autoplay: true, interval: 4000, type: 'loop' }">
        <splide-slide>
          <div class="slide-content">
          <img src="https://www.pixelstalk.net/wp-content/uploads/2016/04/Baby-boy-laugh-smile-backgrounds-wallpapers.jpg" alt="Slide 1" /> <!-- Update the image path -->
          <div class="text-overlay">WELCOME TO EARLYCARE !</div>
        </div>
        </splide-slide>
        <splide-slide>
          <img src="https://www.aimsindia.com/wp-content/uploads/2019/10/polio.jpg" alt="Slide 2" /> <!-- Update the image path -->
        </splide-slide>
        <splide-slide>
          <img src="https://pediatrixmd.com/wp-content/uploads/2019/02/A-First-Time-Mothers-Guide-to-Newborn-Care.jpg" alt="Slide 3" /> <!-- Update the image path -->
        </splide-slide>
      </splide>
    </div>
    <!-- About Us Section -->
    <section id="about-us" class="py-5">
      <div class="container">
        <div class="row">
          <!-- First Column: About Us -->
          <div class="col-md-6 text-left"> <!-- Add text-left class -->
            <h2>About Us</h2>
            <p class="mt-3">
Welcome to the Early Child Development Tracking System—a comprehensive solution designed to empower parents, healthcare providers, and administrators in monitoring and managing the developmental milestones and health records of children. Our project is built with the vision of creating a centralized and user-friendly platform to ensure the holistic growth and well-being of every child.
</p><br>
<h2>Features</h2>
<li>
Manage and view comprehensive child health records.</li>
<li>Maintain hospital and care provider databases.</li>
<li>Ensure data accuracy and security through streamlined workflows.</li>

          </div>
          
          <!-- Second Column: FAQ -->
          <div class="col-md-6">
            <h2>Frequently Asked Questions (FAQ)</h2>
            <ul class="list-unstyled">
              <li>
  <strong>When should I take my child for their first check-up?</strong>
  <p>At 6 weeks old.</p>
</li>
<li>
  <strong>How often should my child visit the pediatrician?</strong>
  <p>Every 6 months.</p>
</li>
<li>
  <strong>What vaccines are required for my child?</strong>
  <p>Your child will need various vaccines including DTP, polio, and MMR. Check with your pediatrician for a schedule.</p>
</li>
<li>
  <strong>What should I do if my child is sick?</strong>
  <p>Contact your pediatrician for advice, or visit the nearest clinic if necessary. Our platform also provides expert health tips.</p>
</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-0.1 footer-theme">
      <div class="container text-center">
        <p>&copy; {{ new Date().getFullYear() }} EarlyCare. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/splide.min.css';

export default {
  components: {
    Splide,
    SplideSlide,
  },
};
</script>

<style scoped>
.section-text {
  font-size: 1.2rem; /* Consistent font size */
  line-height: 1.8; /* Comfortable line height */
  margin-bottom: 20px;
}
/* Navbar Enhancements */
.b-navbar {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); /* Softer shadow for depth */
  font-size: 10rem; /* Slightly larger font */
  letter-spacing: 1px; /* Add spacing between letters */
  background: linear-gradient(to right, #003366, #00509e); /* Gradient background for a modern look */
}
.b-nav-item:hover {
  background-color: #549ce3; /* Highlight effect */
  border-radius: 5px; /* Add rounded corners */
  transition: all 0.3s ease; /* Smooth transitions */
}

/* Carousel Section */
.carousel-container {
  max-width: 1024px;
  margin: 50px auto; /* Center with top margin */
  padding-top: 150px; /* Adjust for fixed navbar */
}
.splide__slide img {
  width: 100%;
  border-radius: 10px; /* Add rounded corners to images */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
}
.text-overlay {
  color: #ffffff;
  font-size: 3.5rem;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8); /* Stronger shadow for emphasis */
  text-align: center;
  background: rgba(0, 0, 0, 0.6); /* Dark overlay for text readability */
  padding: 10px 20px;
  border-radius: 10px;
}

/* About Us Section */
#about-us {
  background: linear-gradient(to bottom, #e0f7fa, #c2f0f4); /* Add gradient for visual appeal */
  color: #004d40; /* Softer color contrast */
  border-top: 5px solid #00796b; /* Accent border */
  padding: 60px 20px; /* Increase padding */
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
}
#about-us h2 {
  color: #004d40;
  font-size: 2.4rem; /* Increase heading size */
  border-bottom: 2px solid #004d40; /* Underline for emphasis */
  display: inline-block;
  margin-bottom: 20px;
}
/*#about-us p {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 20px;
}*/

/* FAQ Section Enhancements */
#faq ul {
  padding: 0;
  list-style: none;
}
.faq-item {
  margin-bottom: 20px;
  padding: 15px;
  background: #ffffff; /* White background for contrast */
  border: 1px solid #e0f7fa; /* Border to separate items */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth animations */
}
.faq-item:hover {
  transform: translateY(-5px); /* Lift effect on hover */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Stronger shadow on hover */
}
.faq-question {
  font-size: 1.2rem;
  color: #00796b;
  cursor: pointer;
}
.faq-answer {
  font-size: 1.2rem;
  color: #555;
  padding-left: 20px;
}

/* Footer */
footer {
  background: linear-gradient(to right, #003366, #004d80); /* Gradient matching navbar */
  color: #ffffff;
  padding: 10px 0;
  text-align: center;
  border-top: 5px solid #00796b; /* Accent border */
}
footer p {
  margin: 0;
  font-size: 0.9rem;
}

</style>
