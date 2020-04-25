import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Payment from "../views/Payment.vue";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.use(VueRouter);

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/Payment/:username",
    name: "Payment",
    component: Payment
  }
];

const router = new VueRouter({
  routes
});

export default router;
