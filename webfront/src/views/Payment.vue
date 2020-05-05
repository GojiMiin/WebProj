<template>
  <div class="container">
    <br /><br />

    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        enctype="multipart/form-data"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <label for="book-id">Payment List</label><br />
        <select
          class="payForm_input"
          id="dropdown"
          name="book-id"
          @change="dropDownChange()"
        >
          <option v-for="item in data.BookID.allBookID" v-bind:key="item">
            {{ item }}
          </option> </select
        ><br /><br />

        <label for="PayDate">PayDate</label><br />
        <input
          class="form-control"
          type="date"
          name="PayDate"
          v-model="data.payData.PayDate"
        /><br /><br />
        <label for="PayTotal">PayTotal</label><br />
        <input
          class="form-control"
          type="text"
          name="PayTotal"
          v-bind:value="data.currentShow.Price"
          readonly
        />
        <br /><br />
        <label for="Bank">Bank</label><br />

        <ValidationProvider rules="required|alpha" v-slot="{ errors }">
          <input
            class="form-control"
            type="text"
            name="Bank"
            v-model="data.payData.Bank"
          /><br />
          <span v-if="errors[0]">Pls input only alphabet</span>
        </ValidationProvider>

        <br /><br />
        <ValidationProvider rules="ext:jpg,png" v-slot="{ validate, errors }">
          <input
            type="file"
            accept="image/*"
            name="ReceiptImg"
            @change="
              getPhoto($event);
              validate($event);
            "
          />
          <span v-if="errors[0]">
            <p>Please insert only .jpeg , .jpg or .png</p>
          </span>
        </ValidationProvider>
        <br /><br />
        <button class="payForm_button" :disabled="!isComplete" type="submit">
          submit
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PayMe",
  data() {
    return {
      data: {
        BookID: {
          allBookID: "",
          allPrice: "",
          username: ""
        },
        currentShow: {
          BookID: "",
          Price: ""
        },
        payData: {
          BookID: "",
          PayDate: "",
          PayTotal: "",
          Bank: "",
          Receipt: ""
        }
      }
    };
  },
  methods: {
    onSubmit: function() {
      this.sentData();
    },
    sentData: function() {
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
        .post(
          "http://localhost:3000/Payment",formdata,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    dropDownChange: function() {
      /* get index from dropdown and change total pay box */
      let IDindex = document.getElementById("dropdown").selectedIndex;
      this.data.currentShow.BookID = this.data.BookID.allBookID[IDindex];
      this.data.currentShow.Price = this.data.BookID.allPrice[IDindex];
    },
    //function to get photo
    getPhoto: function(event) {
      let file = event.target.files[0];
      this.data.payData.Receipt = file;
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
      .get("http://localhost:3000/Payment", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
        }
      })
      .then(response => {
        this.data.BookID.allBookID = response.data.thisBookID;
        this.data.BookID.allPrice = response.data.thisPrice;
        this.data.currentShow.BookID = this.data.BookID.allBookID[0];
        this.data.currentShow.Price = this.data.BookID.allPrice[0];
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style></style>
