import { createWebHistory, createRouter } from "vue-router";
import chapter_1 from "@/views/chapter_1.vue";
import chapter_2 from "@/views/chapter_2.vue";
import chapter_3 from "@/views/chapter_3.vue";
import chapter_4 from "@/views/chapter_4.vue";
import chapter_5 from "@/views/chapter_5.vue";

const routes = [
  {
    path: "/chapter_1",
    name: "chapter_1",
    component: chapter_1,
  },
  {
    path: "/chapter_2",
    name: "chapter_2",
    component: chapter_2,
  },
  {
    path: "/chapter_3",
    name: "chapter_3",
    component: chapter_3,
  },
  {
    path: "/chapter_4",
    name: "chapter_4",
    component: chapter_4,
  },
  {
    path: "/chapter_5",
    name: "chapter_5",
    component: chapter_5,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;