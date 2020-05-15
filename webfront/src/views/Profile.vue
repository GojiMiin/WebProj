<template>
  <div class="register">
    <MenuWithAuth />
    <v-img :src="require('@/assets/BG.jpg')">
      <!-- all thing here -->
      <v-container class="base">
        <v-tabs v-model="tab" background-color="blue-grey lighten-3" dark dense>
          <v-tab v-for="item in items" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>
        <ValidationObserver ref="parent" v-slot="{}">
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab">
              <v-card v-if="item.tab === 'Profile'" color="rgb(0, 0, 0, 0)">
                <MyProfile />
              </v-card>
              <v-card
                v-else-if="item.tab === 'Edit Profile'"
                color="rgb(0, 0, 0, 0)"
              >
                <EditProfile />
              </v-card>
              <v-card
                v-else-if="item.tab === 'Booking History'"
                color="rgb(0, 0, 0, 0)"
              >
                <BookingHistory />
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </ValidationObserver>
      </v-container>
    </v-img>
  </div>
</template>

<script>
/* eslint-disable */
import MenuWithAuth from "../components/menubar_withauth";
import MyProfile from "../components/Myprofile";
import EditProfile from "../components/EditProfile";
import BookingHistory from "../components/BookingHistory"

export default {
  name: "Profile",
  components: {
    MenuWithAuth,
    MyProfile,
    EditProfile,
    BookingHistory
  },
  data() {
    return {
      showoldpass: false, //show password when pressed here
      shownewpass: false, //show password when pressed here
      genders: ["Male", "Female"],
      User: {
        firstname: "",
        lastname: "",
        oldpassword: "",
        newpassword: "",
        DoB: "",
        gender: "",
        address: "",
        email: "",
        tel: "",
        ProfilePic: [],
      },
      tab: null,
      items: [
        { tab: "Profile", ref: "Profile" },
        { tab: "Edit Profile", ref: "EditProfile" },
        { tab: "Booking History", ref: "BookingHistory" },
      ],
    };
  },
  
  methods: {},
};
</script>

<style scoped>
.container.base {
  width: 70%;
}
</style>
