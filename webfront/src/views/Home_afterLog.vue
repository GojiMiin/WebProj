<template>
  <div class="homeafterlog">
    <MenuWithAuth />
    <v-img :src="require('@/assets/BG.jpg')"> </v-img>
  </div>
</template>

<script>
import MenuWithAuth from "../components/menubar_withauth";
export default {
  name: "HomeAfterLog",
  components: {
    MenuWithAuth
  }
};
</script>
