<template>
  <div class="container">
    <h1 class="username">John</h1>
    <br /><br />
    <form>
      <label for="book-id">Payment List</label><br />

      <!-- cannot show name on dropdownlist -->
      <select class="payForm_input" id="dropdown" name="book-id">
        <!-- <option v-for="item in items">{{item}}</option> --> </select
      ><br /><br />

      <label for="PayDate">PayDate</label><br />
      <input class="payForm_input" type="date" name="PayDate" /><br /><br />
      <label for="PayTotal">PayTotal</label><br />
      <input class="payForm_input" type="text" name="PayTotal" /><br /><br />
      <label for="Bank">Bank</label><br />
      <input class="payForm_input" type="text" name="Bank" /><br /><br />
      <input type="file" name="picture" accept="image/*" />

      <button class="payForm_button" type="submit" v-click="test">submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PayMe",
  data: function() {
    return {
      BookID: {
        items: "",
        username: "John"
      },
      payData: {
        PayDate: "",
        PayTotal: "",
        Bank: ""
      }
    };
  },
  methods: {
    sentData() {
      let myPay = {
        PayDate: this.payData.PayDate,
        PayTotal: this.payData.PayTotal,
        Bank: this.payData.Bank
      };
      console.log(myPay)
      axios
        .post("http://localhost:8081/Payment", myPay)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    axios
      .get("http://localhost:8081/Payment", this.username)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style></style>
