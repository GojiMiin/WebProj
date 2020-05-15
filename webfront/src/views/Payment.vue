<template>
  <div class="payment">
    <MenuWithAuth />
    <v-img :src="require('@/assets/BG.jpg')">
      <!-- all thing here -->
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <v-form
          pl-10
          ml-0
          enctype="multipart/form-data"
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <v-container class="base">
            <v-container>
              <v-subheader class="display-1 font-weight-bold"
                >Payment</v-subheader
              >
            </v-container>
            <v-row>
              <v-col cols="12" md="6">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Payment List"
                >
                  <v-select
                    :items="data.BookID.allBookID"
                    label="BookID List"
                    placeholder="BookID List"
                    :error-messages="errors"
                    return-object
                    @change="dropDownChange"
                    filled
                  ></v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="6"></v-col>

              <v-col cols="12">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="PayDate"
                  rules="required"
                >
                  <v-date-picker
                    v-model="data.payData.PayDate"
                    color="blue-grey lighten-3"
                  ></v-date-picker>
                  <v-text-field
                    v-model="data.payData.PayDate"
                    :error-messages="errors"
                    readonly
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-bind:value="data.currentShow.Price"
                  label="PayTotal"
                  placeholder="Cost"
                  filled
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="PaymentList"
                  rules="required"
                >
                  <v-select
                    v-model="data.payData.Bank"
                    :items="banks"
                    label="Bank"
                    placeholder="Bank"
                    :error-messages="errors"
                    filled
                  ></v-select>
                </ValidationProvider>
              </v-col>

              <v-col cols="12">
                <ValidationProvider
                  mode="eager"
                  v-slot="{ errors }"
                  name="Receipt"
                  rules="required|ext:jpg,pdf,png"
                >
                  <v-file-input
                    v-model="data.payData.Receipt"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an image"
                    prepend-icon="mdi-camera"
                    label="Receipt"
                    :error-messages="errors"
                    hint="File type: png/jpeg/bmp"
                    filled
                  ></v-file-input>
                </ValidationProvider>
              </v-col>
            </v-row>
            <div class="my-2">
              <v-btn large color="primary" :disabled="!isComplete" type="submit"
                >Submit</v-btn
              >
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
import axios from "axios";
import MenuWithAuth from "../components/menubar_withauth";
export default {
  name: "PayMe",
  components: {
    MenuWithAuth
  },
  data() {
    return {
      banks: ["Kasikorn", "Krungthep"],
      data: {
        BookID: {
          allBookID: [],
          allPrice: [],
          username: ""
        },
        currentShow: {
          BookID: "",
          Price: ""
        },
        payData: {
          PayDate: "",
          PayTotal: "",
          Bank: "",
          Receipt: []
        }
      }
    };
  },
  methods: {
    //call when validate
    onSubmit: function() {
      this.sentData();
    },
    //clear all data on page
    clear: function() {
      this.$refs.observer.reset();
      this.data.currentShow.BookID = "";
      this.data.payData.paymentChoose = "";
      this.data.payData.bank = "";
      this.data.currentShow.Price = "";
      this.data.payData.Receipt = null;
    },
    //send all data to backend
    sentData: function() {
      console.log(typeof this.data.payData.PayDate);
      alert("Submit Success");
      let datestr = new Date(this.data.payData.PayDate).toUTCString();
      let formdata = new FormData();
      formdata.append("BookID", this.data.currentShow.BookID);
      formdata.append("PayDate", datestr);
      formdata.append("PayTotal", this.data.currentShow.Price);
      formdata.append("Bank", this.data.payData.Bank);
      formdata.append("Receipt", this.data.payData.Receipt);
      for (let i of formdata.values()) {
        console.log(i);
      }

      axios
        .post("http://localhost:3000/Payment", formdata, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      this.$router.push({ path: "/afterlog" });
    },
    dropDownChange: function(element) {
      /* get index from dropdown and change total pay box */
      let index = this.data.BookID.allBookID.indexOf(element);
      this.data.currentShow.BookID = this.data.BookID.allBookID[index];
      this.data.currentShow.Price = this.data.BookID.allPrice[index];
    }
  },
  computed: {
    //disable button if input is blank
    isComplete: function() {
      let date = this.data.payData.PayDate;
      let bank = this.data.payData.Bank;
      let photo = this.data.payData.Receipt;
      return date && bank && photo;
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/payment", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
        }
      })
      .then(response => {
        //get BookID and all price
        this.data.BookID.allBookID = response.data.thisBookID;
        this.data.BookID.allPrice = response.data.thisPrice;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
.container.base {
  width: 70%;
}
</style>
