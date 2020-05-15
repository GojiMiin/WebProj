<template>
  <div class="menubar">
    <div>
      <v-app-bar color="blue-grey lighten-3" dense dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>

        <v-toolbar-title>Hotel</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
          flat
          dense
          v-model="User.username"
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-account"
          label="Username"
          type="text"
        ></v-text-field>

        <v-text-field
          flat
          dense
          v-model="User.password"
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-lock"
          label="Password"
          type="password"
          class="pl-4"
        ></v-text-field>

        <v-btn @click="login" icon>
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </v-app-bar>
      <!-- side bar -->
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
import store from "../Store/store";
export default {
  name: "Menubar",
  data() {
    return {
      User: {
        username: "",
        password: ""
      },
      token: "",
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-home", link: "/" },
        { title: "Register", icon: "mdi-download", link: "/register" },
        { title: "Contact", icon: "mdi-contacts", link: "/contact" }
      ]
    };
  },
  methods: {
    login() {
      let newuser = {
        username: this.User.username,
        password: this.User.password
      };
      store
        .dispatch("login", newuser)
        .then(() => {
          this.$router.push({ path: "/afterlog" });
        })
        .catch(err => console.log(err));
      /* axios
        .post("http://localhost:3000/login", newuser)
        .then(res => {
          if (res.data === "Invalid password") {
            console.log("Invalid");
          } else {
            //console.log(res.data.accessToken);
            window.localStorage.setItem("accessToken", res.data.accessToken);
            this.$router.push({ path: "/afterlog" });
          }
        })
        .catch(err => {
          console.log(err);
        }); */
    }
  }
};
</script>

<style scoped>
.v-text-field {
  width: 10%;
}
</style>
