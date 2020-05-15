<template>
  <div class="home">
    <MenuWithAuth />
    <v-img :src="require('@/assets/BG.jpg')">
      <v-form pl-10 ml-0>
        <v-container class="base">
          <v-container>
            <v-subheader class="display-1 font-weight-bold"
              >Room Detail</v-subheader
            >
            <v-row>
              <v-carousel>
                <v-carousel-item
                  v-for="(item, i) in items"
                  :key="i"
                  :src="item.src"
                  @click="linkTo(item)"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                ></v-carousel-item>
              </v-carousel>
            </v-row>
          </v-container>
        </v-container>
      </v-form>
    </v-img>
  </div>
</template>

<script>
import MenuWithAuth from "../components/menubar_withauth";
import store from "../Store/store";
export default {
  name: "RoomType",
  components: {
    MenuWithAuth
  },
  data() {
    return {
      items: [
        //room picture here
        {
          src:
            "https://www.pprincess.com/wp-content/uploads/2017/02/Deluxe-Room_01.jpg",
          path: "/deluxe",
          type: "Delux"
        },
        {
          src:
            "https://www.landmarkbangkok.com/images/room/Premium-Corner-2.jpg",
          path: "/premium",
          type: "Premium"
        },
        {
          src:
            "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/67/2019/04/24093205/VIE-Hotel-Bangkok_Deluxe-Suite-Room01-1500x690.jpg",
          path: "/suite",
          type: "Suite"
        }
      ],
      type: ""
    };
  },
  methods: {
    linkTo(value) {
      store.commit("changeType", value.type);
      window.localStorage.setItem("roomType", store.getters.roomType);
      this.$router.push({ path: "/roomdetail" + value.path });
    }
  }
  
};
</script>

<style scoped>
.container.base {
  width: 70%;
}
</style>