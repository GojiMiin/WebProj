<template>
  <div class="homeafterlog">
    <MenuWithAuth />
    <v-img :src="require('@/assets/BG.jpg')">
      <!-- all thing here -->
      <ValidationObserver ref="observer" v-slot="{}">
        <v-form pl-10 ml-0>
          <v-container class="base">
            <v-container>
              <v-subheader class="display-1 font-weight-bold"
                >Booking {{roomType}}</v-subheader
              >
            </v-container>

            <v-row>
              <v-col cols="12" >
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Booking"
                  rules="required"
                >
                  <v-subheader class="title font-weight-bold"
                    >Room Number</v-subheader
                  >
                  <v-select
                    v-model="User.RoomPick"
                    :items="forStart"
                    label="Room Number"
                    placeholder="Room Number"
                    :error-messages="errors"
                    @change="changeRoom"
                    filled
                  ></v-select>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" md="6">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Date"
                  rules="required"
                >
                  <v-subheader class="title font-weight-bold"
                    >Check In Date</v-subheader
                  >

                  <vc-date-picker
                    v-model="User.CheckinDate"
                    :disabled-dates="disable"
                    is-inline
                  >
                  </vc-date-picker>

                  <v-text-field
                    v-model="User.CheckinDate"
                    :error-messages="errors"
                    readonly
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" md="6">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Date"
                  rules="required"
                >
                  <v-subheader class="title font-weight-bold"
                    >Check Out Date</v-subheader
                  >

                  <vc-date-picker
                    v-model="User.CheckoutDate"
                    :disabled-dates="disable"
                    color="blue-grey lighten-3"
                    is-inline
                  >
                  </vc-date-picker>

                  <v-text-field
                    v-model="User.CheckoutDate"
                    :error-messages="errors"
                    readonly
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12">
                <v-subheader class="title font-weight-bold"
                  >Price Total</v-subheader
                >
                <v-text-field
                  label="Price Total"
                  placeholder="Price Total"
                  v-bind:value="User.PriceTotal"
                  readonly
                  filled
                ></v-text-field>
                <v-btn @click="calPrice">Calculate Price</v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn :disabled="!Click" @click="toHome">Book</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </ValidationObserver>
    </v-img>
  </div>
</template>

<script>
import MenuWithAuth from "../components/menubar_withauth";
import store from "../Store/store";
import axios from "axios";
export default {
  name: "booking",
  components: {
    MenuWithAuth
  },
  data() {
    return {
      items: [
        //room picture here
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        }
      ],
      Click: 0,
      disable: [],
      tmp: [],
      forStart: [],
      booked: [],
      today: "",
      currentCheckIn: "",
      currentCheckOut: [],
      roomType: "",
      User: {
        RoomPick: "",
        CheckinDate: "",
        CheckoutDate: "",
        PriceTotal: ""
      }
    };
  },
  methods: {
    //get new data when change room to book
    changeRoom: function() { 
      this.disable = [];
      console.log(this.User.RoomPick);
      let i = 0;
      let before = {
        start: null,
        end: new Date(this.today)
      };
      this.disable.push(before);
      for (i in this.booked) {
        if (this.booked[i].roomNum == this.User.RoomPick) {
          let startTmp = this.booked[i].Checkin.split("T00:");
          let endTmp = this.booked[i].Checkout.split("T00:");
          let disDate = {
            start: new Date(startTmp[0]),
            end: new Date(endTmp[0])
          };
          this.disable.push(disDate);
          console.log(this.disable);
        }
      }
    },
    //redirect when finish and delete localStorage
    toHome: function() {
      this.submit();
      window.localStorage.removeItem("room");
      window.localStorage.removeItem("roomType");
      this.$router.push({ path: "/afterlog" });
    },
    //calculate total price
    calPrice: function() {
      let pricePerDay = store.getters.price;
      let diff =
        (this.User.CheckoutDate - this.User.CheckinDate) /
        (1000 * 60 * 60 * 24);
      this.User.PriceTotal = pricePerDay * diff;
      this.Click = 1;
    },
    //submit request to backend
    submit() {
      this.$refs.observer.validate();
      let Userdata = {
        Checkin: this.User.CheckinDate,
        Checkout: this.User.CheckoutDate,
        Price: this.User.PriceTotal,
        roomNum: this.User.RoomPick,
        roomType: store.getters.roomType
      };
      console.log(Userdata);
      axios.post("http://localhost:3000/book", Userdata, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
        }
      });
    }
  },
  mounted() {
    let i = 0;
    this.tmp = store.getters.allRoom;
    for (i in this.tmp) {
      this.forStart.push(this.tmp[i].roomNum);
    }
    axios
      .put("http://localhost:3000/book", this.forStart, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
        }
      })
      .then(response => {
        this.booked = response.data;
        this.roomType = store.getters.roomType;
        //setup current date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" + dd;
        this.today = today;
      });
  }
};
</script>

<style scoped>
.container.base {
  width: 70%;
}
</style>
