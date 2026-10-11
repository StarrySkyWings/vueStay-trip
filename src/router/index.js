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
      component:() => import('@/views/Home/home.vue'),
    },
    {
      path: "/favor",
      component:() => import('@/views/Favor/favor.vue'),
    },
    {
      path: "/order",
      component:() => import('@/views/Order/order.vue'),
    },
    {
      path: "/message",
      component:() => import('@/views/Message/message.vue'),
    },
  ],
});

export default router;
