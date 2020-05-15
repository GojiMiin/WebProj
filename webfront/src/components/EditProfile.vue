<template>
  <div class="register">
    <ValidationObserver ref="observer" v-slot="{}">
      <v-form pl-10 ml-0>
        <v-container class="base">
          <v-row>
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

            <v-col cols="12" md="6">
              <ValidationProvider
                mode="eager"
                v-slot="{ errors }"
                name="Old_Password"
                rules="required|alpha_dash"
              >
                <v-text-field
                  label="Old Password"
                  placeholder="Old Password"
                  filled
                  v-model="User.oldpassword"
                  :append-icon="showoldpass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showoldpass ? 'text' : 'password'"
                  :error-messages="errors"
                  @click:append="showoldpass = !showoldpass"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" md="6">
              <ValidationProvider
                mode="eager"
                v-slot="{ errors }"
                name="New_Password"
                rules="required|alpha_dash"
              >
                <v-text-field
                  label="New Password"
                  placeholder="New Password"
                  filled
                  v-model="User.newpassword"
                  :append-icon="shownewpass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="shownewpass ? 'text' : 'password'"
                  :error-messages="errors"
                  @click:append="shownewpass = !shownewpass"
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
                  label="Date of Birth"
                  prepend-inner-icon="mdi-calendar"
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
            <v-btn large @click="submit">Submit</v-btn>
          </div>
          <div>
            <v-btn large @click="clear">Clear</v-btn>
          </div>
        </v-container>
      </v-form>
    </ValidationObserver>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Are you sure?
        </v-card-title>

        <v-card-text>
          You need to logout after this process. Are you sure?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="accept">
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="passinc">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Password Incorrect
        </v-card-title>

        <v-card-text>
          Your password is incorrect.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="passinc = false">
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditProfile",
  data() {
    return {
      showoldpass: false, //show password when pressed here
      shownewpass: false, //show password when pressed here
      dialog: false,
      passinc: false,
      genders: ["Male", "Female"],
      User: {
        username: "",
        firstname: "",
        lastname: "",
        oldpassword: "",
        newpassword: "",
        DoB: "",
        gender: "",
        address: "",
        email: "",
        tel: "",
        ProfilePic: []
      }
    };
  },
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
          //ProfilePic: res.data.ProfilePic,
        };
        console.log(res.data);
      });
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.dialog = true;
      }
    },
    accept() {
      this.dialog = false;
      let datestr = new Date(this.User.DoB).toUTCString();
      let formdata = new FormData();
      formdata.append("username", this.User.username);
      formdata.append("oldpassword", this.User.oldpassword);
      formdata.append("newpassword", this.User.newpassword);
      formdata.append("firstname", this.User.firstname);
      formdata.append("lastname", this.User.lastname);
      formdata.append("DoB", datestr);
      formdata.append("gender", this.User.gender);
      formdata.append("address", this.User.address);
      formdata.append("email", this.User.email);
      formdata.append("tel", this.User.tel);
      formdata.append("ProfilePic", this.User.ProfilePic);

      axios
        .post("http://localhost:3000/auser", formdata, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.err === "password incorrect") {
            console.log(res.data.err);
            this.passinc = true;
          } else if (res.data.data === "password correct") {
            console.log(res.data.data);
            window.localStorage.removeItem("accessToken");
            this.$router.push({ path: "/" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clear() {
      this.$refs.observer.reset();
      this.User.firstname = "";
      this.User.lastname = "";
      this.User.oldpassword = "";
      this.User.newpassword = "";
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
