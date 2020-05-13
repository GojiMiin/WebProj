<template>
  <div class="allType">
    <router-link to="/" @click.native="goto(forLink.type1)">Delux</router-link>
    |
    <router-link to="/" @click.native="goto(forLink.type2)"
      >Premuim</router-link
    >
    |
    <router-link to="/" @click.native="goto(forLink.type3)">Suite</router-link>
    |
  </div>
</template>

<script>
import { store } from "../Store/store";
export default {
  name: "RoomType",
  data() {
    return {
      forLink: {
        type1: "Delux",
        type2: "Premium",
        type3: "Suite"
      }
    };
  },
  methods: {
    goto: function(getType) {
      store.commit("changeType", getType);
      window.localStorage.setItem("roomType", store.getters.roomType);
      this.$router.push({ path: "/roomdetail" });
    }
  }
};
</script>
