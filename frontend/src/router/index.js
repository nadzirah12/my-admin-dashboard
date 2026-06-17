import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/DashboardLayout.vue";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Users from "../views/Users.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
      },
    ],
  },
  {
    path:"/login",
    name:"login",
    component:Login
   },
   {
    path:"/dashboard",
    name:"dashboard",
    component:Dashboard,
    beforeEnter:(to,from,next)=>{

      const token =
      localStorage.getItem("token");
     
     
      if(token){
         next();
      }
      else{
         next("/login");
      }
     
      }
   },
   {
    path: "/users",
    component: Users
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;