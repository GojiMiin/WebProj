<template>
  <div class="myprofile">
    <v-form pl-10 ml-0 enctype="multipart/form-data">
      <v-container class="base">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Username"
              placeholder="Username"
              v-model="User.username"
              filled
              readonly
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              label="Firstname"
              placeholder="Firstname"
              v-model="User.firstname"
              filled
              readonly
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              label="Lastname"
              placeholder="Lastname"
              v-model="User.lastname"
              filled
              readonly
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-date-picker
              v-model="User.DoB"
              color="blue-grey lighten-3"
            ></v-date-picker>
            <v-text-field
              label="Date of Birth"
              prepend-inner-icon="mdi-calendar"
              v-model="User.DoB"
              readonly
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="User.gender"
              :items="genders"
              label="Gender"
              placeholder="Gender"
              filled
              readonly
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="User.address"
              label="Address"
              placeholder="Address"
              filled
              readonly
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="User.email"
              label="Email"
              placeholder="Email"
              filled
              readonly
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="User.tel"
              label="Tel"
              placeholder="Phone Number"
              filled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Myprofile",
  components: {},
  data() {
    return {
      showpassword: false, //show password when pressed here
      genders: ["Male", "Female"],
      User: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        DoB: "",
        gender: "",
        address: "",
        email: "",
        tel: "",
        ProfilePic: []
      }
    };
  },
  methods: {},
  mounted() {
    axios
      .get("http://localhost:3000/auser", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
        }
      })
      .then(res => {
        //date format
        console.log(res);
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
          tel: res.data.tel
        };
        console.log(res.data);
      });
  }
};
</script>

<style scoped>
.container.base {
  width: 70%;
}
</style>
