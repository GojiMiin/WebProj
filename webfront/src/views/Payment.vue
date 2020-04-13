<template>
  <div class="container">
    <br /><br />
    <form>
      <label for="book-id">Payment List</label><br />
      <!-- cannot show name on dropdownlist -->
      <select class="payForm_input" id="dropdown" name="book-id">
        <option v-for="item in data.BookID.items" v-bind:key="item">
          {{ item }}
        </option> 
      </select><br /><br />

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
        v-model="data.payData.PayTotal"
      /><br /><br />
      <label for="Bank">Bank</label><br />
      <input
        class="form-control"
        type="text"
        name="Bank"
        v-model="data.payData.Bank"
      /><br /><br />
      <input type="file" name="picture" accept="image/*" />

      <button class="payForm_button" type="submit" v-on:click="sentData()">
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
          items: "",
          username: ""
        },
        payData: {
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
        PayDate: this.data.payData.PayDate,
        PayTotal: this.data.payData.PayTotal,
        Bank: this.data.payData.Bank
      };
      console.log(myPay);
      axios
        .post("http://localhost:3000/Payment/:username", myPay)
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
      .get("http://localhost:3000/Payment/" + this.$route.params.username)
      .then(response => {
        /* alert(typeof(this.data.BookID.items)) */
        var list = response.data.split(",");
        this.data.BookID.items = list
        alert(list);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style></style>
