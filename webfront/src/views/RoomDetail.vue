<template>
  <div>
    <label>{{ forShow.TypeName }}</label
    ><br /><br />
    <label>Description :</label>
    <label>{{ forShow.RoomDetail }}</label
    ><br /><br />
    <label>Size: </label>
    <label>{{ forShow.Size }}</label
    ><br /><br />
    <label>Properties :</label>
    <label>{{ forShow.Properties }}</label
    ><br /><br />
    <label>Price :</label>
    <label>{{ forShow.PricePerDay }}</label
    ><br /><br />
    <button type="button" @click="toBook">Book Now</button>
  </div>
</template>

<script>
import { store } from "../Store/store";
import axios from "axios";
export default {
  name: "Room",
  data() {
    return {
      forShow: [],
      room: ""
    };
  },
  methods: {
    toBook: function() {
      axios
        .post("http://localhost:3000/roomdetail/" + store.getters.roomType)
        .then(response => {
            store.commit("setAllRoom", response.data);
            this.room = JSON.stringify(store.getters.allRoom)
            window.localStorage.setItem('room',this.room)
            this.$router.push({ path: "/booking" });
        });
    }
  },
  mounted() {
    console.log(store.getters.roomType);
    axios
      .get("http://localhost:3000/roomdetail/" + store.getters.roomType)
      .then(response => {
        this.forShow = response.data;
      });
  }
};
</script>
