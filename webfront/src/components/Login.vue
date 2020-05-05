<template>
  <div id="login_bar">
    <h1>
      Login
    </h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="loginForm" @submit.prevent="handleSubmit(login)" error>
        <div class="loginForm">
          <label for="username">Username<br /></label>
          <ValidationProvider
            rules="required|alpha_dash"
            v-slot="{ errors, failed }"
          >
            <input
              id="username"
              v-model="User.username"
              type="text"
              name="username"
              maxlength="12"
            />
            <span class="error" v-if="failed == true">
              <p>{{ errors[0] }}</p>
            </span>
          </ValidationProvider>
        </div>

        <div class="loginForm">
          <label for="password">Password<br /></label>
          <ValidationProvider
            rules="required|alpha_dash"
            v-slot="{ errors, failed }"
          >
            <input
              id="password"
              v-model="User.password"
              type="password"
              name="password"
              maxlength="12"
            />
            <span class="error" v-if="failed == true">
              <p>{{ errors[0] }}</p>
            </span>
          </ValidationProvider>
        </div>

        <button class="registerForm" type="submit">
          submit
        </button>
        <router-link to="/register"
          ><button type="button">register</button></router-link
        >
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      User: {
        username: "",
        password: ""
      },
      token: ""
    };
  },
  methods: {
    login() {
      alert("Success");
      let newuser = {
        username: this.User.username,
        password: this.User.password
      };
      axios
        .post("http://localhost:3000/login", newuser)
        .then(res => {
          if (res.data === "Invalid password") {
            console.log("dogshit");
          } else {
            //console.log(res.data.accessToken);
            window.localStorage.setItem("accessToken", res.data.accessToken);
            this.$router.push({ path: "/" + newuser.username });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
