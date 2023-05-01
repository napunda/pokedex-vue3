// Composables
import { createRouter, createWebHistory } from "vue-router";

import About from "../views/About";
import Home from "../views/Home";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
