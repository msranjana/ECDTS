//import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router'; // Make sure to use these imports from 'vue-router'

//import VueRouter from 'vue-router';
import SignUp from '../components/SignUp.vue'; // Adjust path as necessary
import UserLogin from '../components/UserLogin.vue';
import AdminDashboard from '../components/AdminDashboard.vue';

//Vue.use(VueRouter);

const routes = [
    { path: '/', component: UserLogin, name: 'login' },
    {
        path: '/signup', // The path where SignUp component will be rendered
        name: 'SignUp',
        component: SignUp
      },
    {
        path: '/admin-dashboard',
        name: 'admin-dashboard',
        component: AdminDashboard
      },
     
      ];


/*const router = new VueRouter({
    mode: 'history', // Use history mode if you want clean URLs
    routes,
});
*/
const router = createRouter({
    history: createWebHistory(), // Ensure you are using createWebHistory() for Vue Router 4.x
    routes // Your routes array
  });

  
export default router;


// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// router.post('/signup', async (req, res) => {
//   const { username, password, role } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, password: hashedPassword, role });
//     await user.save();
//     res.status(201).json({ success: true, message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Signup failed' });
//   }
// });

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.status(200).json({ success: true, user: { id: user._id, username: user.username, role: user.role }, token });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Login failed' });
//   }
// });

// module.exports = router;
