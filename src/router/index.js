import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import SignUp from '../views/SignUp.vue'
import News from '../views/News.vue'

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
    meta: {
      title: 'SignUp'
    }
  },
  {
    path: "/news",
    name: "News",
    component: News,
    meta: {
      title: 'News'
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | NewsApp`;
  next();
});

export default router;
