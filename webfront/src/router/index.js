import Vue from "vue";
import Vuex from "vuex";
import VCalendar from "v-calendar";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Payment from "../views/Payment";
import Contact from "../views/Contact";
import Register from "../views/Register";
import HomeAfterLog from "../views/Home_afterLog";
import RoomType from "../views/RoomType";
import RoomDetail_Deluxe from "../views/Roomdetail_Deluxe";
import RoomDetail_Premium from "../views/Roomdetail_Premium";
import RoomDetail_Suite from "../views/Roomdetail_Suite";
import Booking from "../views/Booking";
import Profile from "../views/Profile";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import {
  required,
  email,
  alpha,
  alpha_dash,
  numeric,
  ext
} from "vee-validate/dist/rules";

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VCalendar, {
  componentPrefix: "vc"
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

extend("email", email);
extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

extend("alpha", {
  ...alpha,
  message: "{_field_} can only contain letters"
});

extend("alpha_dash", {
  ...alpha_dash,
  message: "{_field_} can only contain letters and numbers"
});

extend("email", {
  ...email,
  message: "{_field_} can only contain email"
});

extend("numeric", {
  ...numeric,
  message: "{_field_} can only contain numbers"
});

extend("ext", {
  ...ext,
  message: "{_field_} can only contain valid file"
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
      path: "/afterlog",
      name: "HomeAfterLog",
      component: HomeAfterLog
    },
    {
      path: "/contact",
      name: "Contact",
      component: Contact
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
      path: "/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/booking",
      name: "Booking",
      component: Booking
    },
    {
      path: "/roomtype",
      name: "Room",
      component: RoomType
    },
    {
      path: "/roomdetail/deluxe",
      name: "RoomDetail_Deluxe",
      component: RoomDetail_Deluxe
    },
    {
      path: "/roomdetail/premium",
      name: "RoomDetail_Premium",
      component: RoomDetail_Premium
    },
    {
      path: "/roomdetail/suite",
      name: "RoomDetail_Suite",
      component: RoomDetail_Suite
    }
  ]
});

const openRoutes = ["Home", "Register", "Contact"];

router.beforeEach((to, from, next) => {
  if (openRoutes.includes(to.name)) {
    next();
  } else if (window.localStorage.getItem("accessToken")) {
    next();
  } else next("/");
});

export default router;
