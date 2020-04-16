<template>
  <div class="container">
    <br /><br />
    <form>
      <label for="book-id">Payment List</label><br />
      <!-- cannot show name on dropdownlist -->
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
        v-bind:value="this.data.currentShow.Price"
        readonly
      /><br /><br />
      <label for="Bank">Bank</label><br />
      <input
        class="form-control"
        type="text"
        name="Bank"
        v-model="data.payData.Bank"
      /><br /><br />
      <input type="file" name="picture" accept="image/*" />

      <button class="payForm_button" type="submit" @click="sentData()">
        submit
      </button>
      <p>{{ data.BookID.username }}</p>
    </form>
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
          Bank: ""
        }
      }
    };
  },
  methods: {
    sentData: function() {
      let myPay = {
        BookID: this.data.currentShow.BookID,
        PayDate: this.data.payData.PayDate,
        PayTotal: this.data.currentShow.Price,
        Bank: this.data.payData.Bank
      };
      alert(myPay);
      axios
        .post("http://localhost:3000/Payment/:username", myPay)
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
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/Payment/" + this.$route.params.username)
      .then(response => {
        this.data.BookID.allBookID = response.data.thisBookID;
        this.data.BookID.allPrice = response.data.thisPrice;
        this.data.currentShow.BookID = this.data.BookID.allBookID[0]
        this.data.currentShow.Price = this.data.BookID.allPrice[0]
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style></style>
