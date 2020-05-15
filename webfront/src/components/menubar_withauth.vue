<template>
  <div class="menuwithauth">
    <div>
      <v-app-bar color="blue-grey lighten-3" dense dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>

        <v-toolbar-title>Hotel</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-title class="pr-4">{{ User.username }}</v-toolbar-title>

        <v-avatar @click.native="profile"
          ><v-img :src="User.ProfilePic"> </v-img
        ></v-avatar>

        <v-btn @click="logout" icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        color="blue-grey lighten-3"
        dense
        dark
      >
        <v-list-item>
          <v-img :src="require('@/assets/hotel-icon.jpg')"> </v-img>
        </v-list-item>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.link"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import store from "../Store/store";
export default {
  name: "MenuWithAuth",
  data() {
    return {
      drawer: null,
      //set item to link on side bar
      items: [
        { title: "Home", icon: "mdi-home", link: "/afterlog" },
        { title: "Room detail", icon: "mdi-details", link: "/roomtype" },
        { title: "Payment", icon: "mdi-receipt", link: "/payment" }
      ],
      User: {
        username: "",
        ProfilePic: ""
      }
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/id", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
        }
      })
      .then(res => {
        console.log(res);
        this.User.username = res.data.username;
        this.User.ProfilePic = res.data.ProfilePic;
      })
      .catch(err => {
        console.log(err);
        this.$router.push({ path: "/" });
      });
  },
  methods: {
    logout() {
      //use Vuex to make logout
      store.dispatch("logout").then(() => {
        this.$router.push({ path: "/" });
      });
    },
    profile() {
      this.$router.push({ path: "/profile" });
    }
  }
};
</script>
