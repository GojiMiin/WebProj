<template>
  <div class="container">
    <br /><br />
    <form enctype="multipart/form-data">
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
      <input type="file" accept="image/*" @change="getPhoto($event)" />
      <button class="Check_value" @click="check()">Check Photo Value</button>
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
          Bank: "",
          Receipt: ""
        }
      }
    };
  },
  methods: {
    sentData: function() {
      let formdata = new FormData();
      /* formdata.append('BookID',this.data.currentShow.BookID)
      formdata.append('PayDate',this.data.payData.PayDate)
      formdata.append('PayTotal',this.data.currentShow.Price)
      formdata.append('Bank',this.data.payData.Bank) */
      formdata.append('Receipt',this.data.payData.Receipt)
      /* for(let i of formdata.values()){
        console.log(i)
      }
      alert('ready')
 */
      let myPay = {
        BookID: this.data.currentShow.BookID,
        PayDate: this.data.payData.PayDate,
        PayTotal: this.data.currentShow.Price,
        Bank: this.data.payData.Bank,
      };

      axios
        .post("http://localhost:3000/Payment/:username", formdata)
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
    getPhoto: async function(event) {
      /* let fileInput = document.querySelector("input[type=file]");
      let reader = new FileReader();
      
      new Promise((reslove, reject) => {
        reader.onload = (e) => {
          reslove(e)
        }
        reader.onerror = (err) =>{
          reject(err)
        }
        reader.readAsDataURL(fileInput.files[0]);
      }).then((value) => {
        let raw = value.target.result
        let clean = raw.split(",")// delete data:image/jpeg;base64,
        this.data.payData.Receipt = clean[1]
      }) */
 
      let file = event.target.files[0];
      this.data.payData.Receipt = file;
    },
    check: function() {
      console.log(this.data.payData.Receipt);
      alert(typeof this.data.payData.Receipt);
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/Payment/" + this.$route.params.username)
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
