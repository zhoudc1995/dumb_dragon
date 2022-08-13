/*
 * @Author: 周东晨 mr_zhoudc@163.com
 * @Date: 2022-07-29 09:18:09
 * @LastEditors: 周东晨 mr_zhoudc@163.com
 * @LastEditTime: 2022-08-13 12:55:46
 * @FilePath: /code/vue3/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "dumb" */ "@/views/home.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        meta: {
          title: "Links",
        },
        component: () =>
          import(/* webpackChunkName: "dumb" */ "@/views/index.vue"),
      },
      {
        path: "/art",
        name: "art",
        meta: {
          title: "Links",
        },
        component: () =>
          import(/* webpackChunkName: "dumb" */ "@/views/art.vue"),
      },
      {
        path: "/experments",
        name: "experments",
        meta: {
          title: "Links",
        },
        component: () =>
          import(/* webpackChunkName: "dumb" */ "@/views/experments.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
