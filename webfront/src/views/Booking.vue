<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        enctype="multipart/form-data"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <label>Booking</label><br /><br />
        <select class="booking_input" id="dropdown" name="book-id">
          <option v-for="item in allData.forStart" v-bind:key="item._id">
            {{ item.roomNum }}
          </option>
        </select><br /><br />
        <label for="Checkin">CheckIn</label><br />
        <input
          class="form-control"
          type="date"
          name="CheckIn"
          :format="DatePickerFormat"
          :disabled-dates="allData.disabledDates"   
        /><br /><br />
        <label for="Checkin">CheckOut</label><br />
        <input
          class="form-control"
          type="date"
          name="CheckOut"
        /><br /><br />
        <label for="PayTotal">Total Price</label><br />
        <input
          class="form-control"
          type="text"
          name="Total Price"
          readonly
        />

      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { store } from "../Store/store";
import axios from "axios";
export default {
  name: "booking",
  data() {
    return {
      allData: {
        disabledDates: "05-10-2020",
        forStart: [],
        Booked: []
      }
    };
  },
  mounted() {
    this.allData.forStart = store.getters.allRoom;
    axios
      .put("http://localhost:3000/book", this.allData.forStart, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
        }
      })
      .then((response) => {
        this.Booked = response.data
        console.log(this.Booked)

      });
  }
};
</script>
