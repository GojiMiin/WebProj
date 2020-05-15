<template>
  <div class="register">
    <Menubar />
    <v-img :src="require('@/assets/BG.jpg')">
      <ValidationObserver ref="observer" v-slot="{}">
        <v-form pl-10 ml-0 enctype="multipart/form-data">
          <v-container class="base">
            <v-container>
              <v-subheader class="display-1 font-weight-bold"
                >Register</v-subheader
              >
            </v-container>
            <v-row>
              <v-col cols="12" md="6">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Username"
                  rules="required|alpha"
                >
                  <v-text-field
                    label="Username"
                    placeholder="Username"
                    v-model="User.username"
                    filled
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" md="6">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Password"
                  rules="required|alpha_dash"
                >
                  <v-text-field
                    label="Password"
                    placeholder="Password"
                    filled
                    v-model="User.password"
                    :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showpassword ? 'text' : 'password'"
                    :error-messages="errors"
                    @click:append="showpassword = !showpassword"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" md="6">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Firstname"
                  rules="required|alpha"
                >
                  <v-text-field
                    label="Firstname"
                    placeholder="Firstname"
                    v-model="User.firstname"
                    :error-messages="errors"
                    filled
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" md="6">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Lastname"
                  rules="required|alpha"
                >
                  <v-text-field
                    label="Lastname"
                    placeholder="Lastname"
                    v-model="User.lastname"
                    :error-messages="errors"
                    filled
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Date"
                  rules="required"
                >
                  <v-date-picker
                    v-model="User.DoB"
                    color="blue-grey lighten-3"
                  ></v-date-picker>
                  <v-text-field
                    v-model="User.DoB"
                    :error-messages="errors"
                    readonly
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" md="6">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Gender"
                  rules="required"
                >
                  <v-select
                    v-model="User.gender"
                    :items="genders"
                    label="Gender"
                    placeholder="Gender"
                    :error-messages="errors"
                    filled
                  ></v-select>
                </ValidationProvider>
              </v-col>

              <v-col cols="12">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Address"
                  rules="required"
                >
                  <v-text-field
                    v-model="User.address"
                    label="Address"
                    placeholder="Address"
                    :error-messages="errors"
                    filled
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" md="6">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="User.email"
                    label="Email"
                    placeholder="Email"
                    :error-messages="errors"
                    filled
                  >
                  </v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" md="6">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Tel"
                  rules="required|numeric"
                >
                  <v-text-field
                    v-model="User.tel"
                    label="Tel"
                    placeholder="Phone Number"
                    :error-messages="errors"
                    filled
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Avatar"
                  rules="ext:jpg,pdf,png"
                >
                  <v-file-input
                    v-model="User.ProfilePic"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    label="Avatar"
                    :error-messages="errors"
                    hint="File type: png/jpeg/bmp"
                    filled
                  ></v-file-input>
                </ValidationProvider>
              </v-col>
            </v-row>
            <div class="my-2">
              <v-btn large color="primary" @click="submit">Submit</v-btn>
            </div>
            <div>
              <v-btn large @click="clear">Clear</v-btn>
            </div>
          </v-container>
        </v-form>
      </ValidationObserver>
    </v-img>
  </div>
</template>

<script>
import Menubar from "../components/menubar";
import store from "../Store/store";
export default {
  name: "Register",
  components: {
    Menubar
  },
  data() {
    return {
      showpassword: false,
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
  methods: {
    submit() {
      this.$refs.observer.validate();
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
      //send register formdata to Vuex store
      store
        .dispatch("register", formdata)
        .then(() => {
          this.$router.push({ path: "/afterlog" });
        })
        .catch(err => console.log(err));
      this.$router.push({ path: "/" });
    },
    //clear all data on page
    clear() {
      this.$refs.observer.reset();
      this.User.username = "";
      this.User.password = "";
      this.User.firstname = "";
      this.User.lastname = "";
      this.User.DoB = "";
      this.User.gender = "";
      this.User.address = "";
      this.User.email = "";
      this.User.tel = "";
      this.User.ProfilePic = null;
    }
  }
};
</script>

<style scoped>
.container.base {
  width: 70%;
}
</style>
