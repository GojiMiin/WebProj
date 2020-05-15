<template>
  <div class="home">
    <MenuWithAuth />
    <v-img :src="require('@/assets/BG.jpg')">
      <!-- all thing here -->
      <v-form pl-10 ml-0>
        <v-container class="base">
          <v-container>
            <v-subheader class="display-2 font-weight-bold mb-5"
              >Premium</v-subheader
            >
            <v-row>
              <v-carousel>
                <v-carousel-item
                  v-for="(item, i) in items"
                  :key="i"
                  :src="item.src"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                ></v-carousel-item>
              </v-carousel>
            </v-row>
          </v-container>
          <v-row>
            <v-col cols="12">
              <v-sheet label="Description" color="rgb(0, 0, 0, 0)"
                ><v-subheader class="display-1 font-weight-bold mb-5"
                  >Description</v-subheader
                >
                If you are looking for space for three guests, our triple rooms are at your disposal. They have three single beds or, if you prefer, a double bed and a single bed. Please indicate your preference when making your reservation.

With a splendid view of the Bay of Isola Bella, all of the rooms at the 4-star Panoramic Hotel in Taormina overlook the sea, providing a breathtaking panorama that no other hotel in Taormina can offer you.

Large windows that give way to the outside light, along with hand-crafted furniture in birch that goes beautifully with elegant curtains, contribute to a charming atmosphere that will make your stay at the Panoramic Hotel truly unforgettable.

The rooms are complete with LED satellite TV, Wi-Fi internet free of charge everywhere, VOIP telephone, adjustable air conditioning/heating, voicemail and porcelain tile flooring.</v-sheet
              >
            </v-col>

            <v-col cols="12" md="6" class="mt-10">
              <v-subheader
                class="d-flex justify-md-center display-1 font-weight-bold"
              >
                Room size
              </v-subheader>
              <v-sheet
                label="Description"
                class="display-1 d-flex justify-md-center"
                color="rgb(0, 0, 0, 0)"
                >{{ forShow.Size }} m²
              </v-sheet>
            </v-col>
            <v-col cols="12" md="6" class="mt-10">
              <v-subheader
                class="d-flex justify-md-center display-1 font-weight-bold"
              >
                Price Per Day
              </v-subheader>
              <v-sheet
                label="Description"
                class="display-1 d-flex justify-md-center"
                color="rgb(0, 0, 0, 0)"
                >{{ forShow.PricePerDay }} Baht
              </v-sheet>
            </v-col>
            <v-col cols="12" md="6"></v-col>
            <v-col cols="12" md="6" class="d-flex justify-md-end mt-10">
              <v-btn class="bookBtn" color="error" @click="toBook" large
                >Booking Now
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-img>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuWithAuth from "../components/menubar_withauth";
import store from "../Store/store";
import axios from "axios";
export default {
  name: "DeluxeRoom",
  components: {
    MenuWithAuth
  },
  data() {
    return {
      items: [
        //room picture here
        {
          src:
            "https://www.hospitalitynet.org/picture/xxl_153109641.jpg?t=20191217131651"
        },
        {
          src:
            "https://i0.wp.com/worldoffoodanddrink.worldtravelguide.net/wp-content/uploads/2017/06/oth-HERO-La-Reserve-Paris-Suite-Bathroom-2-1440x823.jpg?fit=1440%2C823&ssl=1"
        },
        {
          src:
            "https://pix10.agoda.net/hotelImages/462/462352/462352_14100117250022530345.jpg?s=1024x768"
        }
      ],
      forShow: [],
      room: ""
    };
  },
  methods: {
    toBook: function() {
      axios
        .post("http://localhost:3000/roomdetail/" + store.getters.roomType)
        .then(response => {
          //store all room number in type on Vuex
          store.commit("setAllRoom", response.data);
          this.room = JSON.stringify(store.getters.allRoom);
          //store room number in localStorage in case you refresh page
          window.localStorage.setItem("room", this.room);
          //store price on Vuex
          store.commit("price", this.forShow.PricePerDay);
          window.localStorage.setItem("price", this.forShow.PricePerDay);
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

<style scoped>
.container.base {
  width: 70%;
}
</style>
