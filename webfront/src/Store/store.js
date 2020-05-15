import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { //keep all data for component to call by getters
    status: "",
    token: localStorage.getItem("accessToken") || "",
    user: "",
    roomType: "",
    price: "",
    allRoomInType: []
  },
  mutations: { //store.commit commit mutations to change state data
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    changeType(state, type) {
      state.roomType = type;
    },
    setAllRoom(state, room) {
      state.allRoomInType = room;
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    price(state, price) {
      state.price = price;
    }
  },
  actions: { //store.dispatch commit actions
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/login",
          data: user,
          method: "POST"
        })
          .then(resp => {
            var token = resp.data.accessToken;
            var user = resp.data.user;
            localStorage.setItem("accessToken", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("accessToken");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    register({ commit }, user) {
      commit("auth_request");
      return new Promise(resolve => {
        axios({
          url: "http://localhost:3000/users",
          data: user,
          method: "POST"
        }).then(resp => {
          resolve(resp);
        });
      });
    }
  },
  getters: { //call store.getters to get state in store
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    roomType: state => {
      if (state.roomType == "") {
        return window.localStorage.getItem("roomType");
      } else {
        return state.roomType;
      }
    },
    allRoom: state => {
      if (state.allRoomInType == "") {
        return JSON.parse(window.localStorage.getItem("room"));
      } else {
        return state.allRoomInType;
      }
    },
    price: state => {
      if (state.price == "") {
        return window.localStorage.getItem("price");
      } else {
        return state.price;
      }
    }
  }
});
