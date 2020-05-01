<template>
  <div id="register">
    <h1>
      Register
    </h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        class="registerForm"
        enctype="multipart/form-data"
        @submit.prevent="handleSubmit(addToAPI)"
        error
      >
        <div class="registerForm">
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

        <div class="registerForm">
          <label for="password">Old Password<br /></label>
          <ValidationProvider
            rules="required|alpha_dash"
            v-slot="{ errors, failed }"
          >
            <input
              id="oldpassword"
              v-model="User.oldpassword"
              type="password"
              name="password"
              maxlength="12"
            />
            <span class="error" v-if="failed == true">
              <p>{{ errors[0] }}</p>
            </span>
          </ValidationProvider>
        </div>

        <div class="registerForm">
          <label for="password">New Password<br /></label>
          <ValidationProvider
            rules="required|alpha_dash"
            v-slot="{ errors, failed }"
          >
            <input
              id="newpassword"
              v-model="User.newpassword"
              type="password"
              name="password"
              maxlength="12"
            />
            <span class="error" v-if="failed == true">
              <p>{{ errors[0] }}</p>
            </span>
          </ValidationProvider>
        </div>

        <div class="registerForm">
          <label for="firstname">First name<br /></label>
          <ValidationProvider
            rules="required|alpha"
            v-slot="{ errors, failed }"
          >
            <input
              id="firstname"
              v-model="User.firstname"
              type="text"
              name="firstname"
              maxlength="15"
            />
            <span class="error" v-if="failed == true">
              <p>{{ errors[0] }}</p>
            </span>
          </ValidationProvider>
        </div>

        <div class="registerForm">
          <label for="lastname">Last name<br /></label>
          <ValidationProvider
            rules="required|alpha"
            v-slot="{ errors, failed }"
          >
            <input
              id="lastname"
              v-model="User.lastname"
              type="text"
              name="lastname"
              maxlength="15"
            />
            <span class="error" v-if="failed == true">
              <p>{{ errors[0] }}</p>
            </span>
          </ValidationProvider>
        </div>

        <div class="registerForm">
          <label for="DoB">Date of Birth<br /></label>
          <ValidationProvider rules="required" v-slot="{ errors, failed }">
            <input id="DoB" v-model="User.DoB" type="date" name="DoB" />
            <span class="error" v-if="failed == true">
              <p>{{ errors[0] }}</p>
            </span>
          </ValidationProvider>
        </div>

        <div class="registerForm">
          <h4>Gender</h4>
          <label for="male">Male</label>
          <ValidationProvider rules="required" v-slot="{ errors, failed }">
            <input
              id="male"
              v-model="User.gender"
              type="radio"
              name="gender"
              value="male"
            />
            <label for="female">Female</label>
            <input
              id="female"
              v-model="User.gender"
              type="radio"
              name="gender"
              value="female"
            />
            <span class="error" v-if="failed == true">
              <p>{{ errors[0] }}</p>
            </span>
          </ValidationProvider>
        </div>

        <div class="registerForm">
          <label for="address">Address<br /></label>
          <ValidationProvider rules="required" v-slot="{ errors, failed }">
            <input
              id="address"
              v-model="User.address"
              type="text"
              name="address"
            />
            <span class="error" v-if="failed == true">
              <p>{{ errors[0] }}</p>
            </span>
          </ValidationProvider>
        </div>

        <div class="registerForm">
          <ValidationProvider
            rules="required|numeric"
            v-slot="{ errors, failed }"
          >
            <label for="tel">Phone<br /></label>
            <input id="tel" v-model="User.tel" type="text" name="tel" />
            <span class="error" v-if="failed == true">
              <p>{{ errors[0] }}</p>
            </span>
          </ValidationProvider>
        </div>

        <div class="registerForm">
          <ValidationProvider rules="email" v-slot="{ errors, failed }">
            <label for="email">Email<br /></label>
            <input id="email" v-model="User.email" type="text" name="email" />
            <span class="error" v-if="failed == true">
              <p>{{ errors[0] }}</p>
            </span>
          </ValidationProvider>
        </div>

        <div class="registerForm">
          <ValidationProvider
            rules="ext:jpg,pdf,png"
            v-slot="{ errors, validate }"
          >
            <input
              type="file"
              name="ProfilePic"
              accept="image/*"
              @change="getImage($event) || validate($event)"
            />
            <span v-if="errors[0]" class="error">
              <p>Please choose only jpeg or png file</p>
            </span>
          </ValidationProvider>
        </div>

        <img :src="'/profileimg/Autheris_image.jpeg'" />

        <p>
          <button class="registerForm" type="submit">
            submit
          </button>
        </p>
      </form>
    </ValidationObserver>
    <router-link to="/"><button type="button">Back</button></router-link>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      User: {
        username: "",
        oldpassword: "",
        newpassword: "",
        firstname: "",
        lastname: "",
        DoB: "",
        gender: "",
        address: "",
        email: "",
        tel: "",
        ProfilePic: "",
      },
      //Validate: true,
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/auser/", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        //date format
        var cdate = new Date(res.data.DoB);
        var year = cdate.getFullYear();
        var month = cdate.getMonth() + 1;
        var dt = cdate.getDate();

        if (dt < 10) {
          dt = "0" + dt;
        }
        if (month < 10) {
          month = "0" + month;
        }

        this.User = {
          username: res.data.username,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          DoB: year + "-" + month + "-" + dt,
          gender: res.data.gender,
          address: res.data.address,
          email: res.data.email,
          tel: res.data.tel,
          ProfilePic: res.data.ProfilePic,
        };
        console.log(this.User);
      });
  },
  methods: {
    addToAPI(e) {
      /* if (this.Validate === false) {
        alert("Img invalid");
      } else { */
      alert("Success");
      let datestr = new Date(this.User.DoB).toUTCString();
      let formdata = new FormData();
      formdata.append("username", this.User.username);
      formdata.append("password", this.User.password);
      formdata.append("firstname", this.User.firstname);
      formdata.append("lastname", this.User.lastname);
      formdata.append("DoB", datestr);
      formdata.append("gender", this.User.gender);
      formdata.append("address", this.User.address);
      formdata.append("email", this.User.email);
      formdata.append("tel", this.User.tel);
      formdata.append("ProfilePic", this.User.ProfilePic);

      axios
        .post("http://localhost:3000/users", formdata)
        .then((res) => {
          console.log(res);
          if (res.data.err) {
            console.log("user already exist");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      /* } */
    },
    getImage(event) {
      let file = event.target.files[0];
      this.User.ProfilePic = file;
    },
  },
  component: {},
};
</script>

<style></style>
