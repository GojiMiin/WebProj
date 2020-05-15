<template>
  <div class="myprofile">
    <v-form pl-10 ml-0 enctype="multipart/form-data">
      <v-container class="base">
        <v-row>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="User"
            class="elevation-1"
          >
          </v-data-table>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BookingHistory",
  components: {},
  data() {
    return {
      User: [],
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: "BookID",
          align: "start",
          sortable: false,
          value: "BookID"
        },
        { text: "Book Date", value: "BookDate" },
        { text: "Check In", value: "Checkin" },
        { text: "Check Out", value: "Checkout" },
        { text: "Price", value: "Price" },
        { text: "Room Number", value: "roomNum" },
        { text: "Room Type", value: "roomType" }
      ]
    };
  },
  methods: {},
  mounted() {
    //get data to setup page
    axios
      .get("http://localhost:3000/bookhistory", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
        }
      })
      .then(res => {
        console.log(res);
        this.User = res.data;
        let i = 0;
        for (i in this.User) {
          //clean data to show on table
          let checkInTmp = this.User[i].Checkin.toString();
          let checkOutTmp = this.User[i].Checkout.toString();
          let BookDateTmp = this.User[i].BookDate.toString();
          this.User[i].Checkin = checkInTmp.split("T")[0];
          this.User[i].Checkout = checkOutTmp.split("T")[0];
          this.User[i].BookDate = BookDateTmp.split("T")[0];
        }
      });
  }
};
</script>

<style scoped>
.container.base {
  width: 70%;
}
</style>
