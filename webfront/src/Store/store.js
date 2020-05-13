import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    roomType: "",
    allRoomInType: []
  },
  mutations: {
    changeType(state, type) {
      state.roomType = type;
    },
    setAllRoom(state, room) {
      state.allRoomInType = room;
    }
  },
  getters: {
    roomType: state => {
        if(state.roomType == "")
        {
            return window.localStorage.getItem('roomType')
        }
        else
        {
            return state.roomType
        }
    },
    allRoom: state => {
        if(state.allRoomInType == "")
        {
            return JSON.parse(window.localStorage.getItem('room'))
        }
        else
        {
            return state.allRoomInType
        }
    }
  }
});
