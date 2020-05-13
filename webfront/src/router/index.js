import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Payment from "../views/Payment";
import Register from "../views/Register";
import HomeAfterLog from "../views/Home_afterlogin";
import EditProfile from "../views/EditProfile";
import allType from "../views/RoomType";
import RoomDetail from "../views/RoomDetail";
import Booking from "../views/Booking";
import Vuex from "vuex";

Vue.use(Vuex);
Vue.use(VueRouter);

import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.use(VueRouter);

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

let router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/payment",
      name: "Payment",
      component: Payment
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/roomtype",
      name: "allType",
      component: allType
    },
    {
      path: "/roomdetail",
      name: "Room",
      component: RoomDetail
    },
    {
      path: "/booking",
      name: "Booking",
      component: Booking
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
    }
  ]
});

const openRoutes = ["Home", "Register"];

router.beforeEach((to, from, next) => {
  if (openRoutes.includes(to.name)) {
    next();
  } else if (window.localStorage.getItem("accessToken")) {
    next();
  } else next("/");
});

export default router;
