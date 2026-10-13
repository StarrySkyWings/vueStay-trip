import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("@/views/Home/home.vue"),
    },
    {
      path: "/favor",
      component: () => import("@/views/Favor/favor.vue"),
    },
    {
      path: "/order",
      component: () => import("@/views/Order/order.vue"),
    },
    {
      path: "/message",
      component: () => import("@/views/Message/message.vue"),
    },
    {
      path: "/city",
      component: () => import("@/views/City/city.vue"),
      // meta: {
      //   hidden: true,
      // },
    },
  ],
});

export default router;
