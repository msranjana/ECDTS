import { createRouter, createWebHistory } from 'vue-router';

import SignUp from '../components/SignUp.vue';
import UserLogin from '../components/UserLogin.vue';
import AdminDashboard from '../components/AdminDashboard.vue';
import ParentDashboard from '../components/ParentDashboard.vue';
import ManageVaccines from '../components/ManageVaccines.vue';
import ViewAllChildren from "../components/ViewAllChildren.vue";
import ManageCaretakers from '../components/ManageCaretakers.vue';
import ViewAllCaretakers from '../components/ViewAllCaretakers.vue';
import ViewAllHospitals from '../components/ViewAllHospitals.vue';
import ManagePhysicalRecords from '../components/ManagePhysicalRecords.vue';
import ManageHealthRecords from '../components/ManageHealthRecords.vue';

const routes = [
    { path: '/', component: UserLogin, name: 'login' },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/admin-dashboard',
        name: 'admin-dashboard',
        component: AdminDashboard,
        children: [
          {
            path: 'manage-vaccines',
            component: ManageVaccines,
          },
          {
            path: 'manage-children',
            component: ViewAllChildren
          },
          {
            path: 'manage-caretakers',
            component: ManageCaretakers
          },
          {
            path: 'view-caretakers',
            component: ViewAllCaretakers
          },
          {
            path: 'manage-physical-records',
            component: ManagePhysicalRecords
          },
          {
            path: 'manage-health-records',
            component: ManageHealthRecords
          }
        ]
    },
    { 
        path: "/admin/manage-children", 
        component: ViewAllChildren 
    },
    {
        path: '/parent-dashboard',
        name: 'parent-dashboard',
        component: ParentDashboard
    },
    {
        path: '/manage-children',
        name: 'manage-children',
        component: () => import('../components/ManageChildren.vue'),  // Lazy load
    },
    {
        path: '/admin/manage-vaccines',
        name: 'manage-vaccines',
        component: ManageVaccines
    },
    {
        path: '/admin/manage-children',
        name: 'manage-children',
        component: ViewAllChildren
    },
    {
        path: '/admin/manage-caretakers',
        name: 'manage-caretakers',
        component: ManageCaretakers
    },
    {
        path: '/admin/view-caretakers',
        name: 'view-caretakers',
        component: ViewAllCaretakers
    },
    {
      path: '/admin/view-hospitals',
      name: 'view-hospitals',
      component: ViewAllHospitals
  },
  {
      path: '/admin/manage-physical-records',
      name: 'manage-physical-records',
      component: ManagePhysicalRecords
  },
  {
      path: '/admin/manage-health-records',
      name: 'manage-health-records',
      component: ManageHealthRecords
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
