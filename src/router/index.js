import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/:unit(.*)?",
    name: "home",
    component: HomeView,
  },
  {
    path: "/address/:address",
    name: "address",
    component: () => import("../views/AddressView.vue"),
  },
  {
    path: "/asset/:asset(.*)",
    name: "asset",
    component: () => import("../views/AssetView.vue"),
  },
];

export const createRouter = () => {
  return _createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
};
