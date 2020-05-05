<template>
  <div id="user">
    <h3>{{ username }}</h3>
    <button type="button" @click="logout">Logout</button>
    <img :src="ProfilePic" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "homeafterlog",
  data() {
    return {
      username: "",
      ProfilePic: ""
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
        this.username = res.data.username;
        this.ProfilePic = res.data.ProfilePic;
      })
      .catch(err => {
        console.log(err);
        this.$router.push({ path: "/" });
      });
  },
  methods: {
    logout() {
      window.localStorage.removeItem("accessToken");
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style></style>
