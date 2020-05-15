<template>
  <div class="home">
    <Menubar />
    <v-img :src="require('@/assets/BG.jpg')"> </v-img>
  </div>
</template>

<script>
import Menubar from "../components/menubar";
export default {
  name: "Home",
  components: {
    Menubar
  }
};
</script>

<style scoped>
.v-text-field {
  width: 10%;
}
</style>
