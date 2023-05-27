import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";

export default createRouter({
  routes: [{ path: "/", component: Home }],
  history: createWebHistory(),
});
