import { createRouter, createWebHistory } from "vue-router";

import Welcome from "../components/Welcome.vue";
import About from "../components/About.vue";
import Contact from "../components/Contact.vue";
import Edit from "../components/Edit.vue";
import Task from "../components/Task.vue";


const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact
  },
  {
    path: "/task/:id/edit",
    name: "Edit",
    component: Edit 
  },
  {
    path: "/task/:id",
    name: "Task",
    component: Task
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
