import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from 'vee-validate/dist/rules';
import HomeAfterLog from "../views/Home_afterlogin"
import EditProfile from "../views/EditProfile"

Vue.use(VueRouter);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/:username",
      name: "HomeAfterLog",
      component: HomeAfterLog
    },
    {
      path: "/:username/edit",
      name: "EditProfile",
      component: EditProfile
    },
  ]
});

const openRoutes = ['Home', 'Register'];

router.beforeEach((to, from, next) => {
  if (openRoutes.includes(to.name)) {
    next()
  }
  else if (window.localStorage.getItem('accessToken')) {
    next()
  }
  else next('/')
})

export default router;
